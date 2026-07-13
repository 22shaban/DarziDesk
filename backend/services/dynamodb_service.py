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