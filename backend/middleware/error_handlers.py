"""Global error handlers for future JSON API responses and diagnostics."""

from __future__ import annotations

from flask import Flask, request
from werkzeug.exceptions import HTTPException

from utils.response import json_response


def register_error_handlers(app: Flask) -> None:
    """Register JSON handlers for 404, 500, and unexpected exceptions."""

    @app.errorhandler(404)
    def handle_not_found(error):
        return json_response(
            "Resource not found",
            data={"path": request.path},
            status_code=404,
        )

    @app.errorhandler(500)
    def handle_internal_error(error):
        app.logger.exception("Internal server error", exc_info=error)
        return json_response("Internal server error", status_code=500)

    @app.errorhandler(Exception)
    def handle_exception(error):
        if isinstance(error, HTTPException):
            return json_response(
                error.description or "Request failed",
                status_code=error.code or 500,
            )

        app.logger.exception("Unhandled exception")
        return json_response("Unexpected error occurred", status_code=500)
