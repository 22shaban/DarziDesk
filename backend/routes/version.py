"""Version route for exposing backend release metadata."""

from flask import Blueprint, current_app

from utils.response import json_response


version_blueprint = Blueprint("version", __name__)


@version_blueprint.get("/version")
def version_check() -> tuple[dict[str, object], int]:
    """Return the current backend version payload for runtime checks."""
    return json_response(
        "Version retrieved",
        data={
            "service": current_app.config["APP_NAME"],
            "version": current_app.config["APP_VERSION"],
            "environment": current_app.config["APP_ENV"],
        },
    )
