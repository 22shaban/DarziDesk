"""DynamoDB service."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class DynamoDBService:
    """DynamoDB helper for Orders table."""

    def __init__(
        self,
        client: Any | None = None,
        table_name: str = "Orders",
    ) -> None:
        self.client = client or create_boto3_client("dynamodb")
        self.table_name = table_name

    def put_order(self, item: dict[str, dict[str, str]]) -> Any:
        return self.client.put_item(
            TableName=self.table_name,
            Item=item,
        )

    def get_orders(self) -> list[dict[str, Any]]:
        response = self.client.scan(
            TableName=self.table_name,
        )

        return response.get("Items", [])

    def get_order(
        self,
        order_id: str,
    ) -> dict[str, Any] | None:

        response = self.client.get_item(
            TableName=self.table_name,
            Key={
                "orderId": {
                    "S": order_id,
                },
            },
        )

        return response.get("Item")

    def update_order(
        self,
        order_id: str,
        customer_name: str,
        phone: str,
        garment_type: str,
        status: str,
        delivery_date: str,
        assigned_tailor: str,
        advance: str,
        remaining: str,
    ) -> Any:

        return self.client.update_item(
            TableName=self.table_name,
            Key={
                "orderId": {
                    "S": order_id,
                },
            },
            UpdateExpression="""
                SET
                customerName = :customerName,
                phone = :phone,
                garmentType = :garmentType,
                #status = :status,
                deliveryDate = :deliveryDate,
                assignedTailor = :assignedTailor,
                advance = :advance,
                remaining = :remaining
            """,
            ExpressionAttributeNames={
                "#status": "status",
            },
            ExpressionAttributeValues={
                ":customerName": {
                    "S": customer_name,
                },
                ":phone": {
                    "S": phone,
                },
                ":garmentType": {
                    "S": garment_type,
                },
                ":status": {
                    "S": status,
                },
                ":deliveryDate": {
                    "S": delivery_date,
                },
                ":assignedTailor": {
                    "S": assigned_tailor,
                },
                ":advance": {
                    "S": advance,
                },
                ":remaining": {
                    "S": remaining,
                },
            },
        )

    def delete_order(
        self,
        order_id: str,
    ) -> Any:

        return self.client.delete_item(
            TableName=self.table_name,
            Key={
                "orderId": {
                    "S": order_id,
                },
            },
        )