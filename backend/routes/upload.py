from flask import Blueprint, request
from services.dynamodb_service import DynamoDBService
from services.s3_service import S3Service
from utils.response import json_response

upload_bp = Blueprint("upload", __name__)

s3_service = S3Service()
settings_service = DynamoDBService()


@upload_bp.post("/upload-logo")
def upload_logo():

    print("FILES:", request.files)
    print("FORM:", request.form)

    file = request.files.get("logo")

    print("FILE:", file)

    if file is None:
        return json_response(
            "Logo file is required.",
            status_code=400,
        )

    logo_url = s3_service.upload_logo(file)

    settings_service.update_logo(logo_url)

    return json_response(
        "Logo uploaded successfully.",
        data={
            "logoUrl": logo_url,
        },
    )