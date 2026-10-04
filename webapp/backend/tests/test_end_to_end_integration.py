import pytest
import json
from pathlib import Path
from datetime import datetime, timezone
from httpx import AsyncClient
from sqlalchemy import select
from app.models.alert import AlertIncident
from app.models.audit import IMISSyncAudit

REPO_ROOT = Path(__file__).resolve().parent.parent.parent.parent
VALID_EXAMPLES = REPO_ROOT / "contracts" / "examples" / "valid"


@pytest.mark.asyncio
async def test_end_to_end_telemetry_to_alert_to_imis_sync(client: AsyncClient, db_session):
    """
    End-to-end verification required by acceptance criteria:
    Publish sample telemetry -> alert appears with reason -> repair/closure loop -> mock IMIS receives sync record.
    """
    # 1. Load sample telemetry conforming to contracts
    pressure_sample_file = VALID_EXAMPLES / "telemetry_pressure_valid.json"
    if pressure_sample_file.exists():
        with open(pressure_sample_file, "r") as f:
            sample_payload = json.load(f)
    else:
        sample_payload = {
            "schema_version": "1.0",
            "node_id": "NS-UP-245123-N004",
            "lgd_gp_code": "245123",
            "scheme_id": "SCH-UP-245123",
            "ts": datetime.now(timezone.utc).isoformat(),
            "seq": 8801,
            "type": "pressure",
            "values": {"pressure_kpa": 45.0},
            "battery_v": 3.85,
            "rssi_dbm": -75,
            "fw": "1.0.0"
        }

    # Inject low pressure condition to trigger alert
    sample_payload["values"]["pressure_kpa"] = 42.0
    sample_payload["seq"] = 9888
    sample_payload["ts"] = datetime.now(timezone.utc).isoformat()

    # Step 1: Ingest telemetry
    ingest_resp = await client.post("/api/v1/telemetry/ingest", json=sample_payload)
    assert ingest_resp.status_code == 202

    # Step 2: Verify alert appears with its reason
    alerts_resp = await client.get("/api/v1/alerts?lgd_gp_code=245123&status=active")
    assert alerts_resp.status_code == 200
    active_alerts = alerts_resp.json()
    assert len(active_alerts) > 0

    target_alert = None
    for a in active_alerts:
        if a["type"] == "low_pressure":
            target_alert = a
            break

    assert target_alert is not None
    assert "pressure" in target_alert["reason"].lower()
    alert_id = target_alert["alert_id"]

    # Step 3: Run escalation cycle
    esc_resp = await client.post("/api/v1/alerts/run-escalations")
    assert esc_resp.status_code == 200

    # Step 4: Repair-closure loop - Technician submits photo proof
    repair_resp = await client.patch(
        f"/api/v1/alerts/{alert_id}",
        json={
            "status": "pending_citizen_confirmation",
            "technician_photo_url": "https://storage.neersync.gov.in/repairs/valve_repair_e2e.jpg",
            "resolution_notes": "Replaced faulty diaphragm valve at tail-end junction"
        }
    )
    assert repair_resp.status_code == 200
    assert repair_resp.json()["status"] == "pending_citizen_confirmation"

    # Step 5: Repair-closure loop - Citizen confirms restoration
    close_resp = await client.patch(
        f"/api/v1/alerts/{alert_id}",
        json={
            "status": "resolved",
            "citizen_confirmed": True,
            "resolution_notes": "Citizen verified water flow restored at tap"
        }
    )
    assert close_resp.status_code == 200
    assert close_resp.json()["status"] == "resolved"

    # Step 6: Push daily status to Mock IMIS
    imis_resp = await client.post(
        "/api/v1/sync/imis",
        json={
            "reporting_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "lgd_gp_code": "245123",
            "functional_fhtc_count": 50,
            "total_supply_liters": 125000.0
        }
    )
    assert imis_resp.status_code == 200
    assert imis_resp.json()["adapter_mode"] == "UNVERIFIED_MOCK"

    # Step 7: Verify audit record exists in audit logs
    audit_resp = await client.get("/api/v1/sync/audit-logs?lgd_gp_code=245123")
    assert audit_resp.status_code == 200
    audits = audit_resp.json()
    assert len(audits) > 0
    assert audits[0]["lgd_gp_code"] == "245123"
