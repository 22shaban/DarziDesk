"""Customers routes."""

from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from flask import Blueprint, request

from services.customer_dynamodb_service import CustomerDynamoDBService
from utils.response import json_response

customers_bp = Blueprint(
    "customers",
    __name__,
    url_prefix="/customers",
)


@customers_bp.post("")
def create_customer():
    payload = request.get_json(silent=True) or {}

    customer_name = payload.get("customerName")
    phone = payload.get("phone")
    email = payload.get("email", "")
    address = payload.get("address", "")

    if not customer_name or not phone:
        return json_response(
            "Customer name and phone are required.",
            status_code=400,
        )

    customer_id = str(uuid4())

    created_at = (
        datetime.now(timezone.utc)
        .isoformat()
        .replace("+00:00", "Z")
    )

    item = {
        "customerId": {"S": customer_id},
        "customerName": {"S": customer_name},
        "phone": {"S": phone},
        "email": {"S": email},
        "address": {"S": address},
        "createdAt": {"S": created_at},
    }

    CustomerDynamoDBService().put_customer(item)

    return json_response(
        "Customer created successfully",
        data={
            "customerId": customer_id,
        },
        status_code=201,
    )


@customers_bp.get("")
def get_customers():
    items = CustomerDynamoDBService().get_customers()

    customers = []

    for item in items:
        customers.append(
            {
                "customerId": item["customerId"]["S"],
                "customerName": item["customerName"]["S"],
                "phone": item["phone"]["S"],
                "email": item.get("email", {}).get("S", ""),
                "address": item.get("address", {}).get("S", ""),
                "createdAt": item["createdAt"]["S"],
            }
        )

    customers.sort(
        key=lambda x: x["createdAt"],
        reverse=True,
    )

    return json_response(
        "Customers retrieved successfully",
        data=customers,
    )


@customers_bp.get("/<customer_id>")
def get_customer(customer_id):
    item = CustomerDynamoDBService().get_customer(customer_id)

    if item is None:
        return json_response(
            "Customer not found",
            status_code=404,
        )

    customer = {
        "customerId": item["customerId"]["S"],
        "customerName": item["customerName"]["S"],
        "phone": item["phone"]["S"],
        "email": item.get("email", {}).get("S", ""),
        "address": item.get("address", {}).get("S", ""),
        "createdAt": item["createdAt"]["S"],
    }

    return json_response(
        "Customer retrieved successfully",
        data=customer,
    )


@customers_bp.put("/<customer_id>")
def update_customer(customer_id):
    payload = request.get_json(silent=True) or {}

    customer_name = payload.get("customerName")
    phone = payload.get("phone")
    email = payload.get("email", "")
    address = payload.get("address", "")

    service = CustomerDynamoDBService()

    if service.get_customer(customer_id) is None:
        return json_response(
            "Customer not found",
            status_code=404,
        )

    service.update_customer(
        customer_id,
        customer_name,
        phone,
        email,
        address,
    )

    return json_response(
        "Customer updated successfully",
    )


@customers_bp.delete("/<customer_id>")
def delete_customer(customer_id):
    service = CustomerDynamoDBService()

    if service.get_customer(customer_id) is None:
        return json_response(
            "Customer not found",
            status_code=404,
        )

    service.delete_customer(customer_id)

    return json_response(
        "Customer deleted successfully",
    )