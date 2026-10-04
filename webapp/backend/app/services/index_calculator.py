import logging
from datetime import datetime, timezone, timedelta
from typing import Dict, Any, Tuple
from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.telemetry import TelemetryRecord
from app.models.feedback import CitizenFeedback
from app.models.master import GramPanchayat
from app.config import settings

logger = logging.getLogger(__name__)


class FHTCIndexCalculator:
    """
    Computes the FHTC Service Index (0-100):
    Index = 0.30 * Regularity + 0.20 * Adequacy + 0.20 * Quality + 0.15 * Pressure + 0.15 * Grievance Resolution
    """

    async def calculate_gp_index(
        self,
        db: AsyncSession,
        lgd_gp_code: str,
        window_days: int = 7
    ) -> Dict[str, Any]:
        """Calculates FHTC Service Index and sub-scores for a Gram Panchayat over a rolling window."""
        now = datetime.now(timezone.utc)
        start_ts = now - timedelta(days=window_days)

        # 1. Fetch Telemetry for this GP in the window
        q_telemetry = select(TelemetryRecord).where(
            and_(
                TelemetryRecord.lgd_gp_code == lgd_gp_code,
                TelemetryRecord.ts >= start_ts
            )
        )
        res_telemetry = await db.execute(q_telemetry)
        telemetry_rows = res_telemetry.scalars().all()

        # Regularity: % of days with at least 1 successful supply reading
        days_with_supply = set()
        pressure_samples = []
        flow_samples = []
        quality_compliant_samples = 0
        quality_total_samples = 0

        for row in telemetry_rows:
            day_str = row.ts.strftime("%Y-%m-%d")
            vals = row.values or {}

            if row.type == "flow":
                flow_lpm = vals.get("flow_lpm", 0.0)
                if flow_lpm > 0.0:
                    days_with_supply.add(day_str)
                    flow_samples.append(flow_lpm)

            elif row.type == "pressure":
                pressure_kpa = vals.get("pressure_kpa", 0.0)
                if pressure_kpa > 0.0:
                    days_with_supply.add(day_str)
                pressure_samples.append(pressure_kpa)

            elif row.type == "quality":
                quality_total_samples += 1
                turb = vals.get("turbidity_ntu", 0.0)
                chl = vals.get("chlorine_mgl", 0.0)
                ph = vals.get("ph", 7.0)
                if turb <= 5.0 and (0.2 <= chl <= 1.0) and (6.5 <= ph <= 8.5):
                    quality_compliant_samples += 1

        # Regularity Score (0-100)
        regularity_score = (len(days_with_supply) / float(window_days)) * 100.0 if window_days > 0 else 100.0
        regularity_score = min(100.0, max(0.0, regularity_score))

        # Adequacy Score (0-100): benchmark 55 lpcd
        # If no flow rows yet, default to baseline 85.0
        if flow_samples:
            avg_flow = sum(flow_samples) / len(flow_samples)
            # Estimated liters per capita per day delivered (5 persons per household)
            estimated_lpcd = (avg_flow * 60.0) / 100.0  # approximate scale
            adequacy_score = min(100.0, (estimated_lpcd / 55.0) * 100.0)
        else:
            adequacy_score = 80.0

        # Quality Score (0-100)
        if quality_total_samples > 0:
            quality_score = (quality_compliant_samples / float(quality_total_samples)) * 100.0
        else:
            quality_score = 90.0  # default compliant baseline

        # Pressure Score (0-100): % readings >= 70 kPa
        if pressure_samples:
            sufficient_pressure = sum(1 for p in pressure_samples if p >= 70.0)
            pressure_score = (sufficient_pressure / float(len(pressure_samples))) * 100.0
        else:
            pressure_score = 85.0

        # Grievance Resolution Score (0-100)
        q_feedback = select(CitizenFeedback).where(
            and_(
                CitizenFeedback.lgd_gp_code == lgd_gp_code,
                CitizenFeedback.ts >= start_ts
            )
        )
        res_fb = await db.execute(q_feedback)
        feedbacks = res_fb.scalars().all()

        if feedbacks:
            resolved_count = sum(1 for f in feedbacks if f.status == "resolved")
            grievance_score = (resolved_count / float(len(feedbacks))) * 100.0
        else:
            grievance_score = 100.0  # No grievances means full resolution satisfaction

        # Final Weighted Index
        w_reg = settings.weight_regularity
        w_ade = settings.weight_adequacy
        w_qua = settings.weight_quality
        w_prs = settings.weight_pressure
        w_grv = settings.weight_grievance

        fhtc_service_index = (
            w_reg * regularity_score +
            w_ade * adequacy_score +
            w_qua * quality_score +
            w_prs * pressure_score +
            w_grv * grievance_score
        )
        fhtc_service_index = round(min(100.0, max(0.0, fhtc_service_index)), 1)

        # Status Category
        if fhtc_service_index >= 85.0:
            status_category = "EXCELLENT"
        elif fhtc_service_index >= 70.0:
            status_category = "SATISFACTORY"
        elif fhtc_service_index >= 50.0:
            status_category = "AT_RISK"
        else:
            status_category = "NON_FUNCTIONAL"

        return {
            "lgd_gp_code": lgd_gp_code,
            "fhtc_service_index": fhtc_service_index,
            "regularity_score": round(regularity_score, 1),
            "adequacy_score": round(adequacy_score, 1),
            "quality_score": round(quality_score, 1),
            "pressure_score": round(pressure_score, 1),
            "grievance_score": round(grievance_score, 1),
            "weights_applied": {
                "regularity": w_reg,
                "adequacy": w_ade,
                "quality": w_qua,
                "pressure": w_prs,
                "grievance": w_grv
            },
            "status_category": status_category
        }


index_calculator = FHTCIndexCalculator()
