"""Placeholder AWS client initialization for future AWS-backed services."""

from flask import Flask

from services.aws_client import create_boto3_client, get_boto3_session
from services.dynamodb_service import DynamoDBService
from services.s3_service import S3Service
from services.ses_service import SESService


def init_aws_clients(app: Flask) -> None:
    """Create boto3 clients and store placeholder services on the Flask app."""
    session = get_boto3_session(
        region_name=app.config["AWS_REGION"],
        aws_access_key_id=app.config["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=app.config["AWS_SECRET_ACCESS_KEY"],
    )

    dynamodb_client = create_boto3_client("dynamodb", session=session)
    ses_client = create_boto3_client("ses", session=session)
    s3_client = create_boto3_client("s3", session=session)

    app.extensions["aws_session"] = session
    app.extensions["aws_clients"] = {
        "dynamodb": dynamodb_client,
        "ses": ses_client,
        "s3": s3_client,
    }
    app.extensions["dynamodb_service"] = DynamoDBService(client=dynamodb_client)
    app.extensions["ses_service"] = SESService(client=ses_client)
    app.extensions["s3_service"] = S3Service(client=s3_client)
