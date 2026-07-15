"""Employee routes."""

from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from flask import Blueprint, request

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
@employees_bp.post("")
def create_employee():
    payload = request.get_json(silent=True) or {}

    employee_name = payload.get("employeeName")
    phone = payload.get("phone")
    role = payload.get("role")
    salary = payload.get("salary")
    status = payload.get("status")

    missing_fields = [
        field
        for field, value in (
            ("employeeName", employee_name),
            ("phone", phone),
            ("role", role),
            ("salary", salary),
            ("status", status),
        )
        if value in (None, "")
    ]

    if missing_fields:
      return json_response(
    "Missing required fields",
    status_code=400,
    data={"missing": missing_fields},
)

    employee_id = str(uuid4())

    service = DynamoDBService()

    service.put_employee(
        {
            "employeeId": {"S": employee_id},
            "employeeName": {"S": employee_name},
            "phone": {"S": phone},
            "role": {"S": role},
            "salary": {"N": str(salary)},
            "status": {"S": status},
            "createdAt": {
                "S": datetime.now(timezone.utc).isoformat(),
            },
        }
    )

    return json_response(
    "Employee created successfully",
    status_code=201,
    data={
        "employeeId": employee_id,
    },
)