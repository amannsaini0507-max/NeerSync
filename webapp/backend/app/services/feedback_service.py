import math
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import Dict, Any, Tuple, Optional
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.feedback import CitizenFeedback, FeedbackCluster
from app.models.master import FHTC
from app.services.validator import validate_contract_payload

logger = logging.getLogger(__name__)


def haversine_distance_meters(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates distance between two GPS coordinates in meters."""
    R = 6371000.0  # Earth radius in meters
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0)**2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return R * c


class FeedbackService:
    """
    Citizen Grievance Service handling multi-channel ingestion,
    schema contract validation, and spatio-temporal cluster deduplication.
    """

    async def submit_feedback(
        self,
        db: AsyncSession,
        payload: Dict[str, Any],
        submitted_by_role: str = "citizen"
    ) -> Tuple[bool, str, Optional[str], Optional[str]]:
        """
        Submits citizen grievance.
        Returns: (success: bool, message: str, feedback_id: Optional[str], cluster_id: Optional[str])
        """
        # Clean payload: omit keys with None values so optional fields conform to JSON Schema
        clean_payload = {k: v for k, v in payload.items() if v is not None}

        # 1. Validate against /contracts/feedback.schema.json
        is_valid, err = validate_contract_payload(clean_payload, "feedback")
        if not is_valid:
            logger.warning("Feedback validation rejected: %s", err)
            return False, err or "Contract validation failed", None, None

        payload = clean_payload
        feedback_id = payload["feedback_id"]
        fhtc_id = payload["fhtc_id"]
        category = payload["category"]
        lat = payload.get("lat")
        lon = payload.get("lon")

        ts_str = payload["ts"]
        try:
            ts_dt = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
        except Exception:
            ts_dt = datetime.now(timezone.utc)

        # 2. Lookup FHTC master to get lgd_gp_code and habitation_id
        fhtc_res = await db.execute(select(FHTC).where(FHTC.fhtc_id == fhtc_id))
        fhtc_obj = fhtc_res.scalar_one_or_none()
        lgd_gp_code = fhtc_obj.lgd_gp_code if fhtc_obj else "245123"
        habitation_id = fhtc_obj.habitation_id if fhtc_obj else None

        # Fallback lat/lon from FHTC master if not provided in payload
        if lat is None and fhtc_obj and fhtc_obj.lat:
            lat = fhtc_obj.lat
        if lon is None and fhtc_obj and fhtc_obj.lon:
            lon = fhtc_obj.lon

        # 3. Spatio-Temporal Cluster Deduplication (200m or same Habitation, 12h window)
        cluster = await self._find_or_create_cluster(
            db=db,
            lgd_gp_code=lgd_gp_code,
            habitation_id=habitation_id,
            category=category,
            lat=lat,
            lon=lon,
            ts=ts_dt
        )

        # 4. Store Individual Feedback Record
        feedback = CitizenFeedback(
            feedback_id=feedback_id,
            fhtc_id=fhtc_id,
            lgd_gp_code=lgd_gp_code,
            channel=payload["channel"],
            category=category,
            text=payload.get("text"),
            photo_url=payload.get("photo_url"),
            lat=lat,
            lon=lon,
            lang=payload.get("lang", "hi"),
            ts=ts_dt,
            submitted_by_role=submitted_by_role,
            cluster_id=cluster.cluster_id,
            status="queued_for_verification"
        )
        db.add(feedback)
        await db.commit()
        await db.refresh(feedback)

        return True, "queued_for_verification", feedback_id, cluster.cluster_id

    async def _find_or_create_cluster(
        self,
        db: AsyncSession,
        lgd_gp_code: str,
        habitation_id: Optional[str],
        category: str,
        lat: Optional[float],
        lon: Optional[float],
        ts: datetime
    ) -> FeedbackCluster:
        """Finds matching active cluster within 12h and 200m, or creates a new one."""
        window_start = ts - timedelta(hours=12)

        q = select(FeedbackCluster).where(
            and_(
                FeedbackCluster.lgd_gp_code == lgd_gp_code,
                FeedbackCluster.category == category,
                FeedbackCluster.status == "open",
                FeedbackCluster.last_reported_ts >= window_start
            )
        )
        res = await db.execute(q)
        active_clusters = res.scalars().all()

        matched_cluster = None
        for c in active_clusters:
            # Condition 1: Same habitation
            if habitation_id and c.habitation_id and habitation_id == c.habitation_id:
                matched_cluster = c
                break
            # Condition 2: GPS within 200m
            if lat is not None and lon is not None and c.center_lat is not None and c.center_lon is not None:
                dist = haversine_distance_meters(lat, lon, c.center_lat, c.center_lon)
                if dist <= 200.0:
                    matched_cluster = c
                    break

        if matched_cluster:
            matched_cluster.count += 1
            matched_cluster.last_reported_ts = ts
            # Slightly adjust center lat/lon
            if lat and lon and matched_cluster.center_lat and matched_cluster.center_lon:
                matched_cluster.center_lat = (matched_cluster.center_lat + lat) / 2.0
                matched_cluster.center_lon = (matched_cluster.center_lon + lon) / 2.0
            await db.commit()
            return matched_cluster

        # Create new cluster
        cluster_id = f"CLUS-{lgd_gp_code}-{uuid.uuid4().hex[:6]}"
        new_cluster = FeedbackCluster(
            cluster_id=cluster_id,
            lgd_gp_code=lgd_gp_code,
            habitation_id=habitation_id,
            category=category,
            count=1,
            status="open",
            center_lat=lat,
            center_lon=lon,
            first_reported_ts=ts,
            last_reported_ts=ts
        )
        db.add(new_cluster)
        await db.commit()
        await db.refresh(new_cluster)
        return new_cluster


feedback_service = FeedbackService()
