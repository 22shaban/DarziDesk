from flask import Flask
from flask_cors import CORS

from config.settings import AppConfig
from routes.health import health_blueprint


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(AppConfig)

    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ALLOWED_ORIGINS"]}})

    app.register_blueprint(health_blueprint)

    @app.get("/")
    def index():
        return {
            "service": app.config["APP_NAME"],
            "status": "ok",
            "message": "DarziDesk API foundation is running"
        }, 200

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host=app.config["FLASK_HOST"], port=app.config["FLASK_PORT"], debug=app.config["FLASK_DEBUG"])
