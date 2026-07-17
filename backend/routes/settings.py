"""Settings API."""

from flask import Blueprint, request

settings_bp = Blueprint("settings", __name__, url_prefix="/settings")

SHOP_SETTINGS = {
    "shopName": "King's Men House",
    "ownerName": "Shaban Shaikh",
    "phone": "9004594642",
    "email": "shabanshaikh021@gmail.com",
    "address": "Almas Height 306, Almas Colony, Kausa, Mumbra",
}


@settings_bp.get("")
def get_settings():
    return {
        "status": 200,
        "message": "Settings fetched successfully.",
        "data": SHOP_SETTINGS,
    }


@settings_bp.put("")
def update_settings():
    global SHOP_SETTINGS

    SHOP_SETTINGS.update(request.json)

    return {
        "status": 200,
        "message": "Settings updated successfully.",
        "data": SHOP_SETTINGS,
    }