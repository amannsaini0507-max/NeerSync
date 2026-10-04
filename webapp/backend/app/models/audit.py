from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from app.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    entity_type = Column(String(50), nullable=False)  # alert, fhtc, feedback, sync, user
    entity_id = Column(String(100), nullable=False)
    action = Column(String(50), nullable=False)  # create, update, escalate, resolve, login
    actor_id = Column(String(50), default="system")
    actor_role = Column(String(30), default="system")
    details = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)


class IMISSyncAudit(Base):
    __tablename__ = "imis_sync_audits"

    id = Column(Integer, primary_key=True, autoincrement=True)
    sync_batch_id = Column(String(50), nullable=False, index=True)
    reporting_date = Column(String(10), nullable=False, index=True)  # YYYY-MM-DD
    lgd_gp_code = Column(String(8), nullable=False, index=True)
    functional_fhtc_count = Column(Integer, nullable=False)
    total_supply_liters = Column(Float, nullable=False)
    sync_status = Column(String(30), nullable=False)  # MOCK_SYNC_QUEUED, SUCCESS, FAILED_CSV_FALLBACK
    adapter_mode = Column(String(30), default="UNVERIFIED_MOCK")
    error_message = Column(String(500), nullable=True)
    sync_ts = Column(DateTime, default=lambda: datetime.now(timezone.utc))
