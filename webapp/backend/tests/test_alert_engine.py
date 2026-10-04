import pytest
from datetime import datetime, timezone, timedelta
from httpx import AsyncClient
from sqlalchemy import select
from app.models.alert import AlertIncident, AlertEscalationLog
from app.services.alert_engine import alert_engine


@pytest.mark.asyncio
async def test_low_pressure_triggers_alert(client: AsyncClient, db_session):
    """Verifies that pressure < 70 kPa generates a low_pressure alert."""
    payload = {
        "schema_version": "1.0",
        "node_id": "NS-UP-245123-N004",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": datetime.now(timezone.utc).isoformat(),
        "seq": 1101,
        "type": "pressure",
        "values": {"pressure_kpa": 45.0},  # Low pressure
        "battery_v": 3.85,
        "rssi_dbm": -75,
        "fw": "1.0.0"
    }

    resp = await client.post("/api/v1/telemetry/ingest", json=payload)
    assert resp.status_code == 202

    # Verify alert exists in database
    q = select(AlertIncident).where(
        AlertIncident.lgd_gp_code == "245123",
        AlertIncident.branch == "Tail_End_Zone",
        AlertIncident.type == "low_pressure",
        AlertIncident.status == "active"
    )
    res = await db_session.execute(q)
    alert = res.scalar_one_or_none()
    assert alert is not None
    assert "pressure" in alert.reason.lower()
    assert alert.escalation_level == "jal_mitra"


@pytest.mark.asyncio
async def test_quality_breach_triggers_alert(client: AsyncClient, db_session):
    """Verifies that turbidity > 5 NTU triggers quality alert."""
    payload = {
        "schema_version": "1.0",
        "node_id": "NS-UP-245123-N005",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": datetime.now(timezone.utc).isoformat(),
        "seq": 1102,
        "type": "quality",
        "values": {
            "turbidity_ntu": 8.5,  # Exceeds 5.0 NTU limit
            "chlorine_mgl": 0.45,
            "ph": 7.2
        },
        "battery_v": 4.10,
        "rssi_dbm": -70,
        "fw": "1.0.0"
    }

    resp = await client.post("/api/v1/telemetry/ingest", json=payload)
    assert resp.status_code == 202

    q = select(AlertIncident).where(
        AlertIncident.lgd_gp_code == "245123",
        AlertIncident.branch == "Water_Treatment_Exit",
        AlertIncident.type == "quality",
        AlertIncident.status == "active"
    )
    res = await db_session.execute(q)
    alert = res.scalar_one_or_none()
    assert alert is not None
    assert "turbidity" in alert.reason.lower()


@pytest.mark.asyncio
async def test_alert_deduplication(client: AsyncClient, db_session):
    """Verifies that multiple violations for the same node/branch do not spawn duplicate active tickets."""
    for seq_num in range(1201, 1204):
        payload = {
            "schema_version": "1.0",
            "node_id": "NS-UP-245123-N004",
            "lgd_gp_code": "245123",
            "scheme_id": "SCH-UP-245123",
            "ts": datetime.now(timezone.utc).isoformat(),
            "seq": seq_num,
            "type": "pressure",
            "values": {"pressure_kpa": 40.0},
            "battery_v": 3.85,
            "rssi_dbm": -75,
            "fw": "1.0.0"
        }
        await client.post("/api/v1/telemetry/ingest", json=payload)

    # Count active low_pressure alerts for this branch
    q = select(AlertIncident).where(
        AlertIncident.lgd_gp_code == "245123",
        AlertIncident.branch == "Tail_End_Zone",
        AlertIncident.type == "low_pressure",
        AlertIncident.status == "active"
    )
    res = await db_session.execute(q)
    alerts = res.scalars().all()
    # Deduplication ensures only 1 active alert exists for this branch
    assert len(alerts) == 1


@pytest.mark.asyncio
async def test_auto_closure_on_recovery(client: AsyncClient, db_session):
    """Verifies that when metrics return to normal compliant range, active alert auto-closes."""
    # 1. Trigger low pressure
    p_low = {
        "schema_version": "1.0",
        "node_id": "NS-UP-245123-N004",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": datetime.now(timezone.utc).isoformat(),
        "seq": 1301,
        "type": "pressure",
        "values": {"pressure_kpa": 45.0},
        "battery_v": 3.85,
        "rssi_dbm": -75,
        "fw": "1.0.0"
    }
    await client.post("/api/v1/telemetry/ingest", json=p_low)

    # 2. Send normal pressure >= 75 kPa
    p_norm = {
        "schema_version": "1.0",
        "node_id": "NS-UP-245123-N004",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": datetime.now(timezone.utc).isoformat(),
        "seq": 1302,
        "type": "pressure",
        "values": {"pressure_kpa": 140.0},
        "battery_v": 3.85,
        "rssi_dbm": -75,
        "fw": "1.0.0"
    }
    await client.post("/api/v1/telemetry/ingest", json=p_norm)

    # Verify alert resolved automatically
    q = select(AlertIncident).where(
        AlertIncident.lgd_gp_code == "245123",
        AlertIncident.branch == "Tail_End_Zone",
        AlertIncident.type == "low_pressure"
    )
    res = await db_session.execute(q)
    alert = res.scalars().first()
    assert alert.status == "resolved"
    assert alert.auto_closed is True


@pytest.mark.asyncio
async def test_escalation_lifecycle_and_repair_loop(client: AsyncClient, db_session):
    """Verifies multi-tier escalation and technician photo + citizen confirmation loop."""
    now = datetime.now(timezone.utc)
    old_time = now - timedelta(hours=6)

    # Create an alert aged 6 hours (past 4h VWSC threshold)
    alert = AlertIncident(
        alert_id="ALT-TEST-ESCALATION-01",
        type="no_supply",
        severity="high",
        lgd_gp_code="245123",
        branch="Main_Branch",
        reason="Distribution flow is zero",
        created_ts=old_time,
        status="active",
        escalation_level="jal_mitra"
    )
    db_session.add(alert)
    await db_session.commit()

    # Trigger escalation cycle
    escalated = await alert_engine.run_escalation_cycle(db_session)
    assert escalated >= 1

    # Reload alert
    await db_session.refresh(alert)
    assert alert.escalation_level == "vwsc"

    # Step 1 of Repair Loop: Field technician marks repaired + uploads photo
    resp_tech = await client.patch(
        f"/api/v1/alerts/{alert.alert_id}",
        json={
            "status": "pending_citizen_confirmation",
            "technician_photo_url": "https://storage.neersync.gov.in/evidence/valve_repaired.jpg",
            "resolution_notes": "Replaced clogged gate valve on Main Branch"
        }
    )
    assert resp_tech.status_code == 200
    assert resp_tech.json()["status"] == "pending_citizen_confirmation"

    # Step 2 of Repair Loop: Citizen confirms water supply restored
    resp_cit = await client.patch(
        f"/api/v1/alerts/{alert.alert_id}",
        json={
            "status": "resolved",
            "citizen_confirmed": True,
            "resolution_notes": "Citizen verified water restored with good pressure"
        }
    )
    assert resp_cit.status_code == 200
    assert resp_cit.json()["status"] == "resolved"
    assert resp_cit.json()["citizen_confirmed"] is True
