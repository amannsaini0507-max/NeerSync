from fastapi import APIRouter, Request, status
from fastapi.responses import JSONResponse

mock_router = APIRouter(prefix="/api/v1/mock", tags=["Mock Government & ML Gateways"])


@mock_router.post("/imis")
async def mock_national_imis_receiver(request: Request):
    """
    [UNVERIFIED / CONFIGURABLE]
    Mock receiver endpoint simulating the National JJM IMIS portal.
    """
    data = await request.json()
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "sync_status": "MOCK_SYNC_QUEUED",
            "adapter_mode": "UNVERIFIED_MOCK",
            "batch_id": data.get("batch_id", "MOCK-BATCH-001"),
            "acknowledged_at": data.get("dispatch_ts"),
            "message": "National IMIS accepted daily functional FHTC packet"
        }
    )


@mock_router.post("/sujal-gaon")
async def mock_sujal_gaon_receiver(request: Request):
    """
    [UNVERIFIED / CONFIGURABLE]
    Mock receiver endpoint simulating Sujal Gaon certification gateway.
    """
    data = await request.json()
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "sync_status": "MOCK_VILLAGE_SYNCED",
            "adapter_mode": "UNVERIFIED_MOCK",
            "lgd_gp_code": data.get("lgd_gp_code"),
            "certified_status": data.get("certified_status")
        }
    )


@mock_router.post("/predict")
async def mock_member_a_ml_service(request: Request):
    """
    Simulates Member A's ML prediction service for supply anomalies.
    """
    data = await request.json()
    t_type = data.get("type")
    values = data.get("values", {})
    anomalies = []

    if t_type == "pressure" and values.get("pressure_kpa", 100.0) < 70.0:
        anomalies.append({
            "type": "low_pressure",
            "severity": "high",
            "reason": f"ML detected sustained pressure drop: {values.get('pressure_kpa')} kPa"
        })
    elif t_type == "flow" and values.get("flow_lpm", 10.0) <= 0.0:
        anomalies.append({
            "type": "no_supply",
            "severity": "high",
            "reason": "ML detected unexpected distribution supply cessation"
        })

    return {
        "anomaly_detected": len(anomalies) > 0,
        "confidence": 0.94,
        "anomalies": anomalies,
        "model_version": "v1.0-rf"
    }
