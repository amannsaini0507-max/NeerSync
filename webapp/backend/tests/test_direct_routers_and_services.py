import pytest
from datetime import datetime, timezone
from app.routers.master import (
    get_gp_master,
    get_scheme_master,
    get_node_details,
    get_fhtc_details,
)
from app.routers.alerts import (
    list_alerts,
    create_alert_incident,
    update_alert_status,
    trigger_escalation_cycle,
)
from app.routers.auth import (
    request_mock_otp,
    verify_mock_otp,
    get_user_profile,
    create_access_token,
    require_roles,
)
from app.schemas.auth import OTPRequest, OTPVerifyRequest
from app.schemas.alert import AlertPayload, AlertUpdateRequest, AlertScope
from app.models.user import User
from fastapi import HTTPException


@pytest.mark.asyncio
async def test_direct_master_router(db_session):
    # GP Master
    gp = await get_gp_master("245123", db=db_session)
    assert gp.lgd_gp_code == "245123"
    assert gp.name == "Badepur"

    # GP 404
    with pytest.raises(HTTPException):
        await get_gp_master("999999", db=db_session)

    # Scheme Master
    sch = await get_scheme_master("SCH-UP-245123", db=db_session)
    assert sch.scheme_id == "SCH-UP-245123"

    with pytest.raises(HTTPException):
        await get_scheme_master("SCH-INVALID", db=db_session)

    # Node Master
    node = await get_node_details("NS-UP-245123-N001", db=db_session)
    assert node.node_id == "NS-UP-245123-N001"

    with pytest.raises(HTTPException):
        await get_node_details("NS-UP-INVALID", db=db_session)

    # FHTC Master
    fhtc = await get_fhtc_details("FHTC-UP-245123-0042", db=db_session)
    assert fhtc.fhtc_id == "FHTC-UP-245123-0042"

    with pytest.raises(HTTPException):
        await get_fhtc_details("FHTC-UP-INVALID", db=db_session)


@pytest.mark.asyncio
async def test_direct_alerts_router(db_session):
    # List alerts
    alerts = await list_alerts(lgd_gp_code="245123", status=None, severity=None, db=db_session)
    assert isinstance(alerts, list)

    # Create alert
    new_alert = AlertPayload(
        alert_id="ALT-DIRECT-TEST-01",
        type="quality",
        severity="high",
        scope=AlertScope(gp="245123", branch="Main", fhtc_id=None),
        reason="Direct test high turbidity",
        created_ts=datetime.now(timezone.utc).isoformat(),
        status="active"
    )
    created = await create_alert_incident(new_alert, db=db_session)
    assert created.alert_id == "ALT-DIRECT-TEST-01"

    # Update alert
    updated = await update_alert_status(
        "ALT-DIRECT-TEST-01",
        AlertUpdateRequest(status="resolved", resolution_notes="Filters backwashed"),
        db=db_session
    )
    assert updated.status == "resolved"

    # 404 on invalid alert
    with pytest.raises(HTTPException):
        await update_alert_status("ALT-NOT-FOUND", AlertUpdateRequest(status="resolved"), db=db_session)

    # Run escalations
    esc = await trigger_escalation_cycle(db=db_session)
    assert "escalated_alerts" in esc


@pytest.mark.asyncio
async def test_direct_auth_router(db_session):
    phone = "9111223344"
    # Request OTP without consent
    with pytest.raises(HTTPException):
        await request_mock_otp(OTPRequest(phone=phone, consent=False), db=db_session)

    # Request OTP with consent
    req = await request_mock_otp(OTPRequest(phone=phone, consent=True), db=db_session)
    assert req["mock_otp"] == "123456"

    # Verify invalid OTP
    with pytest.raises(HTTPException):
        await verify_mock_otp(OTPVerifyRequest(phone=phone, otp="999999"), db=db_session)

    # Verify valid OTP
    auth_resp = await verify_mock_otp(OTPVerifyRequest(phone=phone, otp="123456"), db=db_session)
    assert auth_resp.access_token is not None

    # Get current user profile
    user_obj = User(
        user_id="USR-TEST-01",
        phone=phone,
        phone_masked=phone[:2] + "XXXX" + phone[-4:],
        role="jal_mitra",
        name="Test Mitra",
        lgd_gp_code="245123",
        consent_given=True
    )
    prof = await get_user_profile(user_obj)
    assert prof.phone_masked == user_obj.phone_masked

    # Test create_access_token helper
    token = create_access_token({"sub": "USR-TEST-01", "role": "jal_mitra"})
    assert isinstance(token, str)

    # Test require_roles helper
    checker = require_roles(["jal_mitra", "vwsc"])
    checked_user = checker(current_user=user_obj)
    assert checked_user.user_id == "USR-TEST-01"

    forbidden_checker = require_roles(["state_admin"])
    with pytest.raises(HTTPException):
        forbidden_checker(current_user=user_obj)
