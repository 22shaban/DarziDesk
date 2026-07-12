"""Extension registration package for backend startup concerns."""

from flask import Flask

from .aws import init_aws_clients
from .cors import init_cors
from .logging import configure_logging


def register_extensions(app: Flask) -> None:
    """Initialize app-wide extensions for CORS, logging, and AWS placeholders."""
    configure_logging(app)
    init_cors(app)
    init_aws_clients(app)
