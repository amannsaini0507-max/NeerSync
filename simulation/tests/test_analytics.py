"""
Unit Tests for Analytics Modules
Tests rules baseline, Isolation Forest, leak detection, Bayesian inference, and priority score.
"""

import pytest
from simulation.network import build_village_network
from simulation.analytics import (
    evaluate_rules,
    AnomalyDetector,
    LeakDetector,
    BayesianHouseholdInference,
    MaintenancePriorityCalculator
)


def test_rules_generation_and_alert_format():
    metrics = {
        "pump": {"current_a": 0.0, "state": 1},
        "esr": {"level_cm": 5.0},
        "flow": {"flow_lpm": 0.0},
        "pressure": {"pressure_kpa": 40.0},
        "quality": {"turbidity_ntu": 8.5, "chlorine_mgl": 0.04}
    }
    alerts = evaluate_rules(metrics, "2026-10-04T12:00:00Z")
    assert len(alerts) >= 3
    for a in alerts:
        assert "alert_id" in a
        assert a["type"] in ["no_supply", "low_pressure", "quality", "leakage", "node_offline"]
        assert len(a["reason"]) > 10  # Human readable reason


def test_isolation_forest_scoring():
    detector = AnomalyDetector()
    normal_m = {
        "pressure": {"pressure_kpa": 135.0},
        "flow": {"flow_lpm": 250.0},
        "pump": {"current_a": 14.5},
        "esr": {"level_cm": 280.0}
    }
    abnormal_m = {
        "pressure": {"pressure_kpa": 15.0},
        "flow": {"flow_lpm": 600.0},
        "pump": {"current_a": 85.0},
        "esr": {"level_cm": 10.0}
    }
    res_norm = detector.predict(normal_m)
    res_abnorm = detector.predict(abnormal_m)
    assert res_abnorm["anomaly_score"] > res_norm["anomaly_score"]


def test_leak_detector_night_flow():
    detector = LeakDetector(normal_mnf_threshold_lpm=8.0)
    normal_night = [{"ts": "2026-10-04T03:00:00Z", "values": {"flow_lpm": 3.5}}]
    leaking_night = [{"ts": "2026-10-04T03:00:00Z", "values": {"flow_lpm": 38.0}}]
    assert detector.evaluate_night_flow(normal_night)["leak_detected"] is False
    assert detector.evaluate_night_flow(leaking_night)["leak_detected"] is True


def test_bayesian_household_inference_empty_esr():
    _, fhtc_map = build_village_network(seed=42)
    bayes = BayesianHouseholdInference(fhtc_map)
    metrics_empty = {"esr": {"level_cm": 5.0}, "pressure": {"pressure_kpa": 0.0}}
    res = bayes.infer_household_functionality(metrics_empty)
    assert res["non_functional_count"] == 60
    assert res["functional_count"] == 0


def test_bayesian_fake_complaints_rejection():
    _, fhtc_map = build_village_network(seed=42)
    bayes = BayesianHouseholdInference(fhtc_map)
    # Healthy pressure at 145 kPa, normal ESR
    metrics_healthy = {
        "esr": {"level_cm": 300.0},
        "pressure": {"pressure_kpa": 145.0},
        "flow": {"flow_lpm": 250.0}
    }
    fake_fb = [{
        "feedback_id": "FB-001",
        "fhtc_id": "FHTC-UP-245123-0005",
        "category": "no_water",
        "ts": "2026-10-04T12:00:00Z"
    }]
    res = bayes.infer_household_functionality(metrics_healthy, fake_fb)
    # Spurious complaint flagged as fake
    assert len(res["fake_complaints_detected"]) == 1


def test_priority_score_calculation():
    calc = MaintenancePriorityCalculator()
    # Risk 0.9, 60 HH, days 2.0, Source
    res = calc.compute_priority_score("Pump", 0.9, 60, 2.0, "Source")
    assert res["priority_score"] > 50.0
    assert res["sla_tier"] == "CRITICAL_P1"
