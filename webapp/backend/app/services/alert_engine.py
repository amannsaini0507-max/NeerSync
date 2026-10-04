import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import Dict, Any, List, Optional
from sqlalchemy import select, update, and_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.alert import AlertIncident, AlertEscalationLog
from app.models.master import Node
from app.services.ml_client import ml_client
from app.config import settings

logger = logging.getLogger(__name__)


class AlertEngine:
    """
    Core rule and anomaly detection engine with deduplication,
    multi-tier escalation, auto-close on recovery, and technician/citizen repair loop.
    """

    async def evaluate_telemetry(self, db: AsyncSession, telemetry: Dict[str, Any]) -> List[AlertIncident]:
        """Evaluates incoming telemetry packet for violations and updates/creates alerts."""
        node_id = telemetry["node_id"]
        lgd_gp_code = str(telemetry["lgd_gp_code"])
        t_type = telemetry["type"]
        values = telemetry.get("values", {})
        ts_str = telemetry.get("ts", datetime.now(timezone.utc).isoformat())

        # Determine branch from Node master or default
        branch = "Main_Branch"
        node_res = await db.execute(select(Node).where(Node.node_id == node_id))
        node_obj = node_res.scalar_one_or_none()
        if node_obj and node_obj.branch:
            branch = node_obj.branch

        # Query ML anomaly client (with rule fallback)
        ml_result = await ml_client.predict_anomalies(telemetry)
        anomalies_to_create = []

        if ml_result.get("anomaly_detected"):
            for a in ml_result.get("anomalies", []):
                anomalies_to_create.append((a["type"], a["severity"], a["reason"]))

        # Also check recovery to auto-close resolved alerts
        await self._check_recovery_and_autoclose(db, lgd_gp_code, branch, t_type, values)

        created_or_updated_alerts = []
        for a_type, severity, reason in anomalies_to_create:
            alert = await self._dedup_and_upsert_alert(
                db=db,
                lgd_gp_code=lgd_gp_code,
                branch=branch,
                alert_type=a_type,
                severity=severity,
                reason=reason,
                fhtc_id=None,
                event_ts=datetime.now(timezone.utc)
            )
            created_or_updated_alerts.append(alert)

        return created_or_updated_alerts

    async def evaluate_node_status(self, db: AsyncSession, status_payload: Dict[str, Any]) -> Optional[AlertIncident]:
        """Evaluates node connectivity / LWT heartbeat for node_offline alert."""
        node_id = status_payload["node_id"]
        lgd_gp_code = str(status_payload["lgd_gp_code"])
        status = status_payload["status"]
        reason = status_payload.get("reason", "LWT disconnect or heartbeat timeout")

        branch = "Main_Branch"
        node_res = await db.execute(select(Node).where(Node.node_id == node_id))
        node_obj = node_res.scalar_one_or_none()
        if node_obj and node_obj.branch:
            branch = node_obj.branch

        if status == "offline":
            return await self._dedup_and_upsert_alert(
                db=db,
                lgd_gp_code=lgd_gp_code,
                branch=branch,
                alert_type="node_offline",
                severity="high",
                reason=f"Node {node_id} is offline: {reason}",
                fhtc_id=None,
                event_ts=datetime.now(timezone.utc)
            )
        elif status == "online":
            # Auto-close existing node_offline alert for this branch/node
            q = select(AlertIncident).where(
                and_(
                    AlertIncident.lgd_gp_code == lgd_gp_code,
                    AlertIncident.branch == branch,
                    AlertIncident.type == "node_offline",
                    AlertIncident.status.in_(["active", "acknowledged"])
                )
            )
            res = await db.execute(q)
            existing = res.scalars().all()
            for al in existing:
                al.status = "resolved"
                al.auto_closed = True
                al.resolved_ts = datetime.now(timezone.utc)
                al.resolution_notes = f"Node {node_id} reported online. Auto-closed."
            await db.commit()
        return None

    async def _dedup_and_upsert_alert(
        self,
        db: AsyncSession,
        lgd_gp_code: str,
        branch: str,
        alert_type: str,
        severity: str,
        reason: str,
        fhtc_id: Optional[str],
        event_ts: datetime
    ) -> AlertIncident:
        """Deduplicates alerts: updates existing active alert or creates a new one."""
        query = select(AlertIncident).where(
            and_(
                AlertIncident.lgd_gp_code == lgd_gp_code,
                AlertIncident.branch == branch,
                AlertIncident.type == alert_type,
                AlertIncident.status.in_(["active", "acknowledged", "pending_citizen_confirmation"])
            )
        )
        result = await db.execute(query)
        existing = result.scalar_one_or_none()

        if existing:
            # Update reason and timestamp without creating duplicate spam ticket
            existing.reason = reason
            existing.updated_ts = event_ts
            if severity == "high":
                existing.severity = "high"
            await db.commit()
            return existing

        # Generate new canonical alert ID: ALT-<TIMESTAMP>-<SHORT_UUID>
        alert_id = f"ALT-{event_ts.strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:6]}"
        alert = AlertIncident(
            alert_id=alert_id,
            type=alert_type,
            severity=severity,
            lgd_gp_code=lgd_gp_code,
            branch=branch,
            fhtc_id=fhtc_id,
            reason=reason,
            created_ts=event_ts,
            status="active",
            escalation_level="jal_mitra",
            escalated_at=event_ts,
            auto_closed=False
        )
        db.add(alert)

        # Initial log
        init_log = AlertEscalationLog(
            alert_id=alert_id,
            from_level="none",
            to_level="jal_mitra",
            escalated_at=event_ts,
            reason="Initial alert creation assigned to local Jal Mitra"
        )
        db.add(init_log)
        await db.commit()
        await db.refresh(alert)
        return alert

    async def _check_recovery_and_autoclose(
        self,
        db: AsyncSession,
        lgd_gp_code: str,
        branch: str,
        telemetry_type: str,
        values: Dict[str, Any]
    ) -> None:
        """Checks if parameters have normalized to auto-close active alerts."""
        normal = False
        target_types = []

        if telemetry_type == "pressure":
            pressure = values.get("pressure_kpa", 0.0)
            if pressure >= 75.0:  # Normalized above standard + hysteresis
                normal = True
                target_types = ["low_pressure", "no_supply"]
        elif telemetry_type == "quality":
            turbidity = values.get("turbidity_ntu", 0.0)
            chlorine = values.get("chlorine_mgl", 0.0)
            ph = values.get("ph", 7.0)
            if turbidity <= 4.0 and (0.25 <= chlorine <= 0.8) and (6.8 <= ph <= 8.2):
                normal = True
                target_types = ["quality"]
        elif telemetry_type == "flow":
            flow = values.get("flow_lpm", 0.0)
            if flow > 5.0:
                normal = True
                target_types = ["no_supply"]

        if normal and target_types:
            q = select(AlertIncident).where(
                and_(
                    AlertIncident.lgd_gp_code == lgd_gp_code,
                    AlertIncident.branch == branch,
                    AlertIncident.type.in_(target_types),
                    AlertIncident.status.in_(["active", "acknowledged"])
                )
            )
            res = await db.execute(q)
            to_close = res.scalars().all()
            for al in to_close:
                al.status = "resolved"
                al.auto_closed = True
                al.resolved_ts = datetime.now(timezone.utc)
                al.resolution_notes = "Readings recovered within normal BIS/JJM thresholds. Auto-closed."
                logger.info("Auto-closed alert %s (%s) due to parameter recovery.", al.alert_id, al.type)
            if to_close:
                await db.commit()

    async def run_escalation_cycle(self, db: AsyncSession) -> int:
        """
        Escalation timer cycle evaluated periodically:
        Jal Mitra (T0) -> VWSC (T0 + 4h) -> JE (T0 + 24h) -> EE (T0 + 48h).
        Also re-opens unconfirmed repairs exceeding 48 hours.
        """
        now = datetime.now(timezone.utc)
        escalated_count = 0

        # 1. Fetch unresolved alerts
        q = select(AlertIncident).where(
            AlertIncident.status.in_(["active", "acknowledged", "pending_citizen_confirmation"])
        )
        res = await db.execute(q)
        alerts = res.scalars().all()

        for alert in alerts:
            # Handle pending citizen confirmation timeout (48 hours)
            if alert.status == "pending_citizen_confirmation":
                if alert.repaired_at and (now - alert.repaired_at.replace(tzinfo=timezone.utc)) > timedelta(hours=48):
                    alert.status = "active"
                    alert.citizen_confirmed = False
                    alert.resolution_notes = "Citizen confirmation timeout exceeded 48h. Reopened for field inspection."
                    escalated_count += 1
                continue

            # Calculate age since creation
            created_tz = alert.created_ts.replace(tzinfo=timezone.utc) if alert.created_ts.tzinfo is None else alert.created_ts
            age_hours = (now - created_tz).total_seconds() / 3600.0

            curr_level = alert.escalation_level
            next_level = None

            if curr_level == "jal_mitra" and age_hours >= settings.escalate_vwsc_hours:
                next_level = "vwsc"
            elif curr_level == "vwsc" and age_hours >= settings.escalate_je_hours:
                next_level = "je"
            elif curr_level == "je" and age_hours >= settings.escalate_ee_hours:
                next_level = "ee"

            if next_level:
                alert.escalation_level = next_level
                alert.escalated_at = now
                log = AlertEscalationLog(
                    alert_id=alert.alert_id,
                    from_level=curr_level,
                    to_level=next_level,
                    escalated_at=now,
                    reason=f"SLA exceeded ({age_hours:.1f} hours elapsed). Escalated to {next_level.upper()}."
                )
                db.add(log)
                escalated_count += 1

        if escalated_count > 0:
            await db.commit()
        return escalated_count


alert_engine = AlertEngine()
