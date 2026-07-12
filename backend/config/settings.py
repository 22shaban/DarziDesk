"""Configuration classes and environment loading for the DarziDesk backend."""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env", override=False)


def _split_csv(value: str) -> list[str]:
    """Convert a comma-separated environment variable into a clean list."""
    return [item.strip() for item in value.split(",") if item.strip()]


class BaseConfig:
    """Shared configuration for all DarziDesk backend environments."""

    APP_NAME = os.getenv("APP_NAME", "DarziDesk API")
    APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
    APP_ENV = os.getenv("APP_ENV", "development")

    FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")
    FLASK_PORT = int(os.getenv("FLASK_PORT", "5000"))
    FLASK_DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"

    API_PREFIX = os.getenv("API_PREFIX", "/api/v1")
    CORS_ALLOWED_ORIGINS = _split_csv(
        os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:5173")
    )

    AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    DYNAMODB_TABLE_PREFIX = os.getenv("DYNAMODB_TABLE_PREFIX", "darzidesk")

    LOG_DIR = str(BASE_DIR / "logs")
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

    JSON_SORT_KEYS = False
    PROPAGATE_EXCEPTIONS = False


class DevelopmentConfig(BaseConfig):
    """Development settings for local backend iteration."""

    FLASK_DEBUG = True
    LOG_LEVEL = "DEBUG"


class ProductionConfig(BaseConfig):
    """Production settings for deployed backend instances."""

    FLASK_DEBUG = False
    LOG_LEVEL = "INFO"


CONFIG_BY_ENV: dict[str, type[BaseConfig]] = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
}


def get_config_class(environment: str | None = None) -> type[BaseConfig]:
    """Resolve the configuration class for the selected environment."""
    return CONFIG_BY_ENV.get((environment or BaseConfig.APP_ENV).lower(), DevelopmentConfig)
