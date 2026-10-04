import pytest
from httpx import AsyncClient
from app.services.index_calculator import index_calculator


@pytest.mark.asyncio
async def test_fhtc_service_index_endpoint(client: AsyncClient):
    """Verifies that /api/v1/analytics/fhtc-index computes valid 0-100 score."""
    resp = await client.get("/api/v1/analytics/fhtc-index?lgd_gp_code=245123&window_days=7")
    assert resp.status_code == 200
    data = resp.json()

    assert data["lgd_gp_code"] == "245123"
    assert 0.0 <= data["fhtc_service_index"] <= 100.0
    assert 0.0 <= data["regularity_score"] <= 100.0
    assert 0.0 <= data["adequacy_score"] <= 100.0
    assert 0.0 <= data["quality_score"] <= 100.0
    assert 0.0 <= data["pressure_score"] <= 100.0
    assert 0.0 <= data["grievance_score"] <= 100.0

    # Verify weights sum to 1.0
    weights = data["weights_applied"]
    total_weights = sum(weights.values())
    assert abs(total_weights - 1.0) < 0.001

    # Verify categorization
    score = data["fhtc_service_index"]
    category = data["status_category"]
    if score >= 85.0:
        assert category == "EXCELLENT"
    elif score >= 70.0:
        assert category == "SATISFACTORY"
    elif score >= 50.0:
        assert category == "AT_RISK"
    else:
        assert category == "NON_FUNCTIONAL"
