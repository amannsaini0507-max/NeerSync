from typing import Optional, Literal
from pydantic import BaseModel, Field


class FeedbackPayload(BaseModel):
    feedback_id: str = Field(..., pattern=r"^FB-[A-Za-z0-9_-]+$", example="FB-20261004-0012")
    fhtc_id: str = Field(..., pattern=r"^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$", example="FHTC-UP-245123-0042")
    channel: Literal["app", "qr", "whatsapp", "ivr"]
    category: Literal["no_water", "low_pressure", "dirty_water", "leakage", "other"]
    text: Optional[str] = Field(None, max_length=1000, example="पानी नहीं आ रहा है दो दिन से")
    photo_url: Optional[str] = Field(None, example="https://storage.jalsetu.gov.in/evidence/fb-0012.jpg")
    lat: Optional[float] = Field(None, ge=-90.0, le=90.0, example=28.9845)
    lon: Optional[float] = Field(None, ge=-180.0, le=180.0, example=77.7064)
    lang: str = Field("hi", pattern=r"^[a-z]{2}(-[A-Z]{2})?$", example="hi")
    ts: str = Field(..., example="2026-10-04T12:45:00Z")


class FeedbackSubmitResponse(BaseModel):
    feedback_id: str
    status: str = Field("queued_for_verification", example="queued_for_verification")
    cluster_id: Optional[str] = None


class QRQuickFeedbackRequest(BaseModel):
    fhtc_id: str = Field(..., pattern=r"^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$")
    water_came: bool
    category: Optional[Literal["no_water", "low_pressure", "dirty_water", "leakage", "other"]] = None
    note: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    lang: str = "hi"


class WhatsAppWebhookRequest(BaseModel):
    from_number: str = Field(..., example="+919876543210")
    fhtc_id: Optional[str] = None
    message_text: str = Field(..., example="नल से गंदा पानी आ रहा है")
    media_url: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None


class IVRSimulatorRequest(BaseModel):
    caller_phone: str = Field(..., example="9876543210")
    fhtc_id: str = Field(..., example="FHTC-UP-245123-0042")
    dtmf_digit: Literal["1", "2", "3", "4", "5"] = Field(
        ...,
        description="1=no_water, 2=low_pressure, 3=dirty_water, 4=leakage, 5=other"
    )
    lang: str = "hi"
