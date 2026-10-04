import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Header, status
from jose import jwt, JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User
from app.models.audit import AuditLog
from app.schemas.auth import (
    OTPRequest,
    OTPVerifyRequest,
    TokenResponse,
    UserProfileResponse
)
from app.config import settings

router = APIRouter(prefix="/api/v1/auth", tags=["Security, RBAC & Mock OTP Auth"])


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.jwt_access_token_expire_minutes))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


async def get_current_user(
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db)
) -> User:
    """Dependency that extracts and validates JWT from Authorization header."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid Bearer token")

    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token payload missing subject")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")

    res = await db.execute(select(User).where(User.user_id == user_id))
    user = res.scalar_one_or_none()
    if user is None or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User inactive or not found")
    return user


def require_roles(allowed_roles: List[str]):
    """Role-Based Access Control decorator/dependency."""
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted. Required role: {allowed_roles}, your role: {current_user.role}"
            )
        return current_user
    return role_checker


@router.post("/request-otp", status_code=status.HTTP_200_OK)
async def request_mock_otp(
    request: OTPRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Mock OTP Request.
    Enforces DPDP explicit consent. Returns mock OTP in response for development/testing.
    """
    if not request.consent:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="DPDP compliance requires user consent to process phone number for OTP authentication."
        )

    phone = request.phone
    phone_masked = phone[:2] + "XXXX" + phone[-4:]

    # Check if user exists
    res = await db.execute(select(User).where(User.phone == phone))
    user = res.scalar_one_or_none()

    mock_otp = "123456"
    now = datetime.now(timezone.utc)
    expires = now + timedelta(minutes=10)

    # Determine default role based on mock phone rules
    role = "citizen"
    if phone.endswith("1111"):
        role = "jal_mitra"
    elif phone.endswith("2222"):
        role = "vwsc"
    elif phone.endswith("3333"):
        role = "je"
    elif phone.endswith("4444"):
        role = "ee"
    elif phone.endswith("9999"):
        role = "state_admin"

    if not user:
        user = User(
            user_id=f"USR-{uuid.uuid4().hex[:8]}",
            phone=phone,
            phone_masked=phone_masked,
            name=f"User {phone[-4:]}",
            role=role,
            lgd_gp_code="245123",
            consent_given=True,
            consent_ts=now,
            last_otp=mock_otp,
            otp_expires_at=expires
        )
        db.add(user)
    else:
        user.last_otp = mock_otp
        user.otp_expires_at = expires
        user.consent_given = True
        user.consent_ts = now

    await db.commit()
    return {
        "status": "otp_sent",
        "phone_masked": phone_masked,
        "mock_otp": mock_otp,
        "message": "Mock OTP generated. Use '123456' to verify."
    }


@router.post("/verify-otp", response_model=TokenResponse)
async def verify_mock_otp(
    request: OTPVerifyRequest,
    db: AsyncSession = Depends(get_db)
):
    """Verifies OTP and issues JWT token with RBAC role claims."""
    res = await db.execute(select(User).where(User.phone == request.phone))
    user = res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid phone number")

    # In mock mode, allow '123456' or exact matching OTP
    if request.otp != "123456" and request.otp != user.last_otp:
        raise HTTPException(status_code=400, detail="Invalid OTP code")

    access_token = create_access_token(
        data={
            "sub": user.user_id,
            "role": user.role,
            "lgd_gp_code": user.lgd_gp_code,
            "phone_masked": user.phone_masked
        }
    )

    # Log login audit
    audit = AuditLog(
        entity_type="user",
        entity_id=user.user_id,
        action="login",
        actor_id=user.user_id,
        actor_role=user.role,
        details={"channel": "mock_otp"}
    )
    db.add(audit)
    await db.commit()

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=user.user_id,
        role=user.role,
        phone_masked=user.phone_masked,
        lgd_gp_code=user.lgd_gp_code
    )


@router.get("/me", response_model=UserProfileResponse)
async def get_user_profile(current_user: User = Depends(get_current_user)):
    """Returns current authenticated user profile with minimal PII."""
    return UserProfileResponse(
        user_id=current_user.user_id,
        name=current_user.name,
        phone_masked=current_user.phone_masked,
        role=current_user.role,
        lgd_gp_code=current_user.lgd_gp_code,
        consent_given=current_user.consent_given
    )
