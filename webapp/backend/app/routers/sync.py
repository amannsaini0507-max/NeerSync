from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.audit import IMISSyncAudit
from app.schemas.sync import (
    IMISPushRequest,
    IMISPushResponse,
    SujalGaonPushRequest,
    SujalGaonPushResponse
)
from app.adapters.imis import imis_adapter

router = APIRouter(prefix="/api/v1/sync", tags=["National IMIS & Sujal Gaon Sync Adapters"])


@router.post(
    "/imis",
    response_model=IMISPushResponse,
    status_code=status.HTTP_200_OK,
    summary="Push Aggregated Data to National JJM IMIS"
)
async def push_data_to_imis(
    request: IMISPushRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    [UNVERIFIED / CONFIGURABLE] Government IMIS push endpoint.
    This endpoint is implemented as a mock sync adapter pending official API access credentials,
    OAuth client credentials, and sandbox documentation from the Department of Drinking Water
    and Sanitation (DDWS). Target endpoint URL, API keys, and retry schedules are configurable
    via environment variables.
    """
    _, sync_status, res_dict = await imis_adapter.push_imis_daily_aggregate(
        db=db,
        reporting_date=request.reporting_date,
        lgd_gp_code=request.lgd_gp_code,
        functional_fhtc_count=request.functional_fhtc_count,
        total_supply_liters=request.total_supply_liters
    )
    return IMISPushResponse(
        sync_status=res_dict.get("sync_status", sync_status),
        adapter_mode="UNVERIFIED_MOCK",
        batch_id=res_dict.get("batch_id")
    )


@router.post(
    "/sujal-gaon",
    response_model=SujalGaonPushResponse,
    status_code=status.HTTP_200_OK,
    summary="Push Village Status to Sujal Gaon"
)
async def push_status_to_sujal_gaon(
    request: SujalGaonPushRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    [UNVERIFIED / CONFIGURABLE] Government Sujal Gaon sync adapter.
    Mock adapter for Har Ghar Jal village certification and daily supply status synchronization.
    Requires official ministerial gateway onboarding.
    """
    _, res_dict = await imis_adapter.push_sujal_gaon_status(
        db=db,
        lgd_gp_code=request.lgd_gp_code,
        certified_status=request.certified_status,
        evaluation_ts=request.evaluation_ts
    )
    return SujalGaonPushResponse(
        sync_status="MOCK_VILLAGE_SYNCED",
        adapter_mode="UNVERIFIED_MOCK",
        lgd_gp_code=request.lgd_gp_code,
        certified_status=request.certified_status
    )


@router.get("/audit-logs", status_code=status.HTTP_200_OK)
async def get_sync_audit_logs(
    lgd_gp_code: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db)
):
    """Returns persistent audit log of all national sync attempts."""
    q = select(IMISSyncAudit)
    if lgd_gp_code:
        q = q.where(IMISSyncAudit.lgd_gp_code == lgd_gp_code)
    q = q.order_by(IMISSyncAudit.sync_ts.desc()).limit(limit)

    res = await db.execute(q)
    audits = res.scalars().all()
    return [
        {
            "sync_batch_id": a.sync_batch_id,
            "reporting_date": a.reporting_date,
            "lgd_gp_code": a.lgd_gp_code,
            "functional_fhtc_count": a.functional_fhtc_count,
            "total_supply_liters": a.total_supply_liters,
            "sync_status": a.sync_status,
            "adapter_mode": a.adapter_mode,
            "error_message": a.error_message,
            "sync_ts": a.sync_ts.isoformat() if a.sync_ts else None
        }
        for a in audits
    ]
