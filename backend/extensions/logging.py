"""Logging configuration for the DarziDesk backend runtime and diagnostics."""

from __future__ import annotations

import logging
from pathlib import Path

from flask import Flask


def configure_logging(app: Flask) -> None:
    """Configure console and file logging for future production diagnostics."""
    logs_dir = Path(app.config["LOG_DIR"])
    logs_dir.mkdir(parents=True, exist_ok=True)

    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    console_handler.setLevel(app.config["LOG_LEVEL"])

    file_handler = logging.FileHandler(logs_dir / "darzidesk.log", encoding="utf-8")
    file_handler.setFormatter(formatter)
    file_handler.setLevel(app.config["LOG_LEVEL"])

    app.logger.handlers.clear()
    app.logger.setLevel(app.config["LOG_LEVEL"])
    app.logger.propagate = False
    app.logger.addHandler(console_handler)
    app.logger.addHandler(file_handler)
