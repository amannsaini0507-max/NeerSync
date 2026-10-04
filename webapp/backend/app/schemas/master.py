from typing import List, Optional
from pydantic import BaseModel, Field


class GPMasterResponse(BaseModel):
    lgd_gp_code: str = Field(..., example="245123")
    name: str = Field(..., example="Badepur")
    district: str = Field(..., example="Meerut")
    state: str = Field(..., example="UP")
    total_fhtc: int = Field(..., example=450)
    schemes: Optional[List[str]] = None


class SchemeMasterResponse(BaseModel):
    scheme_id: str = Field(..., example="SCH-UP-245123")
    name: str = Field(..., example="Badepur Multi-Village Water Supply Scheme")
    lgd_gp_code: str
    state: str
    source_type: str = "Groundwater_Tubewell"


class NodeMasterResponse(BaseModel):
    node_id: str = Field(..., example="NS-UP-245123-N001")
    lgd_gp_code: str
    scheme_id: str
    type: str = Field(..., example="pressure")
    fw: str = "1.0.0"
    status: str = "online"
    battery_v: float = 3.85
    rssi_dbm: int = -75
    branch: str = "Main"


class FHTCMasterResponse(BaseModel):
    fhtc_id: str = Field(..., example="FHTC-UP-245123-0042")
    habitation_id: str
    lgd_gp_code: str
    consumer_name_masked: str = "Resident"
    phone_masked: str = "XXXXXX0000"
    status: str = "functional"
    branch: str = "Main_Branch"
    lat: Optional[float] = None
    lon: Optional[float] = None
