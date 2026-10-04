from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class SupplyPredictionResponse(BaseModel):
    lgd_gp_code: str
    predicted_supply_hours: float = Field(..., example=3.5)
    predicted_start_time: str = Field(..., example="06:00:00Z")
    expected_pressure_kpa: float = Field(..., example=120.0)
    confidence_score: float = Field(..., example=0.92)
    source: str = Field("rule_engine_fallback", example="ml_predict_model")


class AnomalyItem(BaseModel):
    anomaly_id: str
    node_id: Optional[str] = None
    type: str  # burst_leak, illegal_bypass, dry_run, quality_spike
    severity: str
    confidence: float
    description: str
    detected_at: str


class AnomalyResponse(BaseModel):
    lgd_gp_code: str
    anomalies: List[AnomalyItem] = []


class FHTCServiceIndexResponse(BaseModel):
    lgd_gp_code: str
    fhtc_service_index: float = Field(..., ge=0.0, le=100.0, example=84.5)
    regularity_score: float = Field(..., ge=0.0, le=100.0)
    adequacy_score: float = Field(..., ge=0.0, le=100.0)
    quality_score: float = Field(..., ge=0.0, le=100.0)
    pressure_score: float = Field(..., ge=0.0, le=100.0)
    grievance_score: float = Field(..., ge=0.0, le=100.0)
    weights_applied: Dict[str, float]
    status_category: str = Field(..., example="SATISFACTORY")  # EXCELLENT, SATISFACTORY, AT_RISK, NON_FUNCTIONAL
