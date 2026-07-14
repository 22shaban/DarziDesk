"""HTTP route registration package for DarziDesk API blueprints."""

from flask import Flask

from .customers import customers_bp
from .health import health_blueprint
from .orders import orders_bp
from .version import version_blueprint


def register_blueprints(app: Flask) -> None:
    """Register all API blueprints on the Flask application."""

    app.register_blueprint(health_blueprint)
    app.register_blueprint(version_blueprint)

    app.register_blueprint(orders_bp)
    app.register_blueprint(customers_bp)