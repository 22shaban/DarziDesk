"""HTTP route registration package for DarziDesk API blueprints."""

from flask import Flask

from .customers import customers_bp
from .health import health_blueprint
from .inventory import inventory_bp
from .measurements import measurements_bp
from .orders import orders_bp
from .version import version_blueprint
from .employees import employees_bp
from .invoices import invoices_bp

def register_blueprints(app: Flask) -> None:
    """Register all API blueprints on the Flask application."""
    app.register_blueprint(health_blueprint)
    app.register_blueprint(version_blueprint)

    app.register_blueprint(orders_bp)
    app.register_blueprint(customers_bp)
    app.register_blueprint(measurements_bp)
    app.register_blueprint(inventory_bp)
    app.register_blueprint(employees_bp)
    app.register_blueprint(invoices_bp)