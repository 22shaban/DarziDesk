"""Shared boto3 session and client helpers for future AWS integrations."""

from __future__ import annotations

from typing import Any

import boto3
from boto3.session import Session


def get_boto3_session(
    region_name: str | None = None,
    aws_access_key_id: str | None = None,
    aws_secret_access_key: str | None = None,
) -> Session:
    """Create a boto3 session without performing any AWS operations."""
    session_kwargs: dict[str, str] = {}

    if region_name:
        session_kwargs["region_name"] = region_name

    if aws_access_key_id:
        session_kwargs["aws_access_key_id"] = aws_access_key_id

    if aws_secret_access_key:
        session_kwargs["aws_secret_access_key"] = aws_secret_access_key

    return boto3.session.Session(**session_kwargs)


def create_boto3_client(
    service_name: str,
    session: Session | None = None,
    region_name: str | None = None,
    aws_access_key_id: str | None = None,
    aws_secret_access_key: str | None = None,
) -> Any:
    """Create a service client placeholder for future AWS service modules."""
    active_session = session or get_boto3_session(
        region_name=region_name,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )
    return active_session.client(service_name)
