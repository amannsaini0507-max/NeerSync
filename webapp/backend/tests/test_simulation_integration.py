"""
Unit and integration tests for Simulation & Digital Twin Bridge API router.
Verifies scenario injection, telemetry generation, and alert triggering.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_inject_pipe_burst_scenario(client: AsyncClient):
    response = await client.post(
        "/api/v1/simulation/scenario",
        json={"scenario": "pipe_burst", "lgd_gp_code": "245123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["scenario"] == "pipe_burst"
    assert data["injected_packets"] >= 4
    assert "collapse" in data["summary"].lower() or "burst" in data["summary"].lower()


@pytest.mark.asyncio
async def test_inject_contamination_scenario(client: AsyncClient):
    response = await client.post(
        "/api/v1/simulation/scenario",
        json={"scenario": "contamination", "lgd_gp_code": "245123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["scenario"] == "contamination"
    assert data["injected_packets"] >= 1
    assert "turbidity" in data["summary"].lower()


@pytest.mark.asyncio
async def test_reset_simulation_scenario(client: AsyncClient):
    response = await client.post("/api/v1/simulation/reset?lgd_gp_code=245123")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["scenario"] == "normal"
    assert data["injected_packets"] >= 5
