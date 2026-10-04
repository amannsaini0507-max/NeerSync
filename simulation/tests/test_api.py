"""
Unit Tests for FastAPI Prediction Endpoints
"""

import pytest
from fastapi.testclient import TestClient
from simulation.api import app

client = TestClient(app)


def test_health_endpoint():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"


def test_predict_normal():
    payload = {
        "lgd_gp_code": "245123",
        "scheme_id": "SCH-UP-245123",
        "metrics": {
            "pump": {"current_a": 14.5, "state": 1},
            "esr": {"level_cm": 280.0},
            "flow": {"flow_lpm": 250.0},
            "pressure": {"pressure_kpa": 135.0},
            "quality": {"turbidity_ntu": 1.2, "chlorine_mgl": 0.45}
        }
    }
    res = client.post("/predict", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["functional_households_count"] == 60
    assert data["functionality_percentage"] == 100.0
    assert data["predicted_supply_duration_hours"] > 0


def test_predict_fault():
    payload = {
        "lgd_gp_code": "245123",
        "metrics": {
            "pump": {"current_a": 0.0, "state": 1},
            "esr": {"level_cm": 10.0},
            "flow": {"flow_lpm": 0.0},
            "pressure": {"pressure_kpa": 25.0},
            "quality": {"turbidity_ntu": 8.5, "chlorine_mgl": 0.03}
        }
    }
    res = client.post("/predict", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["is_anomaly"] is True
    assert len(data["alerts"]) > 0
    assert data["maintenance_priority"] is not None
