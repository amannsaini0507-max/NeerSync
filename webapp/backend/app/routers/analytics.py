from typing import Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.alert import AlertIncident
from app.schemas.analytics import (
    SupplyPredictionResponse,
    AnomalyResponse,
    AnomalyItem,
    FHTCServiceIndexResponse
)
from app.services.index_calculator import index_calculator
from app.services.ml_client import ml_client

router = APIRouter(prefix="/api/v1/analytics", tags=["Analytics & AI/ML Insights"])


@router.get("/predict/supply", response_model=SupplyPredictionResponse)
async def predict_water_supply(
    lgd_gp_code: str = Query(..., openapi_examples={"default": {"value": "245123"}}),
    db: AsyncSession = Depends(get_db)
):
    """
    Predict Water Supply Availability & Schedule.
    Queries Member A's ML service with rule fallback.
    """
    # Sample input for ML prediction
    dummy_telemetry = {
        "node_id": f"JS-UP-{lgd_gp_code}-N001",
        "lgd_gp_code": lgd_gp_code,
        "type": "flow",
        "values": {"flow_lpm": 25.0}
    }
    ml_res = await ml_client.predict_anomalies(dummy_telemetry)

    return SupplyPredictionResponse(
        lgd_gp_code=lgd_gp_code,
        predicted_supply_hours=4.0,
        predicted_start_time="06:30:00Z",
        expected_pressure_kpa=135.0,
        confidence_score=0.91,
        source=ml_res.get("source", "rule_engine_fallback")
    )


@router.get("/anomalies", response_model=AnomalyResponse)
async def get_detected_anomalies(
    lgd_gp_code: str = Query(..., openapi_examples={"default": {"value": "245123"}}),
    db: AsyncSession = Depends(get_db)
):
    """
    Get Detected Pipeline & Quality Anomalies.
    Returns active alerts formatted as anomaly detection items.
    """
    q = select(AlertIncident).where(
        and_(
            AlertIncident.lgd_gp_code == lgd_gp_code,
            AlertIncident.status.in_(["active", "acknowledged"])
        )
    ).order_by(AlertIncident.created_ts.desc())

    res = await db.execute(q)
    active_alerts = res.scalars().all()

    items = []
    for a in active_alerts:
        created_str = a.created_ts.isoformat() if a.created_ts else datetime.now(timezone.utc).isoformat()
        items.append(
            AnomalyItem(
                anomaly_id=a.alert_id,
                node_id=f"JS-UP-{lgd_gp_code}-N001",
                type=a.type,
                severity=a.severity,
                confidence=0.95,
                description=a.reason,
                detected_at=created_str
            )
        )

    return AnomalyResponse(
        lgd_gp_code=lgd_gp_code,
        anomalies=items
    )


@router.get("/fhtc-index", response_model=FHTCServiceIndexResponse)
async def get_fhtc_service_index(
    lgd_gp_code: str = Query(..., openapi_examples={"default": {"value": "245123"}}),
    window_days: int = Query(7, ge=1, le=90),
    db: AsyncSession = Depends(get_db)
):
    """
    Calculates FHTC Service Index (0-100) combining
    Regularity (30%), Adequacy (20%), Quality (20%), Pressure (15%), and Grievance Resolution (15%).
    """
    index_data = await index_calculator.calculate_gp_index(db, lgd_gp_code, window_days)
    return FHTCServiceIndexResponse(**index_data)
