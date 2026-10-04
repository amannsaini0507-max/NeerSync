from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.database import Base


class FeedbackCluster(Base):
    __tablename__ = "feedback_clusters"

    cluster_id = Column(String(50), primary_key=True)  # CLUS-245123-001
    lgd_gp_code = Column(String(8), nullable=False, index=True)
    habitation_id = Column(String(50), nullable=True, index=True)
    category = Column(String(30), nullable=False, index=True)
    count = Column(Integer, default=1)
    status = Column(String(30), default="open")  # open, investigating, resolved
    center_lat = Column(Float, nullable=True)
    center_lon = Column(Float, nullable=True)
    first_reported_ts = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    last_reported_ts = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    feedbacks = relationship("CitizenFeedback", back_populates="cluster")


class CitizenFeedback(Base):
    __tablename__ = "citizen_feedbacks"

    feedback_id = Column(String(50), primary_key=True)  # FB-20261004-0012
    fhtc_id = Column(String(50), nullable=False, index=True)
    lgd_gp_code = Column(String(8), nullable=False, index=True)
    channel = Column(String(20), nullable=False)  # app, qr, whatsapp, ivr
    category = Column(String(30), nullable=False, index=True)  # no_water, low_pressure, dirty_water, leakage, other
    text = Column(String(1000), nullable=True)
    photo_url = Column(String(500), nullable=True)
    lat = Column(Float, nullable=True)
    lon = Column(Float, nullable=True)
    lang = Column(String(10), default="hi")
    ts = Column(DateTime, nullable=False, index=True)

    # Assisted entry & clustering
    submitted_by_role = Column(String(30), default="citizen")  # citizen, jal_mitra
    cluster_id = Column(String(50), ForeignKey("feedback_clusters.cluster_id"), nullable=True)
    status = Column(String(30), default="queued_for_verification")  # queued_for_verification, in_progress, resolved

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    cluster = relationship("FeedbackCluster", back_populates="feedbacks")
