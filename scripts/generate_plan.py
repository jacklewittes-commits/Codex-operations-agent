#!/usr/bin/env python3
"""Generate a formatted weekly logistics plan from a JSON week_data file."""
import argparse
import json
from pathlib import Path
from weekly_plan import generate_weekly_plan


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Path to JSON week_data file")
    parser.add_argument("--output", default="outputs/weekly_plan.xlsx")
    args = parser.parse_args()

    with open(args.input, "r", encoding="utf-8") as f:
        week_data = json.load(f)

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    generate_weekly_plan(week_data, str(output))


if __name__ == "__main__":
    main()
