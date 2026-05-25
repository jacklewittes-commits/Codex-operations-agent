#!/usr/bin/env python3
"""Create the weekly logistics Google Sheet through the deployed Apps Script web app.

Usage:
  GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/.../exec" \
    python integrations/google_sheets/webhook_client.py --input examples/weekly_plan_example.json
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path


def post_json(url: str, payload: dict) -> dict:
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            text = resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"renderer HTTP {exc.code}: {detail}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"renderer request failed: {exc}") from exc

    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"renderer returned non-JSON response: {text[:500]}") from exc


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Path to weekly_plan JSON payload")
    parser.add_argument("--url", default=os.environ.get("GOOGLE_SHEETS_WEBHOOK_URL"), help="Apps Script web app URL")
    args = parser.parse_args()

    if not args.url:
        print("Missing renderer URL. Set GOOGLE_SHEETS_WEBHOOK_URL or pass --url.", file=sys.stderr)
        return 2

    payload = json.loads(Path(args.input).read_text(encoding="utf-8"))
    result = post_json(args.url, payload)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result.get("status") == "ok" else 1


if __name__ == "__main__":
    raise SystemExit(main())
