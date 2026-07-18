"""Shared boto3 session and client helpers for AWS integrations."""

from __future__ import annotations

import os
from typing import Any

import boto3
from boto3.session import Session


DEFAULT_REGION = os.getenv("AWS_REGION") or os.getenv("AWS_DEFAULT_REGION") or "ap-south-1"


def get_boto3_session(
    region_name: str | None = None,
    aws_access_key_id: str | None = None,
    aws_secret_access_key: str | None = None,
) -> Session:
    """Create a boto3 session."""

    return boto3.Session(
        region_name=region_name or DEFAULT_REGION,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )


def create_boto3_client(
    service_name: str,
    session: Session | None = None,
    region_name: str | None = None,
    aws_access_key_id: str | None = None,
    aws_secret_access_key: str | None = None,
) -> Any:
    """Create a boto3 client."""

    active_session = session or get_boto3_session(
        region_name=region_name,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )

    return active_session.client(
        service_name,
        region_name=region_name or DEFAULT_REGION,
    )