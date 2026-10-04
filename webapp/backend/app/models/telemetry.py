from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, UniqueConstraint, Index
from app.database import Base


class TelemetryRecord(Base):
    __tablename__ = "telemetry_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    schema_version = Column(String(10), default="1.0", nullable=False)
    node_id = Column(String(50), nullable=False, index=True)
    lgd_gp_code = Column(String(8), nullable=False, index=True)
    scheme_id = Column(String(50), nullable=False)
    ts = Column(DateTime, nullable=False, index=True)
    seq = Column(Integer, nullable=False)
    type = Column(String(30), nullable=False, index=True)  # pump, esr_level, flow, pressure, quality
    values = Column(JSON, nullable=False)
    battery_v = Column(Float, nullable=False)
    rssi_dbm = Column(Integer, nullable=False)
    fw = Column(String(30), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Idempotency constraint: duplicate (node_id, seq) rejected / treated as idempotent
    __table_args__ = (
        UniqueConstraint("node_id", "seq", name="uq_node_seq"),
        Index("idx_telemetry_gp_ts", "lgd_gp_code", "ts"),
    )


class NodeStatusRecord(Base):
    __tablename__ = "node_status_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    node_id = Column(String(50), nullable=False, index=True)
    lgd_gp_code = Column(String(8), nullable=False, index=True)
    scheme_id = Column(String(50), nullable=False)
    status = Column(String(20), nullable=False)  # online, offline, degraded
    uptime_s = Column(Integer, nullable=False)
    battery_v = Column(Float, nullable=False)
    rssi_dbm = Column(Integer, nullable=False)
    fw = Column(String(30), nullable=False)
    last_seen_ts = Column(DateTime, nullable=False)
    reason = Column(String(200), nullable=True)
    recorded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
