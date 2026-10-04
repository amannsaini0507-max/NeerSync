"""
JalSetu Simulation Integration Router
Provides interactive scenario injection and digital twin bridging endpoints.
Connects Member A's hydraulic & fault simulation directly to the Webapp Backend.
"""

from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Depends, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, update

from app.database import get_db
from app.models.alert import AlertIncident
from app.services.ingestion import ingestion_service
from app.services.index_calculator import index_calculator
from app.services.alert_engine import alert_engine

router = APIRouter(prefix="/api/v1/simulation", tags=["Simulation & Digital Twin Bridge"])


class ScenarioRequest(BaseModel):
    scenario: str = Field(
        ...,
        description="Scenario preset: normal | pipe_burst | slow_leak | pipe_choke | contamination | pump_failure"
    )
    lgd_gp_code: str = Field(default="245123", description="Gram Panchayat LGD Code")
    scheme_id: str = Field(default="SCH-UP-245123", description="IMIS Scheme ID")


class ScenarioResponse(BaseModel):
    status: str
    scenario: str
    injected_packets: int
    alerts_triggered: List[Dict[str, Any]]
    fhtc_service_index: float
    summary: str


@router.post("/scenario", response_model=ScenarioResponse)
async def inject_simulation_scenario(
    req: ScenarioRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Injects a real-time hydraulic simulation scenario into the live backend.
    Generates contract-compliant telemetry for all 4 IoT node types,
    triggers the Alert Engine, updates the GIS Map status, and recomputes the JJM Service Index.
    """
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    gp = req.lgd_gp_code
    scheme = req.scheme_id

    # Construct scenario-specific telemetry bundles
    packets: List[Dict[str, Any]] = []

    if req.scenario == "pipe_burst":
        packets = [
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N001",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000,
                "type": "pump",
                "values": {"current_a": 15.1, "voltage_v": 231.0},
                "battery_v": 3.95,
                "rssi_dbm": -72,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N002",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 1,
                "type": "esr_level",
                "values": {"level_cm": 185.0},
                "battery_v": 3.88,
                "rssi_dbm": -68,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N002",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 2,
                "type": "flow",
                "values": {"flow_lpm": 520.0},  # Catastrophic surge in main outlet flow
                "battery_v": 3.88,
                "rssi_dbm": -68,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N003",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 3,
                "type": "pressure",
                "values": {"pressure_kpa": 18.5},  # Pressure collapses to 18.5 kPa (< 70 kPa target)
                "battery_v": 3.91,
                "rssi_dbm": -81,
                "fw": "1.0.0"
            }
        ]
        summary_text = "Pipe Burst on Branch A injected: Tail-end pressure collapsed to 18.5 kPa; high flow discharge detected."

    elif req.scenario == "slow_leak":
        packets = [
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N002",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000,
                "type": "flow",
                "values": {"flow_lpm": 315.0},  # Unaccounted water leakage flow
                "battery_v": 3.89,
                "rssi_dbm": -70,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N003",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 1,
                "type": "pressure",
                "values": {"pressure_kpa": 56.0},  # Moderate drop below 70 kPa
                "battery_v": 3.90,
                "rssi_dbm": -78,
                "fw": "1.0.0"
            }
        ]
        summary_text = "Slow Underground Leak on Branch B injected: Night flow anomaly and residual pressure drop to 56 kPa."

    elif req.scenario == "pipe_choke":
        packets = [
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N002",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000,
                "type": "flow",
                "values": {"flow_lpm": 85.0},  # Heavily throttled flow
                "battery_v": 3.89,
                "rssi_dbm": -71,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N003",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 1,
                "type": "pressure",
                "values": {"pressure_kpa": 31.0},  # Tail starved by pipe choking
                "battery_v": 3.92,
                "rssi_dbm": -80,
                "fw": "1.0.0"
            }
        ]
        summary_text = "Pipe Choke on Branch C injected: Severe head loss across sedimentation choke; tail pressure 31 kPa."

    elif req.scenario == "contamination":
        packets = [
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N004",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000,
                "type": "quality",
                "values": {
                    "turbidity_ntu": 16.8,   # Contaminated monsoon runoff > 5 NTU
                    "chlorine_mgl": 0.05    # Depleted chlorine < 0.2 mg/L
                },
                "battery_v": 3.84,
                "rssi_dbm": -75,
                "fw": "1.0.0"
            }
        ]
        summary_text = "Post-rain Contamination injected: Turbidity spiked to 16.8 NTU; residual chlorine depleted to 0.05 mg/L."

    elif req.scenario == "pump_failure":
        packets = [
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N001",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000,
                "type": "pump",
                "values": {"current_a": 0.0, "voltage_v": 0.0},  # Complete electrical cutout
                "battery_v": 3.92,
                "rssi_dbm": -69,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N002",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 1,
                "type": "esr_level",
                "values": {"level_cm": 65.0},  # Critically drained reservoir (< 100 cm)
                "battery_v": 3.87,
                "rssi_dbm": -68,
                "fw": "1.0.0"
            }
        ]
        summary_text = "Pump Failure injected: Motor tripped with zero current; reservoir critically depleted."

    else:  # "normal"
        packets = [
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N001",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000,
                "type": "pump",
                "values": {"current_a": 14.6, "voltage_v": 230.5},
                "battery_v": 3.95,
                "rssi_dbm": -71,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N002",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 1,
                "type": "esr_level",
                "values": {"level_cm": 340.0},
                "battery_v": 3.91,
                "rssi_dbm": -68,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N002",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 2,
                "type": "flow",
                "values": {"flow_lpm": 245.0},
                "battery_v": 3.91,
                "rssi_dbm": -68,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N003",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 3,
                "type": "pressure",
                "values": {"pressure_kpa": 138.0},  # Healthy 138 kPa (> 70 kPa target)
                "battery_v": 3.93,
                "rssi_dbm": -79,
                "fw": "1.0.0"
            },
            {
                "schema_version": "1.0",
                "node_id": f"JS-UP-{gp}-N004",
                "lgd_gp_code": gp,
                "scheme_id": scheme,
                "ts": now_iso,
                "seq": int(datetime.now().timestamp()) % 100000 + 4,
                "type": "quality",
                "values": {"turbidity_ntu": 1.4, "chlorine_mgl": 0.42},
                "battery_v": 3.88,
                "rssi_dbm": -74,
                "fw": "1.0.0"
            }
        ]
        summary_text = "Normal Operation restored: All nodes reporting optimal pressure, potability, and reservoir balance."

    # Ingest all packets through real database pipeline
    for p in packets:
        await ingestion_service.ingest_telemetry(db, p)

    # Fetch active alerts for this GP
    q = select(AlertIncident).where(
        and_(
            AlertIncident.lgd_gp_code == gp,
            AlertIncident.status.in_(["active", "acknowledged"])
        )
    ).order_by(AlertIncident.created_ts.desc())
    res = await db.execute(q)
    active = res.scalars().all()

    alert_dicts = [
        {
            "alert_id": a.alert_id,
            "type": a.type,
            "severity": a.severity,
            "reason": a.reason,
            "escalation": a.escalation_level
        }
        for a in active[:5]
    ]

    # Calculate updated FHTC index
    index_res = await index_calculator.calculate_gp_index(db, gp, window_days=7)

    return ScenarioResponse(
        status="success",
        scenario=req.scenario,
        injected_packets=len(packets),
        alerts_triggered=alert_dicts,
        fhtc_service_index=index_res["fhtc_service_index"],
        summary=summary_text
    )


@router.post("/reset")
async def reset_simulation(
    lgd_gp_code: str = Query("245123"),
    db: AsyncSession = Depends(get_db)
):
    """Resets simulation by resolving all active simulated alerts and reinjecting normal baseline."""
    # Close active alerts
    q = update(AlertIncident).where(
        and_(
            AlertIncident.lgd_gp_code == lgd_gp_code,
            AlertIncident.status != "resolved"
        )
    ).values(
        status="resolved",
        resolved_ts=datetime.now(timezone.utc),
        resolution_notes="Auto-resolved upon simulation reset to normal baseline"
    )
    await db.execute(q)
    await db.commit()

    # Re-inject normal telemetry
    req = ScenarioRequest(scenario="normal", lgd_gp_code=lgd_gp_code)
    return await inject_simulation_scenario(req, db)
