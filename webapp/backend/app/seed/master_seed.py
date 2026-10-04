import asyncio
import logging
from datetime import datetime, timezone, timedelta
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import AsyncSessionLocal, init_db
from app.models.master import State, District, Block, GramPanchayat, Village, Habitation, Scheme, FHTC, Node
from app.models.user import User
from app.models.telemetry import TelemetryRecord, NodeStatusRecord
from app.models.alert import AlertIncident, AlertEscalationLog
from app.models.feedback import CitizenFeedback, FeedbackCluster

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("seed")


async def seed_demo_village(db: AsyncSession):
    """Loads complete demo Gram Panchayat (Badepur GP 245123) with JJM master hierarchy."""
    logger.info("Checking if GP 245123 is already seeded...")
    res = await db.execute(select(GramPanchayat).where(GramPanchayat.lgd_gp_code == "245123"))
    if res.scalar_one_or_none():
        logger.info("GP 245123 is already seeded. Skipping initial seed.")
        return

    logger.info("Seeding JJM Master Hierarchy for Badepur GP (245123)...")

    # 1. State, District, Block
    state = State(state_code="UP", name="Uttar Pradesh")
    district = District(district_code="DIST-MEERUT", name="Meerut", state_code="UP")
    block = Block(block_code="BLK-DAURALA", name="Daurala", district_code="DIST-MEERUT")
    db.add_all([state, district, block])
    await db.flush()

    # 2. Gram Panchayat
    gp = GramPanchayat(
        lgd_gp_code="245123",
        name="Badepur",
        block_code="BLK-DAURALA",
        district="Meerut",
        state="UP",
        total_fhtc=50
    )
    db.add(gp)
    await db.flush()

    # 3. Water Supply Scheme
    scheme = Scheme(
        scheme_id="SCH-UP-245123",
        name="Badepur Piped Water Supply Scheme (JJM)",
        lgd_gp_code="245123",
        state="UP",
        source_type="Groundwater_Deep_Tubewell",
        commissioned_date="2023-08-15"
    )
    db.add(scheme)

    # 4. Village & Habitations
    village = Village(village_id="VIL-245123", name="Badepur Khas", lgd_gp_code="245123")
    db.add(village)
    await db.flush()

    habitations = [
        Habitation(habitation_id="HAB-245123-001", name="Badepur Main Ward 1", village_id="VIL-245123", lgd_gp_code="245123"),
        Habitation(habitation_id="HAB-245123-002", name="Harijan Basti Ward 2", village_id="VIL-245123", lgd_gp_code="245123"),
        Habitation(habitation_id="HAB-245123-003", name="Kisan Mohalla Ward 3", village_id="VIL-245123", lgd_gp_code="245123"),
        Habitation(habitation_id="HAB-245123-004", name="Panchayat Ghar Ward 4", village_id="VIL-245123", lgd_gp_code="245123"),
    ]
    db.add_all(habitations)
    await db.flush()

    # 5. IoT Nodes
    nodes = [
        Node(
            node_id="JS-UP-245123-N001",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            type="pump",
            fw="1.0.0",
            status="online",
            battery_v=12.4,
            rssi_dbm=-68,
            branch="Intake_Pump_Station",
            lat=28.9840,
            lon=77.7050
        ),
        Node(
            node_id="JS-UP-245123-N002",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            type="esr_level",
            fw="1.0.0",
            status="online",
            battery_v=3.95,
            rssi_dbm=-72,
            branch="Overhead_Storage_Reservoir",
            lat=28.9845,
            lon=77.7060
        ),
        Node(
            node_id="JS-UP-245123-N003",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            type="flow",
            fw="1.0.0",
            status="online",
            battery_v=3.88,
            rssi_dbm=-75,
            branch="DMA_Distribution_Main",
            lat=28.9850,
            lon=77.7065
        ),
        Node(
            node_id="JS-UP-245123-N004",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            type="pressure",
            fw="1.0.0",
            status="online",
            battery_v=3.82,
            rssi_dbm=-79,
            branch="Tail_End_Zone",
            lat=28.9860,
            lon=77.7080
        ),
        Node(
            node_id="JS-UP-245123-N005",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            type="quality",
            fw="1.0.0",
            status="online",
            battery_v=4.10,
            rssi_dbm=-70,
            branch="Water_Treatment_Exit",
            lat=28.9848,
            lon=77.7055
        ),
    ]
    db.add_all(nodes)

    # 6. Seed 50 FHTCs
    base_lat = 28.9845
    base_lon = 77.7060
    fhtcs = []
    for i in range(1, 51):
        fhtc_id = f"FHTC-UP-245123-{i:04d}"
        hab_idx = (i % 4)
        hab_id = habitations[hab_idx].habitation_id
        # slight offset for visual GIS map placement
        offset_lat = ((i % 7) - 3) * 0.0008
        offset_lon = ((i // 7) - 3) * 0.0008

        status_val = "functional"
        if i in (14, 28):
            status_val = "intermittent"
        elif i == 42:
            status_val = "non_functional"

        fhtc = FHTC(
            fhtc_id=fhtc_id,
            habitation_id=hab_id,
            lgd_gp_code="245123",
            consumer_name_masked=f"Resident {i:02d}",
            phone_masked=f"98XXXX{i:04d}",
            lat=base_lat + offset_lat,
            lon=base_lon + offset_lon,
            branch="Branch_South_Ward3" if hab_idx == 2 else "Main_Branch",
            status=status_val
        )
        fhtcs.append(fhtc)
    db.add_all(fhtcs)

    # 7. Seed Standard RBAC Users
    users = [
        User(user_id="USR-CITIZEN-01", phone="9800000000", phone_masked="98XXXX0000", name="Ram Charan", role="citizen", lgd_gp_code="245123", last_otp="123456"),
        User(user_id="USR-JALMITRA-01", phone="9800001111", phone_masked="98XXXX1111", name="Ramesh Kumar (Jal Mitra)", role="jal_mitra", lgd_gp_code="245123", last_otp="123456"),
        User(user_id="USR-VWSC-01", phone="9800002222", phone_masked="98XXXX2222", name="Sita Devi (Sarpanch / VWSC Head)", role="vwsc", lgd_gp_code="245123", last_otp="123456"),
        User(user_id="USR-JE-01", phone="9800003333", phone_masked="98XXXX3333", name="Er. A. Sharma (Junior Engineer)", role="je", lgd_gp_code="245123", last_otp="123456"),
        User(user_id="USR-EE-01", phone="9800004444", phone_masked="98XXXX4444", name="Er. V. Singh (Executive Engineer)", role="ee", lgd_gp_code="245123", last_otp="123456"),
        User(user_id="USR-ADMIN-01", phone="9800009999", phone_masked="98XXXX9999", name="State Mission Director (JJM)", role="state_admin", lgd_gp_code="245123", last_otp="123456"),
    ]
    db.add_all(users)

    # 8. Seed Initial Sample Telemetry Metrics
    now = datetime.now(timezone.utc)
    telemetry_samples = [
        TelemetryRecord(
            schema_version="1.0",
            node_id="JS-UP-245123-N001",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            ts=now - timedelta(minutes=15),
            seq=101,
            type="pump",
            values={"current_a": 14.8, "voltage_v": 415.0, "state": 1, "frequency_hz": 50.0},
            battery_v=12.4,
            rssi_dbm=-68,
            fw="1.0.0"
        ),
        TelemetryRecord(
            schema_version="1.0",
            node_id="JS-UP-245123-N002",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            ts=now - timedelta(minutes=10),
            seq=102,
            type="esr_level",
            values={"level_cm": 245.0, "level_pct": 78.5},
            battery_v=3.95,
            rssi_dbm=-72,
            fw="1.0.0"
        ),
        TelemetryRecord(
            schema_version="1.0",
            node_id="JS-UP-245123-N003",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            ts=now - timedelta(minutes=8),
            seq=103,
            type="flow",
            values={"flow_lpm": 84.5, "totalizer_l": 54200.0},
            battery_v=3.88,
            rssi_dbm=-75,
            fw="1.0.0"
        ),
        TelemetryRecord(
            schema_version="1.0",
            node_id="JS-UP-245123-N004",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            ts=now - timedelta(minutes=5),
            seq=104,
            type="pressure",
            values={"pressure_kpa": 128.5},
            battery_v=3.82,
            rssi_dbm=-79,
            fw="1.0.0"
        ),
        TelemetryRecord(
            schema_version="1.0",
            node_id="JS-UP-245123-N005",
            lgd_gp_code="245123",
            scheme_id="SCH-UP-245123",
            ts=now - timedelta(minutes=2),
            seq=105,
            type="quality",
            values={"turbidity_ntu": 1.45, "chlorine_mgl": 0.42, "ph": 7.35, "tds_ppm": 210.0},
            battery_v=4.10,
            rssi_dbm=-70,
            fw="1.0.0"
        ),
    ]
    db.add_all(telemetry_samples)

    # 9. Seed Sample Alert (Low pressure at tail-end connection)
    alert = AlertIncident(
        alert_id="ALT-20261004-001",
        type="low_pressure",
        severity="high",
        lgd_gp_code="245123",
        branch="Branch_South_Ward3",
        fhtc_id="FHTC-UP-245123-0042",
        reason="Tail-end terminal pressure dropped to 52.0 kPa (below JJM standard 70 kPa)",
        created_ts=now - timedelta(hours=5),
        status="active",
        escalation_level="vwsc",
        escalated_at=now - timedelta(hours=1)
    )
    db.add(alert)

    # 10. Seed Sample Grievance & Cluster
    cluster = FeedbackCluster(
        cluster_id="CLUS-245123-001",
        lgd_gp_code="245123",
        habitation_id="HAB-245123-003",
        category="low_pressure",
        count=2,
        status="open",
        center_lat=28.9860,
        center_lon=77.7080,
        first_reported_ts=now - timedelta(hours=4),
        last_reported_ts=now - timedelta(hours=2)
    )
    db.add(cluster)
    await db.flush()

    feedback = CitizenFeedback(
        feedback_id="FB-20261004-0012",
        fhtc_id="FHTC-UP-245123-0042",
        lgd_gp_code="245123",
        channel="whatsapp",
        category="low_pressure",
        text="पानी का दबाव बहुत कम है नल से धीरे पानी आ रहा है (Water pressure is very low)",
        lat=28.9860,
        lon=77.7080,
        lang="hi",
        ts=now - timedelta(hours=2),
        cluster_id="CLUS-245123-001",
        status="queued_for_verification"
    )
    db.add(feedback)

    await db.commit()
    logger.info("Successfully seeded demo village Badepur (245123) with 50 FHTCs and active nodes!")


async def main():
    await init_db()
    async with AsyncSessionLocal() as session:
        await seed_demo_village(session)


if __name__ == "__main__":
    asyncio.run(main())
