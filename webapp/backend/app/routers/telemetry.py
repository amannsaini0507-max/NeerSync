from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.telemetry import TelemetryPayload, StatusPayload, IngestResponse, ErrorResponse
from app.services.ingestion import ingestion_service

router = APIRouter(prefix="/api/v1", tags=["Telemetry & Status Ingestion"])


@router.post(
    "/telemetry/ingest",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=IngestResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Bad Request / Malformed JSON"},
        422: {"model": ErrorResponse, "description": "Validation Error - Schema non-conformance"}
    }
)
async def ingest_telemetry_endpoint(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """
    Ingest Node Telemetry (HTTP Fallback).
    Ingests sensor packet adhering strictly to /contracts/telemetry.schema.json.
    Ensures idempotency on (node_id, seq).
    """
    raw_bytes = await request.body()
    try:
        data = await request.json()
    except Exception as exc:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": "BAD_REQUEST", "message": f"Malformed JSON: {str(exc)}"}
        )

    # Validate and ingest
    success, msg, _ = await ingestion_service.ingest_telemetry(db, data, raw_bytes=raw_bytes)
    if not success:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"error": "VALIDATION_ERROR", "message": msg}
        )

    return IngestResponse(
        status="accepted",
        received_ts=datetime.now(timezone.utc).isoformat()
    )


@router.post(
    "/status/ingest",
    status_code=status.HTTP_200_OK,
    response_model=IngestResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Bad Request or Validation Error"}
    }
)
async def ingest_status_endpoint(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """
    Ingest Node Heartbeat / Status.
    Ingests node availability, diagnostics, and LWT state per status.schema.json.
    """
    raw_bytes = await request.body()
    try:
        data = await request.json()
    except Exception as exc:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": "BAD_REQUEST", "message": f"Malformed JSON: {str(exc)}"}
        )

    success, msg, _ = await ingestion_service.ingest_status(db, data, raw_bytes=raw_bytes)
    if not success:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": "BAD_REQUEST", "message": msg}
        )

    return IngestResponse(
        status="recorded",
        received_ts=datetime.now(timezone.utc).isoformat()
    )
