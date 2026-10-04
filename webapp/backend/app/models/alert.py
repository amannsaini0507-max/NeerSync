from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.database import Base


class AlertIncident(Base):
    __tablename__ = "alert_incidents"

    alert_id = Column(String(50), primary_key=True)  # ALT-20261004-001
    type = Column(String(30), nullable=False, index=True)
    # no_supply, low_pressure, leakage, quality, node_offline, chronic_nonfunctional
    severity = Column(String(10), nullable=False, index=True)  # low, medium, high
    lgd_gp_code = Column(String(8), nullable=False, index=True)
    branch = Column(String(100), nullable=False)
    fhtc_id = Column(String(50), nullable=True, index=True)
    reason = Column(String(500), nullable=False)
    created_ts = Column(DateTime, nullable=False, index=True)
    status = Column(String(30), default="active", nullable=False, index=True)
    # active, acknowledged, resolved, pending_citizen_confirmation

    # Escalation tracking
    escalation_level = Column(String(20), default="jal_mitra", nullable=False)
    # jal_mitra -> vwsc -> je -> ee
    escalated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Auto-closure & Repair-closure loop
    auto_closed = Column(Boolean, default=False)
    technician_photo_url = Column(String(500), nullable=True)
    technician_notes = Column(String(500), nullable=True)
    repaired_at = Column(DateTime, nullable=True)
    citizen_confirmed = Column(Boolean, nullable=True)
    citizen_confirmation_ts = Column(DateTime, nullable=True)
    resolution_notes = Column(String(500), nullable=True)
    resolved_ts = Column(DateTime, nullable=True)
    updated_ts = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    escalation_logs = relationship("AlertEscalationLog", back_populates="alert", cascade="all, delete-orphan")


class AlertEscalationLog(Base):
    __tablename__ = "alert_escalation_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    alert_id = Column(String(50), ForeignKey("alert_incidents.alert_id"), nullable=False)
    from_level = Column(String(20), nullable=False)
    to_level = Column(String(20), nullable=False)
    escalated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    reason = Column(String(255), nullable=True)

    alert = relationship("AlertIncident", back_populates="escalation_logs")
