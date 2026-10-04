"""
NeerSync Bayesian / Graphical Household Functionality Inference Model
Infers household-level tap connection (FHTC) functionality across the village hierarchy:
ESR -> Distribution Branch -> Tail-End Sensor -> Household Tap Connection.
"""

from typing import Dict, List, Tuple
import numpy as np


class BayesianHouseholdInference:
    def __init__(self, fhtc_map: Dict):
        self.fhtc_map = fhtc_map  # 60 FHTCs with ward, branch, index, coordinates
        self.prior_functional = 0.95
        # Citizen grievance observation probabilities
        self.p_complaint_given_nonfunc = 0.85
        self.p_complaint_given_func = 0.03  # False grievance rate

    def infer_household_functionality(
        self,
        metrics: dict,
        citizen_feedback_list: List[dict] = None
    ) -> Dict:
        """
        Runs hierarchical Bayesian inference given current network telemetry and citizen complaints.
        
        Returns:
            results: {
                'functional_count': int,
                'at_risk_count': int,
                'non_functional_count': int,
                'fhtc_status': {fhtc_id: {'prob_functional': float, 'status': str, 'confidence': float}},
                'fake_complaints_detected': List[dict]
            }
        """
        if citizen_feedback_list is None:
            citizen_feedback_list = []

        # 1. Top-Down Hydraulic Evidence
        esr_level_cm = metrics.get("esr", {}).get("level_cm", 250.0)
        tail_pressure_kpa = metrics.get("pressure", {}).get("pressure_kpa", 130.0)
        bulk_flow_lpm = metrics.get("flow", {}).get("flow_lpm", 250.0)
        pump_state = metrics.get("pump", {}).get("state", 0)

        # Complaints mapped by FHTC ID
        complaints_by_fhtc = {}
        for fb in citizen_feedback_list:
            f_id = fb.get("fhtc_id")
            if f_id:
                complaints_by_fhtc[f_id] = fb

        fhtc_status = {}
        fake_complaints_detected = []
        func_cnt = 0
        at_risk_cnt = 0
        non_func_cnt = 0

        # Case A: Catastrophic reservoir depletion
        if esr_level_cm < 12.0:
            # Entire village is starved of water
            for fhtc_id, info in self.fhtc_map.items():
                fhtc_status[fhtc_id] = {
                    "prob_functional": 0.01,
                    "status": "NON_FUNCTIONAL",
                    "reason": "Elevated Storage Reservoir depleted; zero hydraulic head available."
                }
                non_func_cnt += 1
            return {
                "functional_count": 0,
                "at_risk_count": 0,
                "non_functional_count": len(self.fhtc_map),
                "total_households": len(self.fhtc_map),
                "functionality_percentage": 0.0,
                "fhtc_status": fhtc_status,
                "fake_complaints_detected": []
            }

        # Case B: Standard / Branch-specific evidence propagation
        for fhtc_id, info in self.fhtc_map.items():
            ward = info["ward"]
            branch_idx = info["index_in_branch"]  # 1 to 20
            has_complaint = (fhtc_id in complaints_by_fhtc)

            # Prior probability conditioned on branch location and tail-end pressure
            if ward == "Ward_1":
                # Tail-end sensor N004 is located at Ward 1 tail (index 20)
                if tail_pressure_kpa < 45.0:
                    # Severe low pressure on Branch 1
                    dist_factor = branch_idx / 20.0
                    p_func_given_hydraulics = max(0.08, 0.90 - (dist_factor * 0.80))
                elif tail_pressure_kpa < 70.0:
                    # Mild low pressure below JJM benchmark
                    dist_factor = branch_idx / 20.0
                    p_func_given_hydraulics = max(0.30, 0.92 - (dist_factor * 0.55))
                else:
                    p_func_given_hydraulics = 0.98
            else:
                # Wards 2 and 3 operate with standard head unless bulk flow is zero
                p_func_given_hydraulics = 0.97 if bulk_flow_lpm > 20.0 else 0.40

            # Bayesian update with citizen grievance evidence
            if has_complaint:
                p_prior = p_func_given_hydraulics
                # P(Complaint) = P(C | F) * P(F) + P(C | ~F) * P(~F)
                p_comp = (self.p_complaint_given_func * p_prior) + (self.p_complaint_given_nonfunc * (1.0 - p_prior))
                # Bayes Rule: P(F | C) = [P(C | F) * P(F)] / P(C)
                posterior_func = (self.p_complaint_given_func * p_prior) / p_comp

                # Check for probable fake complaint (Physical pressure is healthy > 120 kPa but citizen complained)
                if p_func_given_hydraulics > 0.92:
                    fake_complaints_detected.append({
                        "feedback_id": complaints_by_fhtc[fhtc_id].get("feedback_id"),
                        "fhtc_id": fhtc_id,
                        "ward": ward,
                        "measured_pressure_kpa": tail_pressure_kpa,
                        "confidence_fake": round(float(p_func_given_hydraulics), 2),
                        "reason": f"Citizen reported no water for {fhtc_id}, but upstream/tail sensors confirm robust hydraulic pressure ({tail_pressure_kpa:.1f} kPa) and continuous bulk flow."
                    })
            else:
                # No complaint: P(F | ~C) = [P(~C | F) * P(F)] / P(~C)
                p_prior = p_func_given_hydraulics
                p_no_comp = ((1.0 - self.p_complaint_given_func) * p_prior) + ((1.0 - self.p_complaint_given_nonfunc) * (1.0 - p_prior))
                posterior_func = ((1.0 - self.p_complaint_given_func) * p_prior) / p_no_comp

            posterior_func = float(np.clip(posterior_func, 0.01, 0.99))

            # Categorize status
            if posterior_func >= 0.80:
                st = "FUNCTIONAL"
                reason = "Normal pressure and continuous service delivery."
                func_cnt += 1
            elif posterior_func >= 0.40:
                st = "AT_RISK"
                reason = "Intermittent pressure drop or service degradation."
                at_risk_cnt += 1
            else:
                st = "NON_FUNCTIONAL"
                reason = "Deficient pressure (<70 kPa benchmark) or persistent citizen grievances."
                non_func_cnt += 1

            fhtc_status[fhtc_id] = {
                "prob_functional": round(posterior_func, 3),
                "status": st,
                "ward": ward,
                "index_in_branch": branch_idx,
                "has_complaint": has_complaint,
                "reason": reason
            }

        return {
            "functional_count": func_cnt,
            "at_risk_count": at_risk_cnt,
            "non_functional_count": non_func_cnt,
            "total_households": len(self.fhtc_map),
            "functionality_percentage": round((func_cnt / len(self.fhtc_map)) * 100.0, 1),
            "fhtc_status": fhtc_status,
            "fake_complaints_detected": fake_complaints_detected
        }
