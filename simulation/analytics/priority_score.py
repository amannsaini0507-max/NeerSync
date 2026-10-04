"""
NeerSync Maintenance Priority Scoring Model
Computes priority score = failure_risk x households_affected x vulnerability x days_unresolved.
"""

from typing import Dict, List


class MaintenancePriorityCalculator:
    def __init__(self):
        # Base vulnerability multiplier by ward/location
        self.vulnerability_weights = {
            "Ward_1": 1.4,  # Tail-end vulnerable community
            "Ward_2": 1.0,  # Central ward
            "Ward_3": 1.6,  # Low-income / SC-ST majority hamlet
            "Source": 2.5,  # Source pump failure affects 100% of village
        }

    def compute_priority_score(
        self,
        component_name: str,
        failure_risk: float,  # 0.0 to 1.0 probability of severe failure
        households_affected: int,
        days_unresolved: float,
        location_tag: str = "Ward_1"
    ) -> Dict:
        """
        Calculates priority score and recommends operational SLA.
        Score = failure_risk * households_affected * vulnerability * days_unresolved
        """
        vuln = self.vulnerability_weights.get(location_tag, 1.2)
        days = max(0.5, float(days_unresolved))
        risk = min(1.0, max(0.05, float(failure_risk)))
        hh = max(1, int(households_affected))

        raw_score = risk * hh * vuln * days
        score = round(raw_score, 2)

        # Categorize operational SLA
        if score > 80.0:
            sla_tier = "CRITICAL_P1"
            sla_hours = 6
            action = "Dispatch emergency pump technician / repair gang immediately."
        elif score > 35.0:
            sla_tier = "URGENT_P2"
            sla_hours = 24
            action = "Schedule repair on priority before next scheduled supply cycle."
        elif score > 15.0:
            sla_tier = "MODERATE_P3"
            sla_hours = 48
            action = "Include in routine weekly maintenance schedule."
        else:
            sla_tier = "LOW_P4"
            sla_hours = 120
            action = "Monitor telemetry; defer to regular preventive overhaul."

        return {
            "component_name": component_name,
            "priority_score": score,
            "failure_risk": round(risk, 2),
            "households_affected": hh,
            "vulnerability_multiplier": round(vuln, 2),
            "days_unresolved": round(days, 1),
            "sla_tier": sla_tier,
            "sla_hours": sla_hours,
            "recommended_action": action
        }
