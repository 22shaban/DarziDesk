"""Settings API."""

from flask import Blueprint, request

from services.dynamodb_service import DynamoDBService

settings_bp = Blueprint(
    "settings",
    __name__,
    url_prefix="/settings",
)

settings_service = DynamoDBService(
    table_name="darzidesk-settings",
)


@settings_bp.get("")
def get_settings():
    item = settings_service.get_settings()

    if not item:
        return {
            "status": 404,
            "message": "Settings not found.",
            "data": {},
        }, 404

    return {
        "status": 200,
        "message": "Settings fetched successfully.",
        "data": {
            "shopName": item["shopName"]["S"],
            "ownerName": item["ownerName"]["S"],
            "phone": item["phone"]["S"],
            "email": item["email"]["S"],
            "address": item["address"]["S"],
            "logoUrl": item["logoUrl"]["S"],
        },
    }


@settings_bp.put("")
def update_settings():
    data = request.get_json()

    settings_service.update_settings(
        shop_name=data.get("shopName", ""),
        owner_name=data.get("ownerName", ""),
        phone=data.get("phone", ""),
        email=data.get("email", ""),
        address=data.get("address", ""),
        logo_url=data.get("logoUrl", ""),
    )

    return {
        "status": 200,
        "message": "Settings updated successfully.",
    }