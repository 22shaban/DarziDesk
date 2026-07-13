"""Placeholder DynamoDB service for future table access workflows."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class DynamoDBService:
    """Hold the DynamoDB client and Orders table name for future persistence."""

    def __init__(self, client: Any | None = None, table_name: str = "Orders") -> None:
        self.client = client or create_boto3_client("dynamodb")
        self.table_name = table_name

    def put_order(self, item: dict[str, dict[str, str]]) -> Any:
        """Insert a new order into the Orders table."""
        return self.client.put_item(
            TableName=self.table_name,
            Item=item,
        )

    def get_orders(self) -> list[dict[str, Any]]:
        """Return all orders from the Orders table."""
        response = self.client.scan(
            TableName=self.table_name,
        )
        return response.get("Items", [])

    def get_order(self, order_id: str) -> dict[str, Any] | None:
        """Return a single order by ID."""
        response = self.client.get_item(
            TableName=self.table_name,
            Key={
                "orderId": {"S": order_id},
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
    ) -> Any:
        """Update an existing order."""
        return self.client.update_item(
            TableName=self.table_name,
            Key={
                "orderId": {"S": order_id},
            },
            UpdateExpression="""
                SET customerName = :customerName,
                    phone = :phone,
                    garmentType = :garmentType,
                    #status = :status
            """,
            ExpressionAttributeNames={
                "#status": "status",
            },
            ExpressionAttributeValues={
                ":customerName": {"S": customer_name},
                ":phone": {"S": phone},
                ":garmentType": {"S": garment_type},
                ":status": {"S": status},
            },
        )

    def delete_order(self, order_id: str) -> Any:
        """Delete an order by ID."""
        return self.client.delete_item(
            TableName=self.table_name,
            Key={
                "orderId": {"S": order_id},
            },
        )