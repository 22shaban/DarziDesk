"""HTTP route registration package for future DarziDesk API blueprints."""

from flask import Flask

from .health import health_blueprint
from .version import version_blueprint


def register_blueprints(app: Flask) -> None:
	"""Register all current API blueprints on the Flask application."""
	app.register_blueprint(health_blueprint)
	app.register_blueprint(version_blueprint)
