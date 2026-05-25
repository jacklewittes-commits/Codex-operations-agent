#!/usr/bin/env python3
"""Lightweight weekly_plan JSON validator.

This intentionally avoids third-party dependencies. It checks the renderer's minimum required fields; use jsonschema in CI if available for full schema validation.
"""
from __future__ import annotations
import json, sys
from pathlib import Path

REQUIRED = ["title", "weekLabel", "days"]

def validate(payload: dict) -> list[str]:
    errors=[]
    for key in REQUIRED:
        if key not in payload or payload[key] in (None, "", []):
            errors.append(f"missing required field: {key}")
    if "days" in payload and not isinstance(payload["days"], list):
        errors.append("days must be a list")
    return errors

def main(path: str) -> int:
    payload=json.loads(Path(path).read_text(encoding="utf-8"))
    errors=validate(payload)
    if errors:
        for e in errors: print(e, file=sys.stderr)
        return 1
    print("weekly_plan payload passes basic validation")
    return 0

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: python planner/validator.py path/to/weekly_plan.json", file=sys.stderr)
        raise SystemExit(2)
    raise SystemExit(main(sys.argv[1]))
