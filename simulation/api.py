"""
NeerSync AI/ML Model Serving API (FastAPI)
Exposes inference endpoints so Webapp Backend (Member B) can call the AI/ML models.
Follows the /predict specification in contracts/openapi.yaml.

Usage:
    uvicorn simulation.api:app --host 0.0.0.0 --port 8000
"""

import sys
from pathlib import Path
from datetime import datetime, timezone
from typing import Dict, List, Optional, Any
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from simulation.network import build_village_network, run_simulation, GP_METADATA
from simulation.analytics import (
    evaluate_rules,
    AnomalyDetector,
    LeakDetector,
    BayesianHouseholdInference,
    MaintenancePriorityCalculator
)

app = FastAPI(
    title="NeerSync AI/ML Simulation & Prediction Service",
    description="Microservice exposing household functionality inference, anomaly detection, and maintenance priority scoring.",
    version="1.0.0"
)

# Initialize models
wn, fhtc_map = build_village_network(seed=42)
detector = AnomalyDetector()
bayes = BayesianHouseholdInference(fhtc_map)
leak_detector = LeakDetector()
p_calc = MaintenancePriorityCalculator()

# Pre-train anomaly detector
synthetic_normal = []
for _ in range(150):
    synthetic_normal.append({
        "pressure": {"pressure_kpa": float(135.0)},
        "flow": {"flow_lpm": float(250.0)},
        "pump": {"current_a": 14.5},
        "esr": {"level_cm": float(280.0)}
    })
detector.fit(synthetic_normal)


class PredictRequest(BaseModel):
    lgd_gp_code: str = Field(default="245123", description="Local Government Directory Gram Panchayat code")
    scheme_id: Optional[str] = Field(default="SCH-UP-245123", description="IMIS Water Supply Scheme identifier")
    metrics: Dict[str, Any] = Field(
        default={
            "pump": {"current_a": 14.5, "state": 1},
            "esr": {"level_cm": 280.0},
            "flow": {"flow_lpm": 250.0},
            "pressure": {"pressure_kpa": 135.0},
            "quality": {"turbidity_ntu": 1.2, "chlorine_mgl": 0.45}
        },
        description="Current telemetry metrics dictionary"
    )
    citizen_feedback: Optional[List[Dict[str, Any]]] = Field(
        default=[],
        description="Recent citizen feedback submissions"
    )


class PredictResponse(BaseModel):
    prediction_timestamp: str
    lgd_gp_code: str
    scheme_id: str
    functional_households_count: int
    total_households_count: int
    functionality_percentage: float
    predicted_supply_duration_hours: float
    is_anomaly: bool
    anomaly_score: float
    alerts: List[Dict[str, Any]]
    maintenance_priority: Optional[Dict[str, Any]]
    fhtc_sample_status: Dict[str, Any]


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "NeerSync_Simulation_Inference_v1.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


@app.post("/predict", response_model=PredictResponse)
@app.post("/api/v1/analytics/predict/supply", response_model=PredictResponse)
def predict_functionality(req: PredictRequest):
    """
    Main prediction endpoint called by backend.
    Returns household-level functionality inference, anomaly flags, and maintenance priority.
    """
    ts_now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    # 1. Deterministic rules
    alerts = evaluate_rules(req.metrics, ts_now, lgd_gp_code=req.lgd_gp_code)

    # 2. Multivariate Anomaly Detection
    ml_result = detector.predict(req.metrics)

    # 3. Bayesian Household Functionality Inference
    bayes_res = bayes.infer_household_functionality(req.metrics, req.citizen_feedback)

    # 4. Supply Duration Prediction (Hours of supply remaining based on ESR level & flow)
    esr_cm = req.metrics.get("esr", {}).get("level_cm", 250.0)
    flow_lpm = max(50.0, req.metrics.get("flow", {}).get("flow_lpm", 250.0))
    # Approximate volume: 50,000 L at 400 cm level -> 125 L per cm
    remaining_liters = esr_cm * 125.0
    predicted_hours = round(remaining_liters / (flow_lpm * 60.0), 1)

    # 5. Maintenance Priority
    p_info = None
    if alerts:
        sev = alerts[0]["severity"]
        risk = 0.95 if sev == "high" else (0.60 if sev == "medium" else 0.30)
        hh_aff = bayes_res["non_functional_count"] if bayes_res["non_functional_count"] > 0 else 20
        p_info = p_calc.compute_priority_score(
            alerts[0]["scope"]["branch"],
            failure_risk=risk,
            households_affected=hh_aff,
            days_unresolved=1.0,
            location_tag="Ward_1"
        )

    # Subsample 5 representative FHTCs for compact response
    sample_fhtcs = {}
    for fid in ["FHTC-UP-245123-0001", "FHTC-UP-245123-0010", "FHTC-UP-245123-0020", "FHTC-UP-245123-0040", "FHTC-UP-245123-0060"]:
        if fid in bayes_res["fhtc_status"]:
            sample_fhtcs[fid] = bayes_res["fhtc_status"][fid]

    return PredictResponse(
        prediction_timestamp=ts_now,
        lgd_gp_code=req.lgd_gp_code,
        scheme_id=req.scheme_id or "SCH-UP-245123",
        functional_households_count=bayes_res["functional_count"],
        total_households_count=bayes_res["total_households"],
        functionality_percentage=bayes_res["functionality_percentage"],
        predicted_supply_duration_hours=predicted_hours,
        is_anomaly=ml_result["is_anomaly"] or (len(alerts) > 0),
        anomaly_score=ml_result["anomaly_score"],
        alerts=alerts,
        maintenance_priority=p_info,
        fhtc_sample_status=sample_fhtcs
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
