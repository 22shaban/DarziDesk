"""CORS extension setup for future frontend and API integration points."""

from flask import Flask
from flask_cors import CORS


def init_cors(app: Flask) -> None:
    """Configure cross-origin rules for the API without enabling business logic."""
    CORS(
        app,
        resources={r"/*": {"origins": app.config["CORS_ALLOWED_ORIGINS"]}},
        supports_credentials=False,
    )
