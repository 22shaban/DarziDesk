"""Settings service."""

from __future__ import annotations

from services.aws_client import get_dynamodb_table


class SettingsService:
    """Service for shop settings."""

    def __init__(self) -> None:
        self.table = get_dynamodb_table("darzidesk-settings")

    def get_settings(self) -> dict:
        response = self.table.get_item(
            Key={
                "settingId": "SHOP",
            }
        )

        return response.get("Item", {})

    def update_settings(self, data: dict) -> dict:
        item = self.get_settings()

        item.update(data)

        self.table.put_item(Item=item)

        return item