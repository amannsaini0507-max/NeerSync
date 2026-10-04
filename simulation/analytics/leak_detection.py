"""
JalSetu Physical Leak & Burst Detection Engine
Combines Night-Minimum Flow (MNF) analysis and hydraulic mass balance.
"""

from typing import Dict, List, Optional
import numpy as np


class LeakDetector:
    def __init__(self, normal_mnf_threshold_lpm: float = 8.0, burst_flow_surge_lpm: float = 120.0):
        self.normal_mnf_threshold_lpm = normal_mnf_threshold_lpm
        self.burst_flow_surge_lpm = burst_flow_surge_lpm

    def evaluate_night_flow(self, flow_records: List[Dict]) -> Dict:
        """
        Analyzes Night Minimum Flow (MNF) during 02:00 - 04:00 AM window.
        Legitimate demand during these hours should be minimal (< 8 LPM).
        """
        night_flows = []
        for r in flow_records:
            # Check timestamp hour
            ts_str = r.get("ts", "")
            if len(ts_str) >= 13:
                hour = int(ts_str[11:13])
                if 2 <= hour <= 4:
                    val = r.get("values", {}).get("flow_lpm", 0.0)
                    night_flows.append(val)

        if not night_flows:
            return {"leak_detected": False, "mnf_lpm": 0.0, "reason": "No night window observations available"}

        min_night_flow = float(np.min(night_flows))
        is_leak = min_night_flow > self.normal_mnf_threshold_lpm

        result = {
            "leak_detected": is_leak,
            "mnf_lpm": round(min_night_flow, 1),
            "threshold_lpm": self.normal_mnf_threshold_lpm,
            "severity": "medium" if is_leak else "none",
            "estimated_daily_loss_liters": round(min_night_flow * 60 * 24, 0) if is_leak else 0.0
        }
        if is_leak:
            result["reason"] = f"Night Minimum Flow exceeded: Baseline 02:00-04:00 flow remained at {min_night_flow:.1f} LPM (safe limit: {self.normal_mnf_threshold_lpm:.1f} LPM). Ongoing background pipe leakage indicated."
        return result

    def evaluate_mass_balance(
        self,
        pumped_volume_m3: float,
        distributed_volume_m3: float,
        expected_demand_m3: float
    ) -> Dict:
        """
        Compares upstream pumped volume vs bulk metered volume vs consumer baseline.
        Loss = Max(0, pumped_volume - distributed_volume)
        """
        discrepancy_m3 = max(0.0, pumped_volume_m3 - distributed_volume_m3)
        loss_percentage = (discrepancy_m3 / pumped_volume_m3 * 100.0) if pumped_volume_m3 > 0 else 0.0

        is_significant_loss = loss_percentage > 15.0  # More than 15% non-revenue water

        return {
            "mass_balance_loss_m3": round(discrepancy_m3, 2),
            "loss_percentage": round(loss_percentage, 1),
            "significant_loss": is_significant_loss,
            "reason": f"Physical water loss of {loss_percentage:.1f}% ({discrepancy_m3:.1f} m3) detected between tube-well pump and consumer distribution header."
        }

    def detect_burst_rupture(self, current_flow_lpm: float, baseline_flow_lpm: float, current_pressure_kpa: float) -> Optional[Dict]:
        """
        Detects catastrophic pipe rupture characterized by sudden flow surge and pressure drop.
        """
        flow_surge = current_flow_lpm - baseline_flow_lpm
        if flow_surge >= self.burst_flow_surge_lpm and current_pressure_kpa < 40.0:
            return {
                "burst_detected": True,
                "flow_surge_lpm": round(flow_surge, 1),
                "pressure_kpa": round(current_pressure_kpa, 1),
                "severity": "high",
                "reason": f"Catastrophic pipe burst: Instantaneous flow surged by +{flow_surge:.1f} LPM while network pressure collapsed to {current_pressure_kpa:.1f} kPa."
            }
        return None
