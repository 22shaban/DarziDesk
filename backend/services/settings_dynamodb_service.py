"""DynamoDB service for Shop Settings."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class SettingsDynamoDBService:
    """DynamoDB helper for Shop Settings."""

    def __init__(
        self,
        client: Any |None = None,
        table_name: str = "darzidesk-settings",
    ) -> None:
        self.client = client or create_boto3_client("dynamodb")
        self.table_name = table_name

    def get_settings(self) -> dict[str, Any] | None:

        response = self.client.get_item(
            TableName=self.table_name,
            Key={
                "settingId": {
                    "S": "SHOP",
                },
            },
        )

        return response.get("Item")

    def update_settings(
        self,
        shop_name: str,
        owner_name: str,
        phone: str,
        email: str,
        address: str,
        logo_url: str,
    ) -> Any:

        return self.client.update_item(
            TableName=self.table_name,
            Key={
                "settingId": {
                    "S": "SHOP",
                },
            },
            UpdateExpression="""
                SET
                shopName = :shopName,
                ownerName = :ownerName,
                phone = :phone,
                email = :email,
                address = :address,
                logoUrl = :logoUrl
            """,
            ExpressionAttributeValues={
                ":shopName": {
                    "S": shop_name,
                },
                ":ownerName": {
                    "S": owner_name,
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
                ":logoUrl": {
                    "S": logo_url,
                },
            },
        )