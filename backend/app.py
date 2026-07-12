"""Flask application entry point and factory for the DarziDesk backend."""

from __future__ import annotations

import os

from flask import Flask

from config.settings import BaseConfig, get_config_class
from extensions import register_extensions
from middleware import register_middlewares
from routes import register_blueprints
from utils.response import json_response


def create_app(config_class: type[BaseConfig] | None = None) -> Flask:
    """Create and configure the Flask application instance."""
    app = Flask(__name__)
    selected_config = config_class or get_config_class(os.getenv("APP_ENV"))
    app.config.from_object(selected_config)

    register_extensions(app)
    register_middlewares(app)
    register_blueprints(app)

    @app.get("/")
    def index() -> tuple[dict[str, object], int]:
        """Provide a lightweight root response for local runtime checks."""
        return json_response(
            "DarziDesk API foundation is running",
            data={
                "service": app.config["APP_NAME"],
                "version": app.config["APP_VERSION"],
            },
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host=app.config["FLASK_HOST"],
        port=app.config["FLASK_PORT"],
        debug=app.config["FLASK_DEBUG"],
        use_reloader=False,
    )
