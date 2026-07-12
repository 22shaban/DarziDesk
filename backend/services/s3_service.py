"""Placeholder S3 service for future file and asset storage workflows."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class S3Service:
    """Hold an S3 client for future upload and backup workflows."""

    def __init__(self, client: Any | None = None) -> None:
        self.client = client or create_boto3_client("s3")
