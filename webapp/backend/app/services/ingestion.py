import logging
from datetime import datetime, timezone
from typing import Dict, Any, Tuple, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.telemetry import TelemetryRecord, NodeStatusRecord
from app.models.master import Node
from app.services.validator import validate_contract_payload
from app.services.alert_engine import alert_engine

logger = logging.getLogger(__name__)


class IngestionService:
    """
    Ingestion service validating contract schemas, ensuring idempotency,
    storing time-series metrics, and driving edge alarms.
    """

    async def ingest_telemetry(
        self,
        db: AsyncSession,
        payload: Dict[str, Any],
        raw_bytes: Optional[bytes] = None
    ) -> Tuple[bool, str, Optional[int]]:
        """
        Ingests a telemetry packet.
        Returns: (success: bool, message: str, record_id: Optional[int])
        """
        # 1. Validate contract schema
        is_valid, err = validate_contract_payload(payload, "telemetry", raw_bytes)
        if not is_valid:
            logger.warning("Rejected telemetry payload: %s", err)
            return False, err or "Schema validation failed", None

        node_id = payload["node_id"]
        seq = payload["seq"]
        lgd_gp_code = str(payload["lgd_gp_code"])
        scheme_id = payload["scheme_id"]

        # Parse timestamp safely
        ts_str = payload["ts"]
        try:
            ts_dt = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
        except Exception:
            ts_dt = datetime.now(timezone.utc)

        # 2. Idempotency Check on (node_id, seq)
        q = select(TelemetryRecord).where(
            TelemetryRecord.node_id == node_id,
            TelemetryRecord.seq == seq
        )
        existing = (await db.execute(q)).scalar_one_or_none()
        if existing:
            # Idempotent acknowledgment without duplicate storage
            logger.info("Idempotent hit for node_id=%s, seq=%s. Skipping duplicate insert.", node_id, seq)
            return True, "duplicate_idempotent_ok", existing.id

        # 3. Store Telemetry Record
        record = TelemetryRecord(
            schema_version=payload.get("schema_version", "1.0"),
            node_id=node_id,
            lgd_gp_code=lgd_gp_code,
            scheme_id=scheme_id,
            ts=ts_dt,
            seq=seq,
            type=payload["type"],
            values=payload["values"],
            battery_v=payload["battery_v"],
            rssi_dbm=payload["rssi_dbm"],
            fw=payload["fw"]
        )
        db.add(record)

        # 4. Upsert / Update Node Master state
        node_res = await db.execute(select(Node).where(Node.node_id == node_id))
        node_obj = node_res.scalar_one_or_none()
        if node_obj:
            node_obj.battery_v = payload["battery_v"]
            node_obj.rssi_dbm = payload["rssi_dbm"]
            node_obj.fw = payload["fw"]
            node_obj.status = "online"
            node_obj.last_seen_ts = ts_dt
        else:
            new_node = Node(
                node_id=node_id,
                lgd_gp_code=lgd_gp_code,
                scheme_id=scheme_id,
                type=payload["type"],
                fw=payload["fw"],
                status="online",
                battery_v=payload["battery_v"],
                rssi_dbm=payload["rssi_dbm"],
                last_seen_ts=ts_dt
            )
            db.add(new_node)

        await db.commit()
        await db.refresh(record)

        # 5. Evaluate Alert Engine
        try:
            await alert_engine.evaluate_telemetry(db, payload)
        except Exception as exc:
            logger.error("Alert evaluation error for node %s: %s", node_id, str(exc))

        return True, "accepted", record.id

    async def ingest_status(
        self,
        db: AsyncSession,
        payload: Dict[str, Any],
        raw_bytes: Optional[bytes] = None
    ) -> Tuple[bool, str, Optional[int]]:
        """
        Ingests a node heartbeat / LWT status packet.
        Returns: (success: bool, message: str, record_id: Optional[int])
        """
        # 1. Validate contract schema
        is_valid, err = validate_contract_payload(payload, "status", raw_bytes)
        if not is_valid:
            logger.warning("Rejected status payload: %s", err)
            return False, err or "Status schema validation failed", None

        node_id = payload["node_id"]
        lgd_gp_code = str(payload["lgd_gp_code"])
        scheme_id = payload["scheme_id"]
        status = payload["status"]

        ts_str = payload["last_seen_ts"]
        try:
            ts_dt = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
        except Exception:
            ts_dt = datetime.now(timezone.utc)

        # 2. Store NodeStatusRecord
        record = NodeStatusRecord(
            node_id=node_id,
            lgd_gp_code=lgd_gp_code,
            scheme_id=scheme_id,
            status=status,
            uptime_s=payload["uptime_s"],
            battery_v=payload["battery_v"],
            rssi_dbm=payload["rssi_dbm"],
            fw=payload["fw"],
            last_seen_ts=ts_dt,
            reason=payload.get("reason")
        )
        db.add(record)

        # 3. Update Node Master
        node_res = await db.execute(select(Node).where(Node.node_id == node_id))
        node_obj = node_res.scalar_one_or_none()
        if node_obj:
            node_obj.status = status
            node_obj.battery_v = payload["battery_v"]
            node_obj.rssi_dbm = payload["rssi_dbm"]
            node_obj.uptime_s = payload["uptime_s"]
            node_obj.last_seen_ts = ts_dt
        else:
            new_node = Node(
                node_id=node_id,
                lgd_gp_code=lgd_gp_code,
                scheme_id=scheme_id,
                type="gateway",
                fw=payload["fw"],
                status=status,
                uptime_s=payload["uptime_s"],
                battery_v=payload["battery_v"],
                rssi_dbm=payload["rssi_dbm"],
                last_seen_ts=ts_dt
            )
            db.add(new_node)

        await db.commit()
        await db.refresh(record)

        # 4. Drive Alert Engine (node_offline)
        try:
            await alert_engine.evaluate_node_status(db, payload)
        except Exception as exc:
            logger.error("Node status alert evaluation error: %s", str(exc))

        return True, "recorded", record.id


ingestion_service = IngestionService()
