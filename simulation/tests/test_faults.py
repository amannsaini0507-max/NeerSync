"""
Unit Tests for All 9 Fault Scenarios
Verifies fault parameter dynamics for each declared scenario.
"""

import pytest
from simulation.faults import load_scenarios, apply_fault


@pytest.fixture
def base_metrics():
    return {
        "pump": {"current_a": 14.5, "state": 1, "voltage_v": 415.0},
        "esr": {"level_cm": 280.0, "level_pct": 70.0},
        "flow": {"flow_lpm": 250.0, "totalizer_l": 50000.0},
        "pressure": {"pressure_kpa": 135.0},
        "quality": {"turbidity_ntu": 1.2, "chlorine_mgl": 0.45, "ph": 7.3, "tds_ppm": 240.0},
        "status_n004": {"status": "online", "battery_v": 3.95, "rssi_dbm": -72, "is_offline": False}
    }


def test_scenario_declarations():
    sc = load_scenarios()
    required = [
        "baseline", "pump_failure", "leak", "burst", "tail_end_low_pressure",
        "esr_empty", "contamination", "sensor_drift", "node_offline", "fake_noisy_complaints"
    ]
    for r in required:
        assert r in sc


def test_scenario_pump_failure(base_metrics):
    m = apply_fault("pump_failure", t_hour=16.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["pump"]["current_a"] == 0.0
    assert m["pump"]["state"] == 0


def test_scenario_leak(base_metrics):
    m = apply_fault("leak", t_hour=20.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["flow"]["flow_lpm"] > 250.0


def test_scenario_burst(base_metrics):
    m = apply_fault("burst", t_hour=30.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["flow"]["flow_lpm"] >= 400.0
    assert m["pressure"]["pressure_kpa"] <= 35.0


def test_scenario_tail_end_low_pressure(base_metrics):
    m = apply_fault("tail_end_low_pressure", t_hour=14.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["pressure"]["pressure_kpa"] < 70.0


def test_scenario_esr_empty(base_metrics):
    m = apply_fault("esr_empty", t_hour=22.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["esr"]["level_cm"] == 0.0
    assert m["flow"]["flow_lpm"] == 0.0


def test_scenario_contamination(base_metrics):
    m = apply_fault("contamination", t_hour=35.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["quality"]["turbidity_ntu"] > 5.0
    assert m["quality"]["chlorine_mgl"] < 0.10


def test_scenario_sensor_drift(base_metrics):
    m = apply_fault("sensor_drift", t_hour=15.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["pressure"]["pressure_kpa"] > 135.0


def test_scenario_node_offline(base_metrics):
    m = apply_fault("node_offline", t_hour=32.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["status_n004"]["status"] == "offline"
    assert m["status_n004"]["is_offline"] is True


def test_scenario_fake_complaints(base_metrics):
    m = apply_fault("fake_noisy_complaints", t_hour=16.0, base_metrics=base_metrics)
    assert m["fault_active"] is True
    assert m["has_fake_complaints"] is True
