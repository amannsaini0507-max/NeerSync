import pytest
import io
import json
from unittest.mock import MagicMock
from datetime import datetime, timezone, timedelta
from httpx import AsyncClient
from sqlalchemy import select
from app.models.alert import AlertIncident
from app.models.telemetry import TelemetryRecord
from app.models.feedback import CitizenFeedback
from app.models.master import GramPanchayat
from app.mqtt.subscriber import MQTTIngestionSubscriber
from app.services.index_calculator import index_calculator
from app.services.alert_engine import alert_engine
from app.services.feedback_service import feedback_service


@pytest.mark.asyncio
async def test_alert_router_crud(client: AsyncClient, db_session):
    """Tests GET /alerts, POST /alerts, PATCH /alerts, and POST /alerts/run-escalations."""
    new_alert = {
        "alert_id": "ALT-TEST-ROUTER-001",
        "type": "leakage",
        "severity": "medium",
        "scope": {
            "gp": "245123",
            "branch": "Test_Zone_A",
            "fhtc_id": None
        },
        "reason": "Suspected pipe burst near culvert",
        "created_ts": datetime.now(timezone.utc).isoformat(),
        "status": "active"
    }
    create_resp = await client.post("/api/v1/alerts", json=new_alert)
    assert create_resp.status_code == 201
    assert create_resp.json()["alert_id"] == "ALT-TEST-ROUTER-001"

    # List alerts with filters
    list_resp = await client.get("/api/v1/alerts?lgd_gp_code=245123&status=active&severity=medium")
    assert list_resp.status_code == 200
    alerts = list_resp.json()
    assert any(a["alert_id"] == "ALT-TEST-ROUTER-001" for a in alerts)

    # Patch alert: technician repairs
    patch_resp = await client.patch(
        "/api/v1/alerts/ALT-TEST-ROUTER-001",
        json={
            "status": "pending_citizen_confirmation",
            "technician_photo_url": "https://storage.jalsetu.gov.in/repairs/culvert.jpg",
            "resolution_notes": "Replaced pipe section"
        }
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["status"] == "pending_citizen_confirmation"

    # Patch alert: citizen rejects (issue persists -> reopens)
    reopen_resp = await client.patch(
        "/api/v1/alerts/ALT-TEST-ROUTER-001",
        json={
            "status": "active",
            "citizen_confirmed": False,
            "resolution_notes": "Tap still sputtering"
        }
    )
    assert reopen_resp.status_code == 200
    assert reopen_resp.json()["status"] == "active"

    # Patch non-existent alert returns 404
    not_found = await client.patch(
        "/api/v1/alerts/ALT-DOES-NOT-EXIST",
        json={"status": "resolved"}
    )
    assert not_found.status_code == 404

    # Trigger run-escalations endpoint
    esc_resp = await client.post("/api/v1/alerts/run-escalations")
    assert esc_resp.status_code == 200
    assert "escalated_alerts" in esc_resp.json()


@pytest.mark.asyncio
async def test_master_router_details_and_404s(client: AsyncClient, db_session):
    """Tests GET endpoints for GP, Scheme, Node, and FHTC details as well as 404 conditions."""
    # GP Master
    gp_res = await client.get("/api/v1/master/gps/245123")
    assert gp_res.status_code == 200
    assert gp_res.json()["name"] == "Badepur"

    gp_404 = await client.get("/api/v1/master/gps/999999")
    assert gp_404.status_code == 404

    # Scheme Master
    sch_res = await client.get("/api/v1/master/schemes/SCH-UP-245123")
    assert sch_res.status_code == 200
    assert sch_res.json()["scheme_id"] == "SCH-UP-245123"

    sch_404 = await client.get("/api/v1/master/schemes/SCH-NON-EXISTENT")
    assert sch_404.status_code == 404

    # Node Master
    node_res = await client.get("/api/v1/master/nodes/JS-UP-245123-N001")
    assert node_res.status_code == 200
    assert node_res.json()["type"] == "pump"

    node_404 = await client.get("/api/v1/master/nodes/JS-UP-999999-N999")
    assert node_404.status_code == 404

    # FHTC Master
    fhtc_res = await client.get("/api/v1/master/fhtcs/FHTC-UP-245123-0042")
    assert fhtc_res.status_code == 200
    assert fhtc_res.json()["fhtc_id"] == "FHTC-UP-245123-0042"

    fhtc_404 = await client.get("/api/v1/master/fhtcs/FHTC-UP-000000-0000")
    assert fhtc_404.status_code == 404


@pytest.mark.asyncio
async def test_master_import_csv_endpoint(client: AsyncClient, db_session):
    """Tests CSV bulk import through the master router."""
    csv_data = (
        "state_code,state_name,district_code,district_name,block_code,block_name,lgd_gp_code,gp_name,village_id,village_name,habitation_id,habitation_name,fhtc_id,consumer_name,phone,lat,lon,branch,status\n"
        "UP,Uttar Pradesh,135,Meerut,78,Jani,245199,NewGP,VIL-245199-01,New Village,HAB-245199-01,New Basti,FHTC-UP-245199-0001,Amit Kumar,9876543211,28.981,77.702,Branch_North,functional\n"
    )
    files = {"file": ("test_import.csv", io.BytesIO(csv_data.encode("utf-8")), "text/csv")}
    resp = await client.post("/api/v1/master/import-csv", files=files)
    assert resp.status_code == 200
    assert resp.json()["imported_records"] == 1


@pytest.mark.asyncio
async def test_analytics_and_ml_router(client: AsyncClient, db_session):
    """Tests /api/v1/analytics prediction, anomalies, and service index endpoints."""
    pred_res = await client.get("/api/v1/analytics/predict/supply?lgd_gp_code=245123")
    assert pred_res.status_code == 200
    data = pred_res.json()
    assert "predicted_supply_hours" in data
    assert data["confidence_score"] > 0

    anom_res = await client.get("/api/v1/analytics/anomalies?lgd_gp_code=245123")
    assert anom_res.status_code == 200
    assert "anomalies" in anom_res.json()

    idx_res = await client.get("/api/v1/analytics/fhtc-index?lgd_gp_code=245123&window_days=7")
    assert idx_res.status_code == 200
    idx_data = idx_res.json()
    assert 0.0 <= idx_data["fhtc_service_index"] <= 100.0
    assert "status_category" in idx_data


@pytest.mark.asyncio
async def test_auth_full_cycle(client: AsyncClient, db_session):
    """Tests OTP request, DPDP consent failure, OTP verification, and /auth/me."""
    phone = "9876543210"

    # DPDP consent rejected
    no_consent = await client.post("/api/v1/auth/request-otp", json={"phone": phone, "consent": False})
    assert no_consent.status_code == 400

    # DPDP consent granted
    req_otp = await client.post("/api/v1/auth/request-otp", json={"phone": phone, "consent": True})
    assert req_otp.status_code == 200
    assert req_otp.json()["mock_otp"] == "123456"

    # Verify OTP invalid
    bad_otp = await client.post("/api/v1/auth/verify-otp", json={"phone": phone, "otp": "000000"})
    assert bad_otp.status_code == 400

    # Verify OTP success
    good_otp = await client.post("/api/v1/auth/verify-otp", json={"phone": phone, "otp": "123456"})
    assert good_otp.status_code == 200
    token_data = good_otp.json()
    assert "access_token" in token_data
    token = token_data["access_token"]

    # Fetch profile /auth/me with Bearer token
    me_res = await client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_res.status_code == 200
    assert me_res.json()["role"] in ["citizen", "jal_mitra"]

    # Fetch profile without Bearer token -> 401
    unauth = await client.get("/api/v1/auth/me")
    assert unauth.status_code == 401


@pytest.mark.asyncio
async def test_citizen_channels_coverage(client: AsyncClient, db_session):
    """Tests QR one-tap, WhatsApp webhook with heuristics, IVR simulator, and feedback list/clusters."""
    # 1. QR one-tap 'water came'
    qr_res = await client.post(
        "/api/v1/feedback/qr",
        json={
            "fhtc_id": "FHTC-UP-245123-0042",
            "water_came": True,
            "note": "Ample flow recorded",
            "lang": "hi"
        }
    )
    assert qr_res.status_code == 201
    assert qr_res.json()["status"] == "success"

    # 2. WhatsApp bot message with dirty water keyword
    wa_res = await client.post(
        "/api/v1/feedback/whatsapp",
        json={
            "from_number": "+919876543210",
            "message_text": "नल में गंदा और मटमैला पानी आ रहा है",
            "fhtc_id": "FHTC-UP-245123-0042"
        }
    )
    assert wa_res.status_code == 200
    assert "FB-" in wa_res.json()["reply"]

    # 3. IVR missed call
    ivr_res = await client.post(
        "/api/v1/feedback/ivr",
        json={
            "caller_phone": "9876543210",
            "fhtc_id": "FHTC-UP-245123-0042",
            "dtmf_digit": "1",
            "lang": "hi"
        }
    )
    assert ivr_res.status_code == 200
    assert "feedback_id" in ivr_res.json()

    # 4. List feedbacks
    list_fb = await client.get("/api/v1/feedback?lgd_gp_code=245123")
    assert list_fb.status_code == 200
    assert len(list_fb.json()) > 0

    # 5. List clusters
    clusters = await client.get("/api/v1/feedback/clusters?lgd_gp_code=245123")
    assert clusters.status_code == 200


@pytest.mark.asyncio
async def test_mock_gateways_and_sync(client: AsyncClient, db_session):
    """Tests mock IMIS, Sujal Gaon, and ML predict endpoints, plus Sujal Gaon sync trigger and audit log."""
    m_imis = await client.post(
        "/api/v1/mock/imis",
        json={"batch_id": "MOCK-1", "dispatch_ts": "2026-10-04T12:00:00Z"}
    )
    assert m_imis.status_code == 200
    assert m_imis.json()["adapter_mode"] == "UNVERIFIED_MOCK"

    m_sujal = await client.post(
        "/api/v1/mock/sujal-gaon",
        json={"lgd_gp_code": "245123", "certified_status": "CERTIFIED"}
    )
    assert m_sujal.status_code == 200

    m_ml_press = await client.post(
        "/api/v1/mock/predict",
        json={"type": "pressure", "values": {"pressure_kpa": 40.0}}
    )
    assert m_ml_press.status_code == 200
    assert m_ml_press.json()["anomaly_detected"] is True

    m_ml_flow = await client.post(
        "/api/v1/mock/predict",
        json={"type": "flow", "values": {"flow_lpm": 0.0}}
    )
    assert m_ml_flow.status_code == 200
    assert m_ml_flow.json()["anomaly_detected"] is True

    # 1. Trigger IMIS Push to create IMISSyncAudit record
    imis_push = await client.post(
        "/api/v1/sync/imis",
        json={
            "reporting_date": "2026-10-04",
            "lgd_gp_code": "245123",
            "functional_fhtc_count": 50,
            "total_supply_liters": 125000.0
        }
    )
    assert imis_push.status_code == 200
    assert imis_push.json()["sync_status"] in ["MOCK_SYNC_QUEUED", "MOCK_SYNC_OFFLINE_SAVED", "FAILED_CSV_FALLBACK"]

    # 2. Trigger Sujal Gaon Sync with valid schema
    s_sync = await client.post(
        "/api/v1/sync/sujal-gaon",
        json={
            "lgd_gp_code": "245123",
            "certified_status": "CERTIFIED",
            "evaluation_ts": datetime.now(timezone.utc).isoformat()
        }
    )
    assert s_sync.status_code == 200
    assert s_sync.json()["sync_status"] == "MOCK_VILLAGE_SYNCED"

    # 3. Query Sync Audit Logs
    logs_res = await client.get("/api/v1/sync/audit-logs?lgd_gp_code=245123")
    assert logs_res.status_code == 200
    assert len(logs_res.json()) > 0


@pytest.mark.asyncio
async def test_mqtt_subscriber_direct_dispatch(db_session):
    """Directly exercises MQTT subscriber message decoding and routing."""
    sub = MQTTIngestionSubscriber()

    class FakeMsg:
        def __init__(self, topic, payload):
            self.topic = topic
            self.payload = payload

    # Valid telemetry message
    valid_payload = json.dumps({
        "schema_version": "1.0",
        "node_id": "JS-UP-245123-N001",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": datetime.now(timezone.utc).isoformat(),
        "seq": 9999,
        "type": "pump",
        "values": {"voltage_v": 230.0, "current_a": 12.5, "state": "on"},
        "battery_v": 4.10,
        "rssi_dbm": -68,
        "fw": "1.0.0"
    }).encode("utf-8")

    sub._on_message(None, None, FakeMsg("jalsetu/v1/245123/JS-UP-245123-N001/telemetry", valid_payload))

    # Valid status message
    valid_status = json.dumps({
        "schema_version": "1.0",
        "node_id": "JS-UP-245123-N001",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": datetime.now(timezone.utc).isoformat(),
        "seq": 10000,
        "status": "online",
        "battery_v": 4.10,
        "rssi_dbm": -68,
        "fw": "1.0.0"
    }).encode("utf-8")

    sub._on_message(None, None, FakeMsg("jalsetu/v1/245123/JS-UP-245123-N001/status", valid_status))

    # Non-canonical topic ignored
    sub._on_message(None, None, FakeMsg("other/invalid/topic", b"{}"))

    # Corrupt JSON
    sub._on_message(None, None, FakeMsg("jalsetu/v1/245123/JS-UP-245123-N001/telemetry", b"NOT_JSON"))

    # Callbacks with mock client
    mock_client = MagicMock()
    sub._on_connect(mock_client, None, None, 0)
    sub._on_connect(mock_client, None, None, 1)
    sub._on_disconnect(mock_client, None, 0)


@pytest.mark.asyncio
async def test_deep_index_calculator_and_alert_engine(db_session):
    """Deeply exercises index_calculator and alert_engine across diverse scenarios."""
    now = datetime.now(timezone.utc)
    t_flow = TelemetryRecord(
        schema_version="1.0",
        node_id="JS-UP-245123-N002",
        lgd_gp_code="245123",
        scheme_id="SCH-UP-245123",
        ts=now - timedelta(hours=2),
        seq=5001,
        type="flow",
        values={"flow_lpm": 30.0},
        battery_v=3.9,
        rssi_dbm=-70,
        fw="1.0.0"
    )
    t_press = TelemetryRecord(
        schema_version="1.0",
        node_id="JS-UP-245123-N004",
        lgd_gp_code="245123",
        scheme_id="SCH-UP-245123",
        ts=now - timedelta(hours=1),
        seq=5002,
        type="pressure",
        values={"pressure_kpa": 85.0},
        battery_v=3.9,
        rssi_dbm=-70,
        fw="1.0.0"
    )
    t_qual = TelemetryRecord(
        schema_version="1.0",
        node_id="JS-UP-245123-N005",
        lgd_gp_code="245123",
        scheme_id="SCH-UP-245123",
        ts=now - timedelta(minutes=30),
        seq=5003,
        type="quality",
        values={"turbidity_ntu": 1.5, "chlorine_mgl": 0.35, "ph": 7.4},
        battery_v=4.0,
        rssi_dbm=-72,
        fw="1.0.0"
    )
    db_session.add_all([t_flow, t_press, t_qual])
    await db_session.commit()

    # Calculate index directly
    idx = await index_calculator.calculate_gp_index(db_session, "245123", window_days=7)
    assert 0.0 <= idx["fhtc_service_index"] <= 100.0
    assert idx["status_category"] in ["EXCELLENT", "SATISFACTORY", "AT_RISK", "NON_FUNCTIONAL"]

    # Check alert evaluation in alert_engine
    normal_telemetry = {
        "schema_version": "1.0",
        "node_id": "JS-UP-245123-N004",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": now.isoformat(),
        "seq": 5004,
        "type": "pressure",
        "values": {"pressure_kpa": 110.0},
        "battery_v": 4.0,
        "rssi_dbm": -65,
        "fw": "1.0.0"
    }
    await alert_engine.evaluate_telemetry(db_session, normal_telemetry)


@pytest.mark.asyncio
async def test_node_status_ingest_and_offline_alerts(client: AsyncClient, db_session):
    """Tests POST /api/v1/status/ingest and alert creation on node offline."""
    now = datetime.now(timezone.utc)
    # 1. Ingest offline status matching contracts/status.schema.json -> creates node_offline alert
    offline_payload = {
        "node_id": "JS-UP-245123-N003",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "status": "offline",
        "uptime_s": 3600,
        "battery_v": 3.65,
        "rssi_dbm": -88,
        "fw": "1.0.0",
        "last_seen_ts": now.isoformat(),
        "reason": "Battery depleted below 3.7V cutoff"
    }
    res_off = await client.post("/api/v1/status/ingest", json=offline_payload)
    assert res_off.status_code == 200

    # Verify node_offline alert was created
    q = select(AlertIncident).where(
        AlertIncident.lgd_gp_code == "245123",
        AlertIncident.type == "node_offline"
    )
    alert = (await db_session.execute(q)).scalar_one_or_none()
    assert alert is not None
    assert alert.status == "active"

    # 2. Ingest online status -> auto-closes node_offline alert
    online_payload = {
        "node_id": "JS-UP-245123-N003",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "status": "online",
        "uptime_s": 60,
        "battery_v": 4.15,
        "rssi_dbm": -65,
        "fw": "1.0.0",
        "last_seen_ts": (now + timedelta(minutes=5)).isoformat()
    }
    res_on = await client.post("/api/v1/status/ingest", json=online_payload)
    assert res_on.status_code == 200

    # Verify alert auto-closed
    await db_session.refresh(alert)
    assert alert.status == "resolved"
    assert alert.auto_closed is True


@pytest.mark.asyncio
async def test_all_auth_roles_and_lookups(client: AsyncClient, db_session):
    """Tests all RBAC roles based on phone conventions and OTP re-requests."""
    roles_phones = {
        "jal_mitra": "9000001111",
        "vwsc": "9000002222",
        "je": "9000003333",
        "ee": "9000004444",
        "state_admin": "9000009999"
    }

    for expected_role, phone in roles_phones.items():
        # 1. First OTP request (creates user)
        res1 = await client.post("/api/v1/auth/request-otp", json={"phone": phone, "consent": True})
        assert res1.status_code == 200

        # 2. Re-request OTP on existing user (updates last_otp)
        res2 = await client.post("/api/v1/auth/request-otp", json={"phone": phone, "consent": True})
        assert res2.status_code == 200

        # 3. Verify OTP
        v_res = await client.post("/api/v1/auth/verify-otp", json={"phone": phone, "otp": "123456"})
        assert v_res.status_code == 200
        assert v_res.json()["role"] == expected_role

    # Non-existent phone returns 400
    bad_verify = await client.post("/api/v1/auth/verify-otp", json={"phone": "0000000000", "otp": "123456"})
    assert bad_verify.status_code == 400


@pytest.mark.asyncio
async def test_feedback_advanced_clustering_and_filters(client: AsyncClient, db_session):
    """Tests spatio-temporal clustering within 200m and feedback list filters."""
    now = datetime.now(timezone.utc)
    # WhatsApp keyword heuristics: leakage and low pressure
    wa_leak = await client.post(
        "/api/v1/feedback/whatsapp",
        json={"from_number": "+919876543211", "message_text": "huge leak in main pipeline"}
    )
    assert wa_leak.status_code == 200

    wa_press = await client.post(
        "/api/v1/feedback/whatsapp",
        json={"from_number": "+919876543212", "message_text": "water pressure is very low"}
    )
    assert wa_press.status_code == 200

    # Spatio-temporal cluster: two feedbacks 50 meters apart
    fb1 = {
        "feedback_id": "FB-CLUSTER-TEST-1",
        "fhtc_id": "FHTC-UP-245123-0042",
        "channel": "app",
        "category": "leakage",
        "text": "Leakage near pole 14",
        "lat": 28.9845,
        "lon": 77.7064,
        "lang": "hi",
        "ts": now.isoformat()
    }
    fb2 = {
        "feedback_id": "FB-CLUSTER-TEST-2",
        "fhtc_id": "FHTC-UP-245123-0042",
        "channel": "app",
        "category": "leakage",
        "text": "Water pooling near same pole",
        "lat": 28.9848,  # ~30 meters away
        "lon": 77.7065,
        "lang": "hi",
        "ts": (now + timedelta(minutes=10)).isoformat()
    }

    res1, _, _, c1 = await feedback_service.submit_feedback(db_session, fb1)
    res2, _, _, c2 = await feedback_service.submit_feedback(db_session, fb2)
    assert res1 is True
    assert res2 is True
    assert c1 is not None
    assert c1 == c2  # Joined same spatio-temporal cluster!

    # Query filtered feedbacks
    filtered = await client.get("/api/v1/feedback?lgd_gp_code=245123&category=leakage")
    assert filtered.status_code == 200


