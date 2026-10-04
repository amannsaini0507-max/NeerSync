import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import JSONResponse
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.feedback import CitizenFeedback, FeedbackCluster
from app.models.master import FHTC
from app.schemas.feedback import (
    FeedbackPayload,
    FeedbackSubmitResponse,
    QRQuickFeedbackRequest,
    WhatsAppWebhookRequest,
    IVRSimulatorRequest
)
from app.services.feedback_service import feedback_service

router = APIRouter(prefix="/api/v1/feedback", tags=["Citizen Grievance & Feedback"])


def _to_feedback_payload(fb: CitizenFeedback) -> FeedbackPayload:
    ts_str = fb.ts.isoformat() if fb.ts else datetime.now(timezone.utc).isoformat()
    return FeedbackPayload(
        feedback_id=fb.feedback_id,
        fhtc_id=fb.fhtc_id,
        channel=fb.channel,
        category=fb.category,
        text=fb.text,
        photo_url=fb.photo_url,
        lat=fb.lat,
        lon=fb.lon,
        lang=fb.lang,
        ts=ts_str
    )


@router.post("", status_code=status.HTTP_201_CREATED, response_model=FeedbackSubmitResponse)
async def submit_feedback(
    payload: FeedbackPayload,
    db: AsyncSession = Depends(get_db)
):
    """
    Ingest Citizen Grievance.
    Submits a grievance report adhering strictly to /contracts/feedback.schema.json.
    Performs spatio-temporal cluster deduplication.
    """
    success, msg, fb_id, cluster_id = await feedback_service.submit_feedback(
        db=db,
        payload=payload.model_dump(exclude_none=True),
        submitted_by_role="citizen"
    )
    if not success:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"error": "VALIDATION_ERROR", "message": msg}
        )

    return FeedbackSubmitResponse(
        feedback_id=fb_id or payload.feedback_id,
        status="queued_for_verification",
        cluster_id=cluster_id
    )


@router.get("", response_model=List[FeedbackPayload])
async def list_feedback(
    fhtc_id: Optional[str] = Query(None),
    category: Optional[str] = Query(None, enum=["no_water", "low_pressure", "dirty_water", "leakage", "other"]),
    db: AsyncSession = Depends(get_db)
):
    """Query Citizen Grievances filtered by household connection or issue category."""
    conditions = []
    if fhtc_id:
        conditions.append(CitizenFeedback.fhtc_id == fhtc_id)
    if category:
        conditions.append(CitizenFeedback.category == category)

    q = select(CitizenFeedback)
    if conditions:
        q = q.where(and_(*conditions))
    q = q.order_by(CitizenFeedback.ts.desc())

    res = await db.execute(q)
    feedbacks = res.scalars().all()
    return [_to_feedback_payload(f) for f in feedbacks]


@router.post("/qr", status_code=status.HTTP_201_CREATED)
async def qr_quick_feedback(
    request: QRQuickFeedbackRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    One-tap QR landing feedback for /f/{fhtc_id}.
    'water came' vs 'didn't come'.
    """
    now = datetime.now(timezone.utc)
    now_str = now.isoformat()
    fb_id = f"FB-{now.strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:4]}"

    category = request.category or ("other" if request.water_came else "no_water")
    text = request.note or ("पानी आया (Water supplied successfully)" if request.water_came else "पानी नहीं आया (No water supply)")

    payload = {
        "feedback_id": fb_id,
        "fhtc_id": request.fhtc_id,
        "channel": "qr",
        "category": category,
        "text": text,
        "lat": request.lat,
        "lon": request.lon,
        "lang": request.lang,
        "ts": now_str
    }
    success, msg, _, cluster_id = await feedback_service.submit_feedback(db, payload)
    return {
        "status": "success",
        "feedback_id": fb_id,
        "cluster_id": cluster_id,
        "message": "Feedback recorded successfully"
    }


@router.post("/whatsapp", status_code=status.HTTP_200_OK)
async def whatsapp_bot_webhook(
    request: WhatsAppWebhookRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Mock WhatsApp Chatbot Webhook.
    Receives incoming WhatsApp message, parses category, and generates grievance.
    """
    now = datetime.now(timezone.utc)
    fb_id = f"FB-{now.strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:4]}"

    # Determine FHTC: if not provided, look up by phone or default to village tap
    fhtc_id = request.fhtc_id or "FHTC-UP-245123-0042"

    # Category heuristic from text
    msg = request.message_text.lower()
    if "गंदा" in msg or "dirty" in msg or "smell" in msg:
        category = "dirty_water"
    elif "कम" in msg or "pressure" in msg or "low" in msg:
        category = "low_pressure"
    elif "लीक" in msg or "leak" in msg or "burst" in msg:
        category = "leakage"
    else:
        category = "no_water"

    payload = {
        "feedback_id": fb_id,
        "fhtc_id": fhtc_id,
        "channel": "whatsapp",
        "category": category,
        "text": f"[{request.from_number}] {request.message_text}",
        "photo_url": request.media_url,
        "lat": request.lat,
        "lon": request.lon,
        "lang": "hi",
        "ts": now.isoformat()
    }
    await feedback_service.submit_feedback(db, payload)
    return {
        "reply": "नमस्ते! आपकी शिकायत NeerSync पर दर्ज कर ली गई है। टिकट संख्या: " + fb_id,
        "ticket_id": fb_id
    }


@router.post("/ivr", status_code=status.HTTP_200_OK)
async def ivr_simulator_endpoint(
    request: IVRSimulatorRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    IVR / Missed-call flow simulator.
    DTMF Key mapping: 1=no_water, 2=low_pressure, 3=dirty_water, 4=leakage, 5=other.
    """
    now = datetime.now(timezone.utc)
    fb_id = f"FB-{now.strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:4]}"

    dtmf_map = {
        "1": "no_water",
        "2": "low_pressure",
        "3": "dirty_water",
        "4": "leakage",
        "5": "other"
    }
    category = dtmf_map.get(request.dtmf_digit, "other")

    payload = {
        "feedback_id": fb_id,
        "fhtc_id": request.fhtc_id,
        "channel": "ivr",
        "category": category,
        "text": f"IVR call from {request.caller_phone}, selected option {request.dtmf_digit} ({category})",
        "lang": request.lang,
        "ts": now.isoformat()
    }
    await feedback_service.submit_feedback(db, payload)
    return {
        "ivr_response": "Thank you. Your grievance has been registered with ticket ID " + fb_id,
        "feedback_id": fb_id
    }
