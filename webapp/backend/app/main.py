import os
import asyncio
import logging
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db, AsyncSessionLocal
from app.seed.master_seed import seed_demo_village
from app.mqtt.subscriber import mqtt_subscriber
from app.routers import telemetry, alerts, feedback, master, analytics, sync, auth, simulation
from app.adapters.mock_external import mock_router

logger = logging.getLogger("neersync")
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")

FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
TWIN3D_DIST = Path(__file__).resolve().parent.parent.parent.parent / "simulation" / "twin3d" / "dist"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager: initializes tables, seeds demo data, and launches MQTT client."""
    logger.info("Initializing NeerSync Database...")
    await init_db()

    # Seed demo village
    async with AsyncSessionLocal() as session:
        try:
            await seed_demo_village(session)
        except Exception as exc:
            logger.error("Error during initial demo village seeding: %s", str(exc))

    # Start MQTT subscriber
    try:
        mqtt_subscriber.start()
    except Exception as exc:
        logger.warning("Could not launch MQTT subscriber: %s", str(exc))

    # Periodic background escalation cycle runner
    escalation_task = asyncio.create_task(_periodic_escalation_runner())

    yield

    # Shutdown
    escalation_task.cancel()
    mqtt_subscriber.stop()
    logger.info("NeerSync Backend shutdown complete.")


async def _periodic_escalation_runner():
    """Runs every 60 seconds to evaluate alert SLA timers."""
    from app.services.alert_engine import alert_engine
    while True:
        try:
            await asyncio.sleep(60)
            async with AsyncSessionLocal() as session:
                escalated = await alert_engine.run_escalation_cycle(session)
                if escalated > 0:
                    logger.info("Background escalation cycle escalated %d alerts.", escalated)
        except asyncio.CancelledError:
            break
        except Exception as exc:
            logger.error("Error in background escalation loop: %s", str(exc))


app = FastAPI(
    title="NeerSync Core REST API",
    description="AI/ML Functional Household Tap Connection (FHTC) monitoring platform under Jal Jeevan Mission.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register REST Routers adhering to contracts/openapi.yaml
app.include_router(telemetry.router)
app.include_router(alerts.router)
app.include_router(feedback.router)
app.include_router(master.router)
app.include_router(analytics.router)
app.include_router(sync.router)
app.include_router(auth.router)
app.include_router(simulation.router)
app.include_router(mock_router)


@app.get("/health", tags=["System Health"])
async def health_check():
    """Health check probe for Docker / Kubernetes liveness."""
    return {
        "status": "healthy",
        "service": "neersync-core-backend",
        "version": settings.app_version,
        "env": settings.app_env
    }


# Static 3D Digital Twin Delivery (when twin3d/dist exists)
if TWIN3D_DIST.exists():
    app.mount("/twin3d", StaticFiles(directory=TWIN3D_DIST, html=True), name="twin3d")

# Static Frontend Delivery Fallback (when dist exists)
if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIST / "assets"), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa_frontend(full_path: str):
        file_path = FRONTEND_DIST / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(FRONTEND_DIST / "index.html")
