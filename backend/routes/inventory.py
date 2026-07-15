"""Inventory routes."""

from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from flask import Blueprint, request

from services.dynamodb_service import DynamoDBService
from utils.response import json_response

inventory_bp = Blueprint(
    "inventory",
    __name__,
    url_prefix="/inventory",
)


@inventory_bp.post("")
def create_inventory():
    payload = request.get_json(silent=True) or {}

    fabric_name = payload.get("fabricName")
    category = payload.get("category")
    unit = payload.get("unit")
    quantity = payload.get("quantity")
    cost_price = payload.get("costPrice")
    selling_price = payload.get("sellingPrice")
    supplier = payload.get("supplier")
    status = payload.get("status")

    missing_fields = [
        field
        for field, value in (
            ("fabricName", fabric_name),
            ("category", category),
            ("unit", unit),
            ("quantity", quantity),
            ("costPrice", cost_price),
            ("sellingPrice", selling_price),
            ("supplier", supplier),
            ("status", status),
        )
        if value in (None, "")
    ]

    if missing_fields:
        return json_response(
            "Missing required fields",
            errors={"fields": missing_fields},
            status_code=400,
        )

    inventory_id = str(uuid4())

    created_at = (
        datetime.now(timezone.utc)
        .isoformat()
        .replace("+00:00", "Z")
    )

    item = {
        "inventoryId": {"S": inventory_id},
        "fabricName": {"S": str(fabric_name)},
        "category": {"S": str(category)},
        "unit": {"S": str(unit)},
        "quantity": {"N": str(quantity)},
        "costPrice": {"N": str(cost_price)},
        "sellingPrice": {"N": str(selling_price)},
        "supplier": {"S": str(supplier)},
        "status": {"S": str(status)},
        "createdAt": {"S": created_at},
    }

    service = DynamoDBService()

    service.put_inventory(item)

    return json_response(
        "Inventory item created successfully",
        data={"inventoryId": inventory_id},
        status_code=201,
    )


@inventory_bp.get("")
def get_inventory():
    service = DynamoDBService()

    items = service.get_inventory()

    inventory = []

    for item in items:
        inventory.append(
            {
                "inventoryId": item["inventoryId"]["S"],
                "fabricName": item["fabricName"]["S"],
                "category": item["category"]["S"],
                "unit": item["unit"]["S"],
                "quantity": int(item["quantity"]["N"]),
                "costPrice": float(item["costPrice"]["N"]),
                "sellingPrice": float(item["sellingPrice"]["N"]),
                "supplier": item["supplier"]["S"],
                "status": item["status"]["S"],
                "createdAt": item["createdAt"]["S"],
            }
        )

    inventory.sort(
        key=lambda x: x["createdAt"],
        reverse=True,
    )

    return json_response(
        "Inventory retrieved successfully",
        data=inventory,
    )
@inventory_bp.put("/<inventory_id>")
def update_inventory(inventory_id):
    payload = request.get_json(silent=True) or {}

    service = DynamoDBService()

    service.update_inventory(
        inventory_id=inventory_id,
        fabric_name=payload["fabricName"],
        category=payload["category"],
        unit=payload["unit"],
        quantity=payload["quantity"],
        cost_price=payload["costPrice"],
        selling_price=payload["sellingPrice"],
        supplier=payload["supplier"],
        status=payload["status"],
    )

    return json_response(
        "Inventory updated successfully",
    )