"""Measurement DynamoDB service."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class MeasurementService:
    """Service for the Measurements table."""

    def __init__(
        self,
        client: Any | None = None,
        table_name: str = "Measurements",
    ) -> None:
        self.client = client or create_boto3_client("dynamodb")
        self.table_name = table_name


    def get_measurements(self) -> list[dict[str, Any]]:
        response = self.client.scan(
            TableName=self.table_name,
        )

        return response.get("Items", [])


    def get_measurement(
        self,
        measurement_id: str,
    ) -> dict[str, Any] | None:

        response = self.client.get_item(
            TableName=self.table_name,
            Key={
                "measurementId": {
                    "S": measurement_id,
                }
            },
        )

        return response.get("Item")


    def create_measurement(
        self,
        item: dict[str, Any],
    ) -> Any:

        return self.client.put_item(
            TableName=self.table_name,
            Item=item,
        )


    def update_measurement(
        self,
        measurement_id: str,
        customer_name: str,
        phone: str,
        garment_type: str,
        chest: str,
        waist: str,
        shoulder: str,
        sleeve: str,
        neck: str,
        length: str,
        customer_notes: str,
    ) -> Any:

        return self.client.update_item(
            TableName=self.table_name,

            Key={
                "measurementId": {
                    "S": measurement_id,
                }
            },

            UpdateExpression="""
                SET customerName=:customerName,
                    phone=:phone,
                    garmentType=:garmentType,
                    chest=:chest,
                    waist=:waist,
                    shoulder=:shoulder,
                    sleeve=:sleeve,
                    neck=:neck,
                    #length=:length,
                    customerNotes=:customerNotes
            """,

            ExpressionAttributeNames={
                "#length": "length",
            },

            ExpressionAttributeValues={

                ":customerName": {
                    "S": customer_name
                },

                ":phone": {
                    "S": phone
                },

                ":garmentType": {
                    "S": garment_type
                },

                ":chest": {
                    "S": chest
                },

                ":waist": {
                    "S": waist
                },

                ":shoulder": {
                    "S": shoulder
                },

                ":sleeve": {
                    "S": sleeve
                },

                ":neck": {
                    "S": neck
                },

                ":length": {
                    "S": length
                },

                ":customerNotes": {
                    "S": customer_notes
                },

            },
        )


    def delete_measurement(
        self,
        measurement_id: str,
    ) -> Any:

        return self.client.delete_item(
            TableName=self.table_name,

            Key={
                "measurementId": {
                    "S": measurement_id,
                }
            },
        )