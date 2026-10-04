from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(String(50), primary_key=True)
    phone = Column(String(15), unique=True, nullable=False, index=True)
    phone_masked = Column(String(15), nullable=False)
    name = Column(String(100), default="User")
    role = Column(String(30), default="citizen", nullable=False)
    # citizen, jal_mitra, vwsc, je, ee, state_admin
    lgd_gp_code = Column(String(8), nullable=True, index=True)

    # DPDP Act compliance: explicit consent timestamp & minimal PII
    consent_given = Column(Boolean, default=True, nullable=False)
    consent_ts = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Mock OTP authentication
    last_otp = Column(String(6), nullable=True)
    otp_expires_at = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
