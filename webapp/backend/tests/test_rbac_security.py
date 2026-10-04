import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_dpdp_consent_required(client: AsyncClient):
    """Verifies that requesting OTP without explicit DPDP consent is rejected."""
    resp = await client.post("/api/v1/auth/request-otp", json={"phone": "9876543210", "consent": False})
    assert resp.status_code == 400
    assert "consent" in resp.json()["detail"].lower()


@pytest.mark.asyncio
async def test_mock_otp_and_login_flow(client: AsyncClient):
    """Verifies full OTP request -> verify -> JWT token -> get /me profile flow."""
    # 1. Request OTP with consent
    req_resp = await client.post("/api/v1/auth/request-otp", json={"phone": "9800001111", "consent": True})
    assert req_resp.status_code == 200
    otp_data = req_resp.json()
    assert otp_data["status"] == "otp_sent"
    assert otp_data["phone_masked"] == "98XXXX1111"
    otp = otp_data["mock_otp"]

    # 2. Verify OTP
    verify_resp = await client.post("/api/v1/auth/verify-otp", json={"phone": "9800001111", "otp": otp})
    assert verify_resp.status_code == 200
    token_data = verify_resp.json()
    assert "access_token" in token_data
    assert token_data["role"] == "jal_mitra"
    token = token_data["access_token"]

    # 3. Access authenticated /me endpoint
    headers = {"Authorization": f"Bearer {token}"}
    me_resp = await client.get("/api/v1/auth/me", headers=headers)
    assert me_resp.status_code == 200
    profile = me_resp.json()
    assert profile["role"] == "jal_mitra"
    assert profile["phone_masked"] == "98XXXX1111"
    assert profile["consent_given"] is True
