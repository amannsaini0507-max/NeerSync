from typing import Literal, Optional
from pydantic import BaseModel, Field


class IMISPushRequest(BaseModel):
    reporting_date: str = Field(..., json_schema_extra={"example": "2026-10-04"})
    lgd_gp_code: str = Field(..., json_schema_extra={"example": "245123"})
    functional_fhtc_count: int = Field(..., ge=0, json_schema_extra={"example": 420})
    total_supply_liters: float = Field(..., ge=0.0, json_schema_extra={"example": 85000.0})


class IMISPushResponse(BaseModel):
    sync_status: str = Field("MOCK_SYNC_QUEUED", json_schema_extra={"example": "MOCK_SYNC_QUEUED"})
    adapter_mode: str = Field("UNVERIFIED_MOCK", json_schema_extra={"example": "UNVERIFIED_MOCK"})
    batch_id: Optional[str] = None


class SujalGaonPushRequest(BaseModel):
    lgd_gp_code: str = Field(..., json_schema_extra={"example": "245123"})
    certified_status: Literal["CERTIFIED", "AT_RISK", "NON_FUNCTIONAL"] = Field(..., json_schema_extra={"example": "CERTIFIED"})
    evaluation_ts: str = Field(..., json_schema_extra={"example": "2026-10-04T12:00:00Z"})


class SujalGaonPushResponse(BaseModel):
    sync_status: str = Field("MOCK_VILLAGE_SYNCED", json_schema_extra={"example": "MOCK_VILLAGE_SYNCED"})
    adapter_mode: str = Field("UNVERIFIED_MOCK", json_schema_extra={"example": "UNVERIFIED_MOCK"})
    lgd_gp_code: str
    certified_status: str
