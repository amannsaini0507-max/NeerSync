from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.database import Base


class State(Base):
    __tablename__ = "states"

    state_code = Column(String(2), primary_key=True)  # e.g., 'UP'
    name = Column(String(100), nullable=False)

    districts = relationship("District", back_populates="state", cascade="all, delete-orphan")


class District(Base):
    __tablename__ = "districts"

    district_code = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)
    state_code = Column(String(2), ForeignKey("states.state_code"), nullable=False)

    state = relationship("State", back_populates="districts")
    blocks = relationship("Block", back_populates="district", cascade="all, delete-orphan")


class Block(Base):
    __tablename__ = "blocks"

    block_code = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)
    district_code = Column(String(50), ForeignKey("districts.district_code"), nullable=False)

    district = relationship("District", back_populates="blocks")
    gps = relationship("GramPanchayat", back_populates="block", cascade="all, delete-orphan")


class GramPanchayat(Base):
    __tablename__ = "gram_panchayats"

    lgd_gp_code = Column(String(8), primary_key=True)  # 6-digit LGD e.g., '245123'
    name = Column(String(100), nullable=False)
    block_code = Column(String(50), ForeignKey("blocks.block_code"), nullable=True)
    district = Column(String(100), nullable=False)
    state = Column(String(2), nullable=False)
    total_fhtc = Column(Integer, default=0)

    block = relationship("Block", back_populates="gps")
    villages = relationship("Village", back_populates="gp", cascade="all, delete-orphan")
    schemes = relationship("Scheme", back_populates="gp", cascade="all, delete-orphan")
    nodes = relationship("Node", back_populates="gp", cascade="all, delete-orphan")


class Village(Base):
    __tablename__ = "villages"

    village_id = Column(String(50), primary_key=True)
    name = Column(String(100), nullable=False)
    lgd_gp_code = Column(String(8), ForeignKey("gram_panchayats.lgd_gp_code"), nullable=False)

    gp = relationship("GramPanchayat", back_populates="villages")
    habitations = relationship("Habitation", back_populates="village", cascade="all, delete-orphan")


class Habitation(Base):
    __tablename__ = "habitations"

    habitation_id = Column(String(50), primary_key=True)  # HAB-245123-001
    name = Column(String(100), nullable=False)
    village_id = Column(String(50), ForeignKey("villages.village_id"), nullable=False)
    lgd_gp_code = Column(String(8), nullable=False)

    village = relationship("Village", back_populates="habitations")
    fhtcs = relationship("FHTC", back_populates="habitation", cascade="all, delete-orphan")


class Scheme(Base):
    __tablename__ = "schemes"

    scheme_id = Column(String(50), primary_key=True)  # SCH-UP-245123
    name = Column(String(150), nullable=False)
    lgd_gp_code = Column(String(8), ForeignKey("gram_panchayats.lgd_gp_code"), nullable=False)
    state = Column(String(2), nullable=False)
    source_type = Column(String(50), default="Groundwater_Tubewell")
    commissioned_date = Column(String(20), nullable=True)
    created_ts = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    gp = relationship("GramPanchayat", back_populates="schemes")
    nodes = relationship("Node", back_populates="scheme")


class FHTC(Base):
    __tablename__ = "fhtcs"

    fhtc_id = Column(String(50), primary_key=True)  # FHTC-UP-245123-0042
    habitation_id = Column(String(50), ForeignKey("habitations.habitation_id"), nullable=False)
    lgd_gp_code = Column(String(8), nullable=False)
    consumer_name_masked = Column(String(100), default="Resident")
    phone_masked = Column(String(20), default="XXXXXX0000")
    lat = Column(Float, nullable=True)
    lon = Column(Float, nullable=True)
    branch = Column(String(100), default="Main_Branch")
    status = Column(String(20), default="functional")  # functional | intermittent | non_functional
    installed_ts = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    habitation = relationship("Habitation", back_populates="fhtcs")


class Node(Base):
    __tablename__ = "nodes"

    node_id = Column(String(50), primary_key=True)  # JS-UP-245123-N001
    lgd_gp_code = Column(String(8), ForeignKey("gram_panchayats.lgd_gp_code"), nullable=False)
    scheme_id = Column(String(50), ForeignKey("schemes.scheme_id"), nullable=False)
    type = Column(String(30), nullable=False)  # pump | esr_level | flow | pressure | quality
    fw = Column(String(30), default="1.0.0")
    status = Column(String(20), default="online")  # online | offline | degraded
    uptime_s = Column(Integer, default=0)
    battery_v = Column(Float, default=3.85)
    rssi_dbm = Column(Integer, default=-75)
    lat = Column(Float, nullable=True)
    lon = Column(Float, nullable=True)
    branch = Column(String(100), default="Main")
    last_seen_ts = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    gp = relationship("GramPanchayat", back_populates="nodes")
    scheme = relationship("Scheme", back_populates="nodes")
