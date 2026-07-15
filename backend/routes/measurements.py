"""Measurement routes."""

from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from flask import Blueprint, request

from services.measurement_service import MeasurementService
from utils.response import json_response

measurements_bp = Blueprint(
    "measurements",
    __name__,
    url_prefix="/measurements",
)


@measurements_bp.post("")
def create_measurement():
    payload = request.get_json(silent=True) or {}

    customer_name = payload.get("customerName")
    phone = payload.get("phone")
    garment_type = payload.get("garmentType")

    chest = str(payload.get("chest", ""))
    waist = str(payload.get("waist", ""))
    shoulder = str(payload.get("shoulder", ""))
    sleeve = str(payload.get("sleeve", ""))
    neck = str(payload.get("neck", ""))
    length = str(payload.get("length", ""))

    if not customer_name or not phone or not garment_type:
        return json_response(
            "Missing required fields",
            status_code=400,
        )

    measurement_id = str(uuid4())

    created_at = (
        datetime.now(timezone.utc)
        .isoformat()
        .replace("+00:00", "Z")
    )

    item = {
        "measurementId": {"S": measurement_id},
        "customerName": {"S": customer_name},
        "phone": {"S": phone},
        "garmentType": {"S": garment_type},
        "chest": {"S": chest},
        "waist": {"S": waist},
        "shoulder": {"S": shoulder},
        "sleeve": {"S": sleeve},
        "neck": {"S": neck},
        "length": {"S": length},
        "createdAt": {"S": created_at},
    }

    service = MeasurementService()
    service.create_measurement(item)

    return json_response(
        "Measurement created successfully",
        data={
            "measurementId": measurement_id,
        },
        status_code=201,
    )


@measurements_bp.get("")
def get_measurements():
    service = MeasurementService()

    items = service.get_measurements()

    measurements = []

    for item in items:
        measurements.append(
            {
                "measurementId": item["measurementId"]["S"],
                "customerName": item["customerName"]["S"],
                "phone": item["phone"]["S"],
                "garmentType": item["garmentType"]["S"],
                "chest": item.get("chest", {}).get("S", ""),
                "waist": item.get("waist", {}).get("S", ""),
                "shoulder": item.get("shoulder", {}).get("S", ""),
                "sleeve": item.get("sleeve", {}).get("S", ""),
                "neck": item.get("neck", {}).get("S", ""),
                "length": item.get("length", {}).get("S", ""),
                "createdAt": item["createdAt"]["S"],
            }
        )

    measurements.sort(
        key=lambda x: x["createdAt"],
        reverse=True,
    )

    return json_response(
        "Measurements retrieved successfully",
        data=measurements,
    )


@measurements_bp.get("/<measurement_id>")
def get_measurement(measurement_id: str):
    service = MeasurementService()

    item = service.get_measurement(measurement_id)

    if item is None:
        return json_response(
            "Measurement not found",
            status_code=404,
        )

    measurement = {
        "measurementId": item["measurementId"]["S"],
        "customerName": item["customerName"]["S"],
        "phone": item["phone"]["S"],
        "garmentType": item["garmentType"]["S"],
        "chest": item.get("chest", {}).get("S", ""),
        "waist": item.get("waist", {}).get("S", ""),
        "shoulder": item.get("shoulder", {}).get("S", ""),
        "sleeve": item.get("sleeve", {}).get("S", ""),
        "neck": item.get("neck", {}).get("S", ""),
        "length": item.get("length", {}).get("S", ""),
        "createdAt": item["createdAt"]["S"],
    }

    return json_response(
        "Measurement retrieved successfully",
        data=measurement,
    )


@measurements_bp.put("/<measurement_id>")
def update_measurement(measurement_id: str):
    payload = request.get_json(silent=True) or {}

    service = MeasurementService()

    if service.get_measurement(measurement_id) is None:
        return json_response(
            "Measurement not found",
            status_code=404,
        )

    service.update_measurement(
        measurement_id=measurement_id,
        customer_name=payload.get("customerName", ""),
        phone=payload.get("phone", ""),
        garment_type=payload.get("garmentType", ""),
        chest=str(payload.get("chest", "")),
        waist=str(payload.get("waist", "")),
        shoulder=str(payload.get("shoulder", "")),
        sleeve=str(payload.get("sleeve", "")),
        neck=str(payload.get("neck", "")),
        length=str(payload.get("length", "")),
    )

    return json_response(
        "Measurement updated successfully",
    )


@measurements_bp.delete("/<measurement_id>")
def delete_measurement(measurement_id: str):
    service = MeasurementService()

    if service.get_measurement(measurement_id) is None:
        return json_response(
            "Measurement not found",
            status_code=404,
        )

    service.delete_measurement(measurement_id)

    return json_response(
        "Measurement deleted successfully",
    )