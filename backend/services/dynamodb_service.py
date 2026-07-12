"""Placeholder DynamoDB service for future table access and persistence workflows."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class DynamoDBService:
    """Hold a DynamoDB client for future inventory, order, and settings workflows."""

    def __init__(self, client: Any | None = None) -> None:
        self.client = client or create_boto3_client("dynamodb")
