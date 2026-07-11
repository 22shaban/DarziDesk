from flask import Blueprint


health_blueprint = Blueprint("health", __name__)


@health_blueprint.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "DarziDesk API",
    }, 200
