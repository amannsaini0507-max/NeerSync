from datetime import datetime
from typing import Dict, Any, Optional, Literal
from pydantic import BaseModel, Field


class TelemetryPayload(BaseModel):
    schema_version: Literal["1.0"] = Field("1.0", description="Contract schema version. Must be '1.0'")
    node_id: str = Field(..., pattern=r"^NS-[A-Z]{2}-[0-9]+-N[0-9]{3}$", json_schema_extra={"example": "NS-UP-245123-N001"})
    lgd_gp_code: str = Field(..., json_schema_extra={"example": "245123"})
    scheme_id: str = Field(..., pattern=r"^SCH-[A-Z]{2}-[0-9A-Z_]+$", json_schema_extra={"example": "SCH-UP-245123"})
    ts: str = Field(..., json_schema_extra={"example": "2026-10-04T12:00:00Z"})
    seq: int = Field(..., ge=0, json_schema_extra={"example": 104})
    type: Literal["pump", "esr_level", "flow", "pressure", "quality"]
    values: Dict[str, Any] = Field(..., description="Metrics dictionary matching telemetry.schema.json")
    battery_v: float = Field(..., ge=2.0, le=16.0, json_schema_extra={"example": 3.85})
    rssi_dbm: int = Field(..., ge=-140, le=0, json_schema_extra={"example": -75})
    fw: str = Field(..., pattern=r"^v?[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?$", json_schema_extra={"example": "1.0.0"})


class StatusPayload(BaseModel):
    node_id: str = Field(..., pattern=r"^NS-[A-Z]{2}-[0-9]+-N[0-9]{3}$", json_schema_extra={"example": "NS-UP-245123-N001"})
    lgd_gp_code: str = Field(..., json_schema_extra={"example": "245123"})
    scheme_id: str = Field(..., pattern=r"^SCH-[A-Z]{2}-[0-9A-Z_]+$", json_schema_extra={"example": "SCH-UP-245123"})
    status: Literal["online", "offline", "degraded"]
    uptime_s: int = Field(..., ge=0, json_schema_extra={"example": 86400})
    battery_v: float = Field(..., ge=2.0, le=16.0, json_schema_extra={"example": 3.90})
    rssi_dbm: int = Field(..., ge=-140, le=0, json_schema_extra={"example": -65})
    fw: str = Field(..., pattern=r"^v?[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?$", json_schema_extra={"example": "1.0.0"})
    last_seen_ts: str = Field(..., json_schema_extra={"example": "2026-10-04T12:00:00Z"})
    reason: Optional[str] = Field(None, json_schema_extra={"example": "PERIODIC_HEARTBEAT"})


class IngestResponse(BaseModel):
    status: str = Field("accepted", json_schema_extra={"example": "accepted"})
    received_ts: str = Field(..., json_schema_extra={"example": "2026-10-04T12:00:00Z"})


class ErrorResponse(BaseModel):
    error: str = Field(..., json_schema_extra={"example": "BAD_REQUEST"})
    message: str = Field(..., json_schema_extra={"example": "Invalid contract schema payload"})
