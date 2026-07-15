"""Invoice routes."""

from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from flask import Blueprint, request

from services.dynamodb_service import DynamoDBService
from utils.response import json_response

invoices_bp = Blueprint(
    "invoices",
    __name__,
    url_prefix="/invoices",
)


@invoices_bp.get("")
def get_invoices():
    service = DynamoDBService()

    items = service.get_invoices()

    invoices = []

    for item in items:
        invoices.append(
            {
                "invoiceId": item["invoiceId"]["S"],
                "orderId": item["orderId"]["S"],
                "customerName": item["customerName"]["S"],
                "totalAmount": float(item["totalAmount"]["N"]),
                "advancePaid": float(item["advancePaid"]["N"]),
                "remainingAmount": float(item["remainingAmount"]["N"]),
                "paymentStatus": item["paymentStatus"]["S"],
            }
        )

    return json_response(
        "Invoices fetched successfully",
        data=invoices,
    )


@invoices_bp.post("")
def create_invoice():
    payload = request.get_json(silent=True) or {}

    order_id = payload.get("orderId")
    customer_name = payload.get("customerName")
    total_amount = payload.get("totalAmount")
    advance_paid = payload.get("advancePaid")
    remaining_amount = payload.get("remainingAmount")
    payment_status = payload.get("paymentStatus")

    missing_fields = [
        field
        for field, value in (
            ("orderId", order_id),
            ("customerName", customer_name),
            ("totalAmount", total_amount),
            ("advancePaid", advance_paid),
            ("remainingAmount", remaining_amount),
            ("paymentStatus", payment_status),
        )
        if value in (None, "")
    ]

    if missing_fields:
        return json_response(
            "Missing required fields",
            status_code=400,
            data={"missing": missing_fields},
        )

    invoice_id = str(uuid4())

    service = DynamoDBService()

    service.put_invoice(
        {
            "invoiceId": {"S": invoice_id},
            "orderId": {"S": order_id},
            "customerName": {"S": customer_name},
            "totalAmount": {"N": str(total_amount)},
            "advancePaid": {"N": str(advance_paid)},
            "remainingAmount": {"N": str(remaining_amount)},
            "paymentStatus": {"S": payment_status},
            "createdAt": {
                "S": datetime.now(timezone.utc).isoformat(),
            },
        }
    )

    return json_response(
        "Invoice created successfully",
        status_code=201,
        data={
            "invoiceId": invoice_id,
        },
    )
@invoices_bp.put("/<invoice_id>")
def update_invoice(invoice_id):
    payload = request.get_json(silent=True) or {}

    service = DynamoDBService()

    service.update_invoice(
        invoice_id=invoice_id,
        order_id=payload["orderId"],
        customer_name=payload["customerName"],
        total_amount=payload["totalAmount"],
        advance_paid=payload["advancePaid"],
        remaining_amount=payload["remainingAmount"],
        payment_status=payload["paymentStatus"],
    )

    return json_response(
        "Invoice updated successfully",
    )
@invoices_bp.delete("/<invoice_id>")
def delete_invoice(invoice_id):
    service = DynamoDBService()

    service.delete_invoice(invoice_id)

    return json_response(
        "Invoice deleted successfully",
    )