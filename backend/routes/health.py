"""Health route for future service monitoring and runtime checks."""

from flask import Blueprint

from utils.response import json_response


health_blueprint = Blueprint("health", __name__)


@health_blueprint.get("/health")
def health_check() -> tuple[dict[str, object], int]:
    """Return a lightweight JSON health response for uptime checks."""
    return json_response(
        "Service is healthy",
        data={"status": "healthy", "service": "DarziDesk API"},
    )
