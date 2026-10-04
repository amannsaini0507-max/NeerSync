"""
JalSetu Fault Injection Module
Applies declarative fault scenarios to hydraulic results and sensor readings.
"""

from pathlib import Path
import yaml
import numpy as np


SCENARIOS_PATH = Path(__file__).resolve().parent / "scenarios.yaml"


def load_scenarios():
    """Loads all declarative fault scenarios from scenarios.yaml."""
    with open(SCENARIOS_PATH, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return {s["id"]: s for s in data["scenarios"]}


def apply_fault(scenario_id: str, t_hour: float, base_metrics: dict, fhtc_states: dict = None) -> dict:
    """
    Applies fault dynamics to the simulated sensor metrics at a given timestamp.
    
    Args:
        scenario_id: ID of the scenario ('baseline', 'pump_failure', 'burst', etc.)
        t_hour: Current simulation time in hours (0.0 to 48.0)
        base_metrics: Clean dictionary of metrics from hydraulic simulation:
            {
                'pump': {'current_a', 'voltage_v', 'state'},
                'esr': {'level_cm', 'level_pct'},
                'flow': {'flow_lpm', 'totalizer_l'},
                'pressure': {'pressure_kpa'},
                'quality': {'turbidity_ntu', 'chlorine_mgl', 'ph', 'tds_ppm'},
                'status_n004': {'online', 'battery_v', 'rssi_dbm'}
            }
        fhtc_states: Optional dictionary of household functionality {fhtc_id: bool}
    
    Returns:
        faulty_metrics: Updated metrics reflecting injected fault state
    """
    scenarios = load_scenarios()
    metrics = {k: v.copy() if isinstance(v, dict) else v for k, v in base_metrics.items()}
    
    if scenario_id not in scenarios or scenario_id == "baseline":
        return metrics

    sc = scenarios[scenario_id]
    t_start = sc["start_time_hours"]
    t_end = t_start + sc["duration_hours"]

    # Only apply if current time is within fault window
    is_active = (t_start <= t_hour < t_end)
    metrics["fault_active"] = is_active
    metrics["scenario_id"] = scenario_id

    if not is_active:
        return metrics

    p = sc["parameters"]

    if scenario_id == "pump_failure":
        metrics["pump"]["current_a"] = p["current_a"]
        metrics["pump"]["state"] = p["state"]
        # ESR fails to refill; steadily drops level
        hours_active = t_hour - t_start
        drain_cm = hours_active * 18.0
        metrics["esr"]["level_cm"] = max(10.0, metrics["esr"]["level_cm"] - drain_cm)
        metrics["esr"]["level_pct"] = (metrics["esr"]["level_cm"] / 400.0) * 100.0

    elif scenario_id == "leak":
        # Elevated background flow
        leak_lpm = p["leak_flow_lpm"]
        metrics["flow"]["flow_lpm"] += leak_lpm
        metrics["flow"]["totalizer_l"] += leak_lpm * 60.0
        # Mild pressure depression
        metrics["pressure"]["pressure_kpa"] = max(20.0, metrics["pressure"]["pressure_kpa"] - 18.0)

    elif scenario_id == "burst":
        # Massive burst flow surge and severe pressure drop
        burst_lpm = p["burst_flow_lpm"]
        metrics["flow"]["flow_lpm"] += burst_lpm
        metrics["flow"]["totalizer_l"] += burst_lpm * 60.0
        metrics["pressure"]["pressure_kpa"] = max(12.0, metrics["pressure"]["pressure_kpa"] - p["pressure_drop_kpa"])

    elif scenario_id == "tail_end_low_pressure":
        # Head loss throttles tail-end sensor below 70 kPa JJM benchmark
        metrics["pressure"]["pressure_kpa"] = p["target_pressure_kpa"]

    elif scenario_id == "esr_empty":
        # Reservoir drained dry
        metrics["esr"]["level_cm"] = 0.0
        metrics["esr"]["level_pct"] = 0.0
        metrics["flow"]["flow_lpm"] = 0.0
        metrics["pressure"]["pressure_kpa"] = 5.0  # static residual head

    elif scenario_id == "contamination":
        # Runoff ingress: high turbidity, free chlorine depleted
        metrics["quality"]["turbidity_ntu"] = p["turbidity_ntu"]
        metrics["quality"]["chlorine_mgl"] = p["chlorine_mgl"]
        metrics["quality"]["ph"] = p.get("ph", 6.2)

    elif scenario_id == "sensor_drift":
        # Artificial monotonic sensor drift
        drift_hrs = t_hour - t_start
        metrics["pressure"]["pressure_kpa"] += drift_hrs * p["drift_rate_kpa_per_hour"]

    elif scenario_id == "node_offline":
        # Battery exhaustion & LWT disconnect
        metrics["status_n004"]["status"] = "offline"
        metrics["status_n004"]["battery_v"] = p["battery_v"]
        metrics["status_n004"]["rssi_dbm"] = p["rssi_dbm"]
        metrics["status_n004"]["is_offline"] = True

    elif scenario_id == "fake_noisy_complaints":
        # Physical sensors remain normal; grievances handled in feedback generator
        metrics["has_fake_complaints"] = True

    return metrics
