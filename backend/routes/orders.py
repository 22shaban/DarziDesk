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
    """Create a new order record in DynamoDB."""
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


@orders_bp.get("")
def get_orders() -> tuple[dict[str, object], int]:
    """Return all orders."""
    service = DynamoDBService()
    items = service.get_orders()

    orders = []

    for item in items:
        orders.append(
            {
                "orderId": item["orderId"]["S"],
                "customerName": item["customerName"]["S"],
                "phone": item["phone"]["S"],
                "garmentType": item["garmentType"]["S"],
                "status": item["status"]["S"],
                "createdAt": item["createdAt"]["S"],
            }
        )

    orders.sort(key=lambda x: x["createdAt"], reverse=True)

    return json_response(
        "Orders retrieved successfully",
        data=orders,
    )

@orders_bp.get("/<order_id>")
def get_order(order_id: str) -> tuple[dict[str, object], int]:
    """Return one order by ID."""
    service = DynamoDBService()
    item = service.get_order(order_id)

    if not item:
        return json_response(
            "Order not found",
            status_code=404,
        )

    order = {
        "orderId": item["orderId"]["S"],
        "customerName": item["customerName"]["S"],
        "phone": item["phone"]["S"],
        "garmentType": item["garmentType"]["S"],
        "status": item["status"]["S"],
        "createdAt": item["createdAt"]["S"],
    }

    return json_response(
        "Order retrieved successfully",
        data=order,
    )

@orders_bp.put("/<order_id>")
def update_order(order_id: str) -> tuple[dict[str, object], int]:
    """Update an existing order."""
    payload = request.get_json(silent=True) or {}

    customer_name = payload.get("customerName")
    phone = payload.get("phone")
    garment_type = payload.get("garmentType")
    status = payload.get("status")

    missing_fields = [
        field
        for field, value in (
            ("customerName", customer_name),
            ("phone", phone),
            ("garmentType", garment_type),
            ("status", status),
        )
        if not value
    ]

    if missing_fields:
        return json_response(
            "Missing required fields",
            errors={"fields": missing_fields},
            status_code=400,
        )

    service = DynamoDBService()

    if service.get_order(order_id) is None:
        return json_response(
            "Order not found",
            status_code=404,
        )

    service.update_order(
        order_id=order_id,
        customer_name=str(customer_name).strip(),
        phone=str(phone).strip(),
        garment_type=str(garment_type).strip(),
        status=str(status).strip(),
    )

    return json_response(
        "Order updated successfully",
    )

@orders_bp.delete("/<order_id>")
def delete_order(order_id: str) -> tuple[dict[str, object], int]:
    """Delete an order."""
    service = DynamoDBService()

    if service.get_order(order_id) is None:
        return json_response(
            "Order not found",
            status_code=404,
        )

    service.delete_order(order_id)

    return json_response(
        "Order deleted successfully",
    )