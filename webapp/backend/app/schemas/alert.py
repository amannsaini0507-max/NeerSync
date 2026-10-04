from typing import Optional, Literal
from pydantic import BaseModel, Field


class AlertScope(BaseModel):
    gp: str = Field(..., example="245123")
    branch: str = Field(..., min_length=1, max_length=100, example="Branch_South_Ward3")
    fhtc_id: Optional[str] = Field(None, pattern=r"^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$", example="FHTC-UP-245123-0042")


class AlertPayload(BaseModel):
    alert_id: str = Field(..., pattern=r"^ALT-[A-Za-z0-9_-]+$", example="ALT-20261004-001")
    type: Literal["no_supply", "low_pressure", "leakage", "quality", "node_offline", "chronic_nonfunctional"]
    severity: Literal["low", "medium", "high"]
    scope: AlertScope
    reason: str = Field(..., min_length=3, max_length=500, example="Tail-end pressure dropped below 70 kPa for 3 consecutive hours")
    created_ts: str = Field(..., example="2026-10-04T12:30:00Z")
    status: Literal["active", "acknowledged", "resolved", "pending_citizen_confirmation"] = Field("active", example="active")
    escalation_level: Optional[str] = Field("jal_mitra", example="jal_mitra")
    technician_photo_url: Optional[str] = None
    resolution_notes: Optional[str] = None
    citizen_confirmed: Optional[bool] = None


class AlertUpdateRequest(BaseModel):
    status: Literal["active", "acknowledged", "resolved", "pending_citizen_confirmation"]
    resolution_notes: Optional[str] = Field(None, max_length=500)
    technician_photo_url: Optional[str] = Field(None, max_length=500)
    citizen_confirmed: Optional[bool] = None
