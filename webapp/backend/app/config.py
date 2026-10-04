import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

# Base path: repo root is 3 levels up from this file (app/ -> backend/ -> webapp/ -> root)
APP_DIR = Path(__file__).resolve().parent
REPO_ROOT = APP_DIR.parent.parent.parent
CONTRACTS_DIR_DEFAULT = REPO_ROOT / "contracts"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    app_name: str = "NeerSync Core Platform"
    app_version: str = "1.0.0"
    app_env: str = Field(default="development", description="development | production | test")
    debug: bool = True

    # Database: Supports SQLite (aiosqlite) for lightweight local tests, and PostgreSQL (asyncpg) for Docker/Prod
    database_url: str = Field(
        default="sqlite+aiosqlite:///./neersync.db",
        description="Async SQLAlchemy database URL"
    )

    # Path to contracts directory containing schemas & openapi
    contracts_dir: Path = CONTRACTS_DIR_DEFAULT

    # MQTT Configuration
    mqtt_broker_host: str = "localhost"
    mqtt_broker_port: int = 1883
    mqtt_username: str = ""
    mqtt_password: str = ""
    mqtt_topic_subscribe: str = "neersync/v1/#"
    mqtt_enabled: bool = True

    # External ML Service (Member A /predict service)
    ml_service_url: str = "http://localhost:8001/predict"
    ml_service_timeout_sec: float = 2.0

    # Government IMIS & Sujal Gaon Configuration [UNVERIFIED / CONFIGURABLE]
    imis_api_url: str = "http://localhost:8000/api/v1/mock/imis"
    imis_api_key: str = "mock-imis-key-secret-2026"
    sujal_gaon_api_url: str = "http://localhost:8000/api/v1/mock/sujal-gaon"
    imis_retry_max_attempts: int = 3
    imis_retry_backoff_sec: float = 1.0
    imis_fallback_dir: Path = APP_DIR / "data" / "imis_fallback"

    # Security & RBAC
    jwt_secret_key: str = "neersync-super-secret-key-national-fhtc-2026-secure"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60 * 24

    # FHTC Service Index Weights (Configurable: Sum = 1.0)
    weight_regularity: float = 0.30
    weight_adequacy: float = 0.20
    weight_quality: float = 0.20
    weight_pressure: float = 0.15
    weight_grievance: float = 0.15

    # Alert Escalation Timers (in hours)
    escalate_vwsc_hours: float = 4.0
    escalate_je_hours: float = 24.0
    escalate_ee_hours: float = 48.0


settings = Settings()
