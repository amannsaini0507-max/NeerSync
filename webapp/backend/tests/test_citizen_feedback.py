import json
import pytest
from httpx import AsyncClient
from app.config import settings

VALID_DIR = settings.contracts_dir / "examples" / "valid"
INVALID_DIR = settings.contracts_dir / "examples" / "invalid"


@pytest.mark.asyncio
async def test_valid_feedback_samples_ingest(client: AsyncClient):
    """Verifies that all valid feedback sample payloads in /contracts pass."""
    feedback_files = list(VALID_DIR.glob("feedback_*.json"))
    assert len(feedback_files) > 0, "No valid feedback samples found"

    for file in feedback_files:
        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)
        resp = await client.post("/api/v1/feedback", json=data)
        assert resp.status_code == 201, f"Failed on {file.name}: {resp.text}"
        body = resp.json()
        assert "feedback_id" in body
        assert body["status"] == "queued_for_verification"


@pytest.mark.asyncio
async def test_invalid_feedback_samples_rejected(client: AsyncClient):
    """Verifies that invalid feedback samples are rejected."""
    invalid_files = list(INVALID_DIR.glob("feedback_*.json"))
    assert len(invalid_files) > 0

    for file in invalid_files:
        with open(file, "r", encoding="utf-8") as f:
            data = json.load(f)
        resp = await client.post("/api/v1/feedback", json=data)
        assert resp.status_code in (400, 422), f"Expected failure on {file.name}, got {resp.status_code}"


@pytest.mark.asyncio
async def test_qr_quick_feedback(client: AsyncClient):
    """Verifies one-tap QR landing feedback for /f/{fhtc_id}."""
    qr_payload = {
        "fhtc_id": "FHTC-UP-245123-0042",
        "water_came": False,
        "note": "पानी बिल्कुल नहीं आया (Water didn't arrive today)"
    }
    resp = await client.post("/api/v1/feedback/qr", json=qr_payload)
    assert resp.status_code == 201
    data = resp.json()
    assert data["status"] == "success"
    assert "feedback_id" in data
    assert "cluster_id" in data


@pytest.mark.asyncio
async def test_whatsapp_webhook(client: AsyncClient):
    """Verifies simulated WhatsApp bot message ingestion."""
    wa_payload = {
        "from_number": "+919876543210",
        "fhtc_id": "FHTC-UP-245123-0042",
        "message_text": "नल से बदबूदार और गंदा पानी आ रहा है",
        "lat": 28.9860,
        "lon": 77.7080
    }
    resp = await client.post("/api/v1/feedback/whatsapp", json=wa_payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "reply" in data
    assert "टिकट संख्या" in data["reply"]


@pytest.mark.asyncio
async def test_ivr_simulator_flow(client: AsyncClient):
    """Verifies IVR telephone call simulation with DTMF tone keypress."""
    ivr_payload = {
        "caller_phone": "9876543210",
        "fhtc_id": "FHTC-UP-245123-0042",
        "dtmf_digit": "1",  # 1 = no_water
        "lang": "hi"
    }
    resp = await client.post("/api/v1/feedback/ivr", json=ivr_payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "ivr_response" in data
    assert "feedback_id" in data


@pytest.mark.asyncio
async def test_spatio_temporal_clustering(client: AsyncClient):
    """Verifies that multiple complaints within 200m / same habitation are clustered."""
    # Submission 1
    p1 = {
        "feedback_id": "FB-CLUS-TEST-01",
        "fhtc_id": "FHTC-UP-245123-0042",
        "channel": "app",
        "category": "low_pressure",
        "lat": 28.9860,
        "lon": 77.7080,
        "lang": "hi",
        "ts": "2026-10-04T12:00:00Z"
    }
    r1 = await client.post("/api/v1/feedback", json=p1)
    assert r1.status_code == 201
    c1 = r1.json()["cluster_id"]

    # Submission 2 (nearby point, ~50m offset)
    p2 = {
        "feedback_id": "FB-CLUS-TEST-02",
        "fhtc_id": "FHTC-UP-245123-0042",
        "channel": "whatsapp",
        "category": "low_pressure",
        "lat": 28.9863,
        "lon": 77.7082,
        "lang": "hi",
        "ts": "2026-10-04T12:30:00Z"
    }
    r2 = await client.post("/api/v1/feedback", json=p2)
    assert r2.status_code == 201
    c2 = r2.json()["cluster_id"]

    # Deduplicated into the same parent cluster
    assert c1 == c2
