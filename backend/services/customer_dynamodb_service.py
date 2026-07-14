"""DynamoDB service for Customers."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class CustomerDynamoDBService:
    """DynamoDB helper for Customers table."""

    def __init__(
        self,
        client: Any | None = None,
        table_name: str = "Customers",
    ) -> None:
        self.client = client or create_boto3_client("dynamodb")
        self.table_name = table_name

    def put_customer(
        self,
        item: dict[str, dict[str, str]],
    ) -> Any:
        return self.client.put_item(
            TableName=self.table_name,
            Item=item,
        )

    def get_customers(
        self,
    ) -> list[dict[str, Any]]:
        response = self.client.scan(
            TableName=self.table_name,
        )

        return response.get("Items", [])

    def get_customer(
        self,
        customer_id: str,
    ) -> dict[str, Any] | None:

        response = self.client.get_item(
            TableName=self.table_name,
            Key={
                "customerId": {
                    "S": customer_id,
                },
            },
        )

        return response.get("Item")

    def update_customer(
        self,
        customer_id: str,
        customer_name: str,
        phone: str,
        email: str,
        address: str,
    ) -> Any:

        return self.client.update_item(
            TableName=self.table_name,
            Key={
                "customerId": {
                    "S": customer_id,
                },
            },
            UpdateExpression="""
                SET
                customerName = :customerName,
                phone = :phone,
                email = :email,
                address = :address
            """,
            ExpressionAttributeValues={
                ":customerName": {
                    "S": customer_name,
                },
                ":phone": {
                    "S": phone,
                },
                ":email": {
                    "S": email,
                },
                ":address": {
                    "S": address,
                },
            },
        )

    def delete_customer(
        self,
        customer_id: str,
    ) -> Any:

        return self.client.delete_item(
            TableName=self.table_name,
            Key={
                "customerId": {
                    "S": customer_id,
                },
            },
        )