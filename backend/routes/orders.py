"""Orders route placeholder for future order creation workflows."""

from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from flask import Blueprint, request

from services.dynamodb_service import DynamoDBService
from utils.response import json_response


orders_bp = Blueprint("orders", __name__, url_prefix="/orders")


@orders_bp.post("")
def create_order() -> tuple[dict[str, object], int]:
    """Create a new order record in DynamoDB without any CRUD expansion."""
    payload = request.get_json(silent=True) or {}

    customer_name = payload.get("customerName")
    phone = payload.get("phone")
    garment_type = payload.get("garmentType")
    status = payload.get("status") or "Pending"

    missing_fields = [
        field
        for field, value in (
            ("customerName", customer_name),
            ("phone", phone),
            ("garmentType", garment_type),
        )
        if not value
    ]

    if missing_fields:
        return json_response(
            "Missing required fields",
            errors={"fields": missing_fields},
            status_code=400,
        )

    order_id = str(uuid4())
    created_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

    item = {
        "orderId": {"S": order_id},
        "customerName": {"S": str(customer_name).strip()},
        "phone": {"S": str(phone).strip()},
        "garmentType": {"S": str(garment_type).strip()},
        "status": {"S": str(status).strip() or "Pending"},
        "createdAt": {"S": created_at},
    }

    service = DynamoDBService()
    service.put_order(item)

    return json_response(
        "Order created successfully",
        data={"orderId": order_id},
        status_code=201,
    )