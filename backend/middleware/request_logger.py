"""Request logging middleware for future request tracing and diagnostics."""

from __future__ import annotations

from time import perf_counter

from flask import Flask, current_app, g, request


def register_request_logging(app: Flask) -> None:
    """Record request timing and emit structured access logs."""

    @app.before_request
    def start_request_timer() -> None:
        g.request_start_time = perf_counter()

    @app.after_request
    def log_request(response):
        start_time = getattr(g, "request_start_time", None)
        duration_ms = (
            round((perf_counter() - start_time) * 1000, 2) if start_time else None
        )
        current_app.logger.info(
            "%s %s -> %s (%sms)",
            request.method,
            request.path,
            response.status_code,
            duration_ms,
        )
        return response
