import os

from dotenv import load_dotenv


load_dotenv()


class AppConfig:
    APP_NAME = os.getenv("APP_NAME", "DarziDesk API")
    APP_ENV = os.getenv("APP_ENV", "development")

    FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")
    FLASK_PORT = int(os.getenv("FLASK_PORT", "5000"))
    FLASK_DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"

    API_PREFIX = os.getenv("API_PREFIX", "/api/v1")
    CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:5173")

    AWS_REGION = os.getenv("AWS_REGION", "ap-south-1")
    DYNAMODB_TABLE_PREFIX = os.getenv("DYNAMODB_TABLE_PREFIX", "darzidesk")
