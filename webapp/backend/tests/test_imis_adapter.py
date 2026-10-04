import pytest
from httpx import AsyncClient
from app.adapters.imis import imis_adapter


@pytest.mark.asyncio
async def test_imis_push_mock_sync(client: AsyncClient):
    """Verifies that aggregated data is pushed to National JJM IMIS mock adapter."""
    payload = {
        "reporting_date": "2026-10-04",
        "lgd_gp_code": "245123",
        "functional_fhtc_count": 48,
        "total_supply_liters": 82000.0
    }
    resp = await client.post("/api/v1/sync/imis", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "sync_status" in data
    assert data["adapter_mode"] == "UNVERIFIED_MOCK"


@pytest.mark.asyncio
async def test_sujal_gaon_push_sync(client: AsyncClient):
    """Verifies Sujal Gaon village certification sync adapter."""
    payload = {
        "lgd_gp_code": "245123",
        "certified_status": "CERTIFIED",
        "evaluation_ts": "2026-10-04T12:00:00Z"
    }
    resp = await client.post("/api/v1/sync/sujal-gaon", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["sync_status"] == "MOCK_VILLAGE_SYNCED"
    assert data["adapter_mode"] == "UNVERIFIED_MOCK"


@pytest.mark.asyncio
async def test_imis_csv_fallback(db_session):
    """Verifies that an unreachable endpoint triggers local CSV fallback."""
    # Temporarily set unreachable URL
    original_url = imis_adapter.imis_url
    imis_adapter.imis_url = "http://127.0.0.1:9999/unreachable"
    imis_adapter.max_retries = 1

    try:
        success, status_msg, res_data = await imis_adapter.push_imis_daily_aggregate(
            db=db_session,
            reporting_date="2026-10-04",
            lgd_gp_code="245123",
            functional_fhtc_count=45,
            total_supply_liters=75000.0
        )
        assert status_msg == "FAILED_CSV_FALLBACK"
        assert "fallback_path" in res_data
    finally:
        imis_adapter.imis_url = original_url


@pytest.mark.asyncio
async def test_sync_audit_logs(client: AsyncClient):
    """Verifies querying IMIS sync audit logs."""
    resp = await client.get("/api/v1/sync/audit-logs?lgd_gp_code=245123")
    assert resp.status_code == 200
    logs = resp.json()
    assert isinstance(logs, list)
    assert len(logs) > 0
    assert logs[0]["adapter_mode"] == "UNVERIFIED_MOCK"
