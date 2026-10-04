from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.alert import AlertIncident, AlertEscalationLog
from app.schemas.alert import AlertPayload, AlertUpdateRequest, AlertScope
from app.services.alert_engine import alert_engine

router = APIRouter(prefix="/api/v1/alerts", tags=["System Alerts & Escalations"])


def _to_schema(alert: AlertIncident) -> AlertPayload:
    """Helper to convert ORM model to AlertPayload schema."""
    created_str = alert.created_ts.isoformat() if alert.created_ts else datetime.now(timezone.utc).isoformat()
    return AlertPayload(
        alert_id=alert.alert_id,
        type=alert.type,
        severity=alert.severity,
        scope=AlertScope(
            gp=alert.lgd_gp_code,
            branch=alert.branch,
            fhtc_id=alert.fhtc_id
        ),
        reason=alert.reason,
        created_ts=created_str,
        status=alert.status,
        escalation_level=alert.escalation_level,
        technician_photo_url=alert.technician_photo_url,
        resolution_notes=alert.resolution_notes,
        citizen_confirmed=alert.citizen_confirmed
    )


@router.get("", response_model=List[AlertPayload])
async def list_alerts(
    lgd_gp_code: Optional[str] = Query(None, pattern=r"^[0-9]{4,8}$"),
    status: Optional[str] = Query(None, enum=["active", "acknowledged", "resolved", "pending_citizen_confirmation"]),
    severity: Optional[str] = Query(None, enum=["low", "medium", "high"]),
    db: AsyncSession = Depends(get_db)
):
    """Retrieves active or historical alerts filtered by GP, severity, and status."""
    conditions = []
    if lgd_gp_code:
        conditions.append(AlertIncident.lgd_gp_code == lgd_gp_code)
    if status:
        conditions.append(AlertIncident.status == status)
    if severity:
        conditions.append(AlertIncident.severity == severity)

    q = select(AlertIncident)
    if conditions:
        q = q.where(and_(*conditions))
    q = q.order_by(AlertIncident.created_ts.desc())

    res = await db.execute(q)
    alerts = res.scalars().all()
    return [_to_schema(a) for a in alerts]


@router.post("", status_code=status.HTTP_201_CREATED, response_model=AlertPayload)
async def create_alert_incident(
    alert_in: AlertPayload,
    db: AsyncSession = Depends(get_db)
):
    """Emits a new alert event (called by ML or rule engine)."""
    try:
        dt = datetime.fromisoformat(alert_in.created_ts.replace("Z", "+00:00"))
    except Exception:
        dt = datetime.now(timezone.utc)

    alert = AlertIncident(
        alert_id=alert_in.alert_id,
        type=alert_in.type,
        severity=alert_in.severity,
        lgd_gp_code=alert_in.scope.gp,
        branch=alert_in.scope.branch,
        fhtc_id=alert_in.scope.fhtc_id,
        reason=alert_in.reason,
        created_ts=dt,
        status=alert_in.status,
        escalation_level=alert_in.escalation_level or "jal_mitra",
        escalated_at=dt,
        technician_photo_url=alert_in.technician_photo_url
    )
    db.add(alert)
    await db.commit()
    await db.refresh(alert)
    return _to_schema(alert)


@router.patch("/{alert_id}", response_model=AlertPayload)
async def update_alert_status(
    alert_id: str,
    update_data: AlertUpdateRequest,
    db: AsyncSession = Depends(get_db)
):
    """Acknowledge, resolve, or advance repair status for an alert."""
    q = select(AlertIncident).where(AlertIncident.alert_id == alert_id)
    res = await db.execute(q)
    alert = res.scalar_one_or_none()
    if not alert:
        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")

    alert.status = update_data.status
    if update_data.resolution_notes:
        alert.resolution_notes = update_data.resolution_notes
    if update_data.technician_photo_url:
        alert.technician_photo_url = update_data.technician_photo_url
        alert.repaired_at = datetime.now(timezone.utc)

    # Citizen confirmation loop
    if update_data.citizen_confirmed is not None:
        alert.citizen_confirmed = update_data.citizen_confirmed
        alert.citizen_confirmation_ts = datetime.now(timezone.utc)
        if update_data.citizen_confirmed:
            alert.status = "resolved"
            alert.resolved_ts = datetime.now(timezone.utc)
        else:
            alert.status = "active"
            alert.resolution_notes = "Citizen reported issue still persists. Alert reopened."

    if update_data.status == "resolved" and not alert.resolved_ts:
        alert.resolved_ts = datetime.now(timezone.utc)

    await db.commit()
    await db.refresh(alert)
    return _to_schema(alert)


@router.post("/run-escalations", status_code=status.HTTP_200_OK)
async def trigger_escalation_cycle(db: AsyncSession = Depends(get_db)):
    """Triggers an escalation evaluation run (used by periodic background task or tests)."""
    escalated = await alert_engine.run_escalation_cycle(db)
    return {"status": "ok", "escalated_alerts": escalated}
