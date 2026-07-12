"""Middleware registration package for request tracing and error handling."""

from flask import Flask

from .error_handlers import register_error_handlers
from .request_logger import register_request_logging


def register_middlewares(app: Flask) -> None:
    """Attach middleware hooks and global error handlers to the Flask app."""
    register_request_logging(app)
    register_error_handlers(app)
