"""Central JSON response helpers for future backend endpoints and errors."""

from __future__ import annotations

from typing import Any


def json_response(
    message: str,
    data: Any | None = None,
    status_code: int = 200,
    errors: Any | None = None,
) -> tuple[dict[str, Any], int]:
    """Build a consistent JSON API payload and HTTP status tuple."""
    payload: dict[str, Any] = {"message": message, "status": status_code}

    if data is not None:
        payload["data"] = data

    if errors is not None:
        payload["errors"] = errors

    return payload, status_code
