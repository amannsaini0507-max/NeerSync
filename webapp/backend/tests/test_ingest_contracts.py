import json
import pytest
from pathlib import Path
from httpx import AsyncClient
from app.config import settings

CONTRACTS_DIR = settings.contracts_dir
VALID_DIR = CONTRACTS_DIR / "examples" / "valid"
INVALID_DIR = CONTRACTS_DIR / "examples" / "invalid"


@pytest.mark.asyncio
async def test_valid_telemetry_samples_ingest(client: AsyncClient):
    """Verifies that all valid telemetry samples in /contracts are accepted with HTTP 202."""
    telemetry_files = list(VALID_DIR.glob("telemetry_*.json"))
    assert len(telemetry_files) > 0, "No valid telemetry examples found"

    for file in telemetry_files:
        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)

        response = await client.post("/api/v1/telemetry/ingest", json=data)
        assert response.status_code == 202, f"Failed on {file.name}: {response.text}"
        body = response.json()
        assert body["status"] == "accepted"
        assert "received_ts" in body


@pytest.mark.asyncio
async def test_invalid_telemetry_samples_rejected(client: AsyncClient):
    """Verifies that all invalid telemetry samples in /contracts are rejected with HTTP 422."""
    invalid_files = list(INVALID_DIR.glob("telemetry_*.json"))
    assert len(invalid_files) > 0, "No invalid telemetry examples found"

    for file in invalid_files:
        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)

        response = await client.post("/api/v1/telemetry/ingest", json=data)
        assert response.status_code in (400, 422), f"Expected rejection on {file.name}, got {response.status_code}"


@pytest.mark.asyncio
async def test_telemetry_idempotency_on_node_and_seq(client: AsyncClient):
    """Verifies that sending identical (node_id, seq) is treated as idempotent."""
    payload = {
        "schema_version": "1.0",
        "node_id": "NS-UP-245123-N004",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": "2026-10-04T12:00:00Z",
        "seq": 9991,
        "type": "pressure",
        "values": {"pressure_kpa": 140.0},
        "battery_v": 3.85,
        "rssi_dbm": -75,
        "fw": "1.0.0"
    }

    # First send: 202 Accepted
    resp1 = await client.post("/api/v1/telemetry/ingest", json=payload)
    assert resp1.status_code == 202

    # Second send (identical seq): Still 202 Accepted, idempotent
    resp2 = await client.post("/api/v1/telemetry/ingest", json=payload)
    assert resp2.status_code == 202


@pytest.mark.asyncio
async def test_oversized_payload_rejected(client: AsyncClient):
    """Verifies that telemetry exceeding contract maximum 1024 bytes is rejected."""
    payload = {
        "schema_version": "1.0",
        "node_id": "NS-UP-245123-N004",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "ts": "2026-10-04T12:00:00Z",
        "seq": 9992,
        "type": "pressure",
        "values": {
            "pressure_kpa": 140.0,
            "padding": "x" * 1200  # Exceeds 1024 bytes
        },
        "battery_v": 3.85,
        "rssi_dbm": -75,
        "fw": "1.0.0"
    }
    response = await client.post("/api/v1/telemetry/ingest", json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_status_ingest_valid_and_invalid(client: AsyncClient):
    """Verifies status/heartbeat ingestion and rejection of malformed status."""
    valid_status = {
        "node_id": "NS-UP-245123-N001",
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "status": "online",
        "uptime_s": 86400,
        "battery_v": 3.90,
        "rssi_dbm": -65,
        "fw": "1.0.0",
        "last_seen_ts": "2026-10-04T12:00:00Z",
        "reason": "PERIODIC_HEARTBEAT"
    }
    resp_valid = await client.post("/api/v1/status/ingest", json=valid_status)
    assert resp_valid.status_code == 200

    # Invalid status value
    invalid_status = valid_status.copy()
    invalid_status["status"] = "sleeping_not_allowed"
    resp_inv = await client.post("/api/v1/status/ingest", json=invalid_status)
    assert resp_inv.status_code == 400
