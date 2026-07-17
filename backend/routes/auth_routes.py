"""Authentication routes."""

from flask import Blueprint, request
from utils.response import json_response

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/login")
def login():
    """Owner login."""

    data = request.get_json() or {}

    username = data.get("username")
    password = data.get("password")

    # Default owner credentials
    if username == "admin" and password == "admin123":
        return json_response(
            "Login successful.",
            data={
                "success": True,
                "token": "darzidesk-owner",
                "owner": "Shaban Shaikh",
            },
        )

    return json_response(
        "Invalid username or password.",
        status_code=401,
    )