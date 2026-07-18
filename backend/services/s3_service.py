"""Amazon S3 service."""

from __future__ import annotations

import uuid
from typing import Any

from services.aws_client import create_boto3_client


class S3Service:
    """Amazon S3 helper service."""

    def __init__(
        self,
        client: Any | None = None,
        bucket_name: str = "darzidesk-shop-assets",
    ) -> None:
        self.client = client or create_boto3_client("s3")
        self.bucket_name = bucket_name

    def upload_logo(self, file) -> str:
        print("STEP 1")

        extension = file.filename.rsplit(".", 1)[1].lower()

        filename = f"logos/{uuid.uuid4()}.{extension}"

        print("STEP 2")

        self.client.upload_fileobj(
            file,
            self.bucket_name,
            filename,
            ExtraArgs={
                "ContentType": file.content_type,
            },
        )

        print("STEP 3")

        return (
            f"https://{self.bucket_name}.s3.ap-south-1.amazonaws.com/{filename}"
        )
