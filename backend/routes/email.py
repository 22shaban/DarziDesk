from flask import Blueprint, request

from services.ses_service import SESService
from utils.response import json_response

email_bp = Blueprint("email", __name__)

ses_service = SESService()


@email_bp.post("/send-invoice")
def send_invoice():

    payload = request.get_json()

    customer_name = payload.get("customerName")
    customer_email = payload.get("customerEmail")
    invoice_id = payload.get("invoiceId")
    total_amount = payload.get("totalAmount")
    payment_status = payload.get("paymentStatus")
    shop_name = payload.get("shopName")

    subject = f"Invoice from {shop_name}"

    body = f"""
Dear {customer_name},

Thank you for choosing {shop_name}.

Invoice Details

Invoice ID:
{invoice_id}

Total Amount:
₹{total_amount}

Payment Status:
{payment_status}

Thank you for your business.

Regards,
{shop_name}
"""

    ses_service.send_email(
        to_email=customer_email,
        subject=subject,
        body=body,
    )

    return json_response(
        "Invoice email sent successfully.",
    )