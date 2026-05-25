#!/usr/bin/env python3
"""Naming helpers for weekly logistics plan payloads."""
from __future__ import annotations

from datetime import datetime


def sheet_title(start_date: str, end_date: str) -> str:
    """Return aa-bb.mm_plan from DD/MM/YY, DD/MM/YYYY, or ISO YYYY-MM-DD dates."""
    start = _parse_date(start_date)
    end = _parse_date(end_date)
    return f"{start.day:02d}-{end.day:02d}.{end.month:02d}_plan"


def _parse_date(value: str) -> datetime:
    for fmt in ("%d/%m/%y", "%d/%m/%Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(value, fmt)
        except ValueError:
            pass
    raise ValueError(f"Unsupported date format: {value!r}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("start_date")
    parser.add_argument("end_date")
    args = parser.parse_args()
    print(sheet_title(args.start_date, args.end_date))
