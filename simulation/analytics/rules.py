"""
JalSetu Deterministic Rule-Based Anomaly & Safety Baseline
Detects acute threshold breaches and generates schema-compliant alert payloads.
"""

from typing import List, Dict, Optional
from datetime import datetime


def evaluate_rules(metrics: dict, current_dt_str: str, lgd_gp_code: str = "245123") -> List[Dict]:
    """
    Evaluates deterministic safety rules on a single snapshot of village telemetry.
    Returns list of alerts strictly conforming to contracts/alert.schema.json.
    """
    alerts = []
    alert_idx = 1

    # 1. Pump Failure Rule
    pump = metrics.get("pump", {})
    if pump.get("state") == 1 and pump.get("current_a", 0.0) < 1.0:
        alerts.append({
            "alert_id": f"ALT-{current_dt_str[:10].replace('-', '')}-PMP-{alert_idx:02d}",
            "type": "no_supply",
            "severity": "high",
            "scope": {
                "gp": str(lgd_gp_code),
                "branch": "Source_Tubewell_Main"
            },
            "reason": f"Pump motor electrical failure: Command state is ON but current draw is {pump.get('current_a', 0.0):.1f}A (<1.0A threshold). Refill halted.",
            "created_ts": current_dt_str,
            "status": "active"
        })
        alert_idx += 1

    # 2. ESR Tank Empty Rule
    esr = metrics.get("esr", {})
    if esr.get("level_cm", 100.0) < 15.0:
        alerts.append({
            "alert_id": f"ALT-{current_dt_str[:10].replace('-', '')}-ESR-{alert_idx:02d}",
            "type": "no_supply",
            "severity": "high",
            "scope": {
                "gp": str(lgd_gp_code),
                "branch": "All_Wards_ESR_Header"
            },
            "reason": f"Elevated Storage Reservoir depleted: Water level is {esr.get('level_cm', 0.0):.1f} cm (<15.0 cm cutoff). Entire village distribution starved.",
            "created_ts": current_dt_str,
            "status": "active"
        })
        alert_idx += 1

    # 3. Tail-End Chronic Low Pressure Rule (JJM 70 kPa benchmark)
    pressure = metrics.get("pressure", {})
    if pressure.get("pressure_kpa", 100.0) < 70.0:
        p_val = pressure.get("pressure_kpa", 0.0)
        sev = "high" if p_val < 45.0 else "medium"
        alerts.append({
            "alert_id": f"ALT-{current_dt_str[:10].replace('-', '')}-PRS-{alert_idx:02d}",
            "type": "low_pressure",
            "severity": sev,
            "scope": {
                "gp": str(lgd_gp_code),
                "branch": "Ward_1_Tail_End",
                "fhtc_id": "FHTC-UP-245123-0020"
            },
            "reason": f"Tail-end pressure deficit: Measured {p_val:.1f} kPa, failing the mandatory Jal Jeevan Mission 70.0 kPa terminal benchmark.",
            "created_ts": current_dt_str,
            "status": "active"
        })
        alert_idx += 1

    # 4. Water Quality Rule (Turbidity > 5 NTU or Chlorine < 0.2 mg/L)
    quality = metrics.get("quality", {})
    turbidity = quality.get("turbidity_ntu", 1.0)
    chlorine = quality.get("chlorine_mgl", 0.4)
    if turbidity > 5.0 or chlorine < 0.20:
        reasons = []
        if turbidity > 5.0:
            reasons.append(f"Turbidity spiked to {turbidity:.2f} NTU (>5.0 NTU safe drinking limit)")
        if chlorine < 0.20:
            reasons.append(f"Residual free chlorine depleted to {chlorine:.2f} mg/L (<0.20 mg/L minimum disinfection requirement)")

        alerts.append({
            "alert_id": f"ALT-{current_dt_str[:10].replace('-', '')}-QUAL-{alert_idx:02d}",
            "type": "quality",
            "severity": "high",
            "scope": {
                "gp": str(lgd_gp_code),
                "branch": "ESR_Discharge_Header"
            },
            "reason": "Water quality contamination detected: " + "; ".join(reasons) + ". Potential biological risk.",
            "created_ts": current_dt_str,
            "status": "active"
        })
        alert_idx += 1

    # 5. Node Offline Rule
    status_n4 = metrics.get("status_n004", {})
    if status_n4.get("status") == "offline" or status_n4.get("is_offline", False):
        alerts.append({
            "alert_id": f"ALT-{current_dt_str[:10].replace('-', '')}-OFFLINE-{alert_idx:02d}",
            "type": "node_offline",
            "severity": "low",
            "scope": {
                "gp": str(lgd_gp_code),
                "branch": "Ward_1_Tail_End"
            },
            "reason": f"IoT Node JS-UP-245123-N004 offline: Battery voltage dropped to {status_n4.get('battery_v', 0.0):.2f}V. Telemetry stream severed.",
            "created_ts": current_dt_str,
            "status": "active"
        })
        alert_idx += 1

    return alerts
