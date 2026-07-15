"""Employee routes."""

from __future__ import annotations

from flask import Blueprint

from utils.response import json_response

employees_bp = Blueprint(
    "employees",
    __name__,
    url_prefix="/employees",
)


@employees_bp.get("")
def get_employees():
    return json_response(
        "Employees endpoint working",
        data=[],
    )