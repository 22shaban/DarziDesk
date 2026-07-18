"""Amazon SES service."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class SESService:
    """Amazon SES helper service."""

    def __init__(
        self,
        client: Any | None = None,
        sender_email: str = "shabanshaikhit@gmail.com",
    ) -> None:
        self.client = client or create_boto3_client("ses")
        self.sender_email = sender_email

    def send_email(
        self,
        to_email: str,
        subject: str,
        body: str,
    ) -> None:
        """Send a plain text email using Amazon SES."""

        self.client.send_email(
            Source=self.sender_email,
            Destination={
                "ToAddresses": [
                    to_email,
                ],
            },
            Message={
                "Subject": {
                    "Data": subject,
                },
                "Body": {
                    "Text": {
                        "Data": body,
                    },
                },
            },
        )