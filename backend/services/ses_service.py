"""Placeholder SES service for future email notification workflows."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class SESService:
    """Hold an SES client for future message delivery workflows."""

    def __init__(self, client: Any | None = None) -> None:
        self.client = client or create_boto3_client("ses")
