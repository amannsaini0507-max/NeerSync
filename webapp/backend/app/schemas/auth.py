from typing import Optional, Literal
from pydantic import BaseModel, Field


class OTPRequest(BaseModel):
    phone: str = Field(..., pattern=r"^[0-9]{10}$", example="9876543210")
    consent: bool = Field(True, description="DPDP explicit consent for data processing")


class OTPVerifyRequest(BaseModel):
    phone: str = Field(..., pattern=r"^[0-9]{10}$", example="9876543210")
    otp: str = Field(..., min_length=4, max_length=6, example="123456")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    role: str
    phone_masked: str
    lgd_gp_code: Optional[str] = None


class UserProfileResponse(BaseModel):
    user_id: str
    name: str
    phone_masked: str
    role: str
    lgd_gp_code: Optional[str] = None
    consent_given: bool
