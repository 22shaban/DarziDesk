"""Employee routes."""

from __future__ import annotations

from flask import Blueprint

from services.dynamodb_service import DynamoDBService
from utils.response import json_response

employees_bp = Blueprint(
    "employees",
    __name__,
    url_prefix="/employees",
)


@employees_bp.get("")
def get_employees():
    service = DynamoDBService()

    items = service.get_employees()

    employees = []

    for item in items:
        employees.append(
            {
                "employeeId": item["employeeId"]["S"],
                "employeeName": item["employeeName"]["S"],
                "phone": item["phone"]["S"],
                "role": item["role"]["S"],
                "salary": int(item["salary"]["N"]),
                "status": item["status"]["S"],
            }
        )

    return json_response(
        "Employees fetched successfully",
        data=employees,
    )