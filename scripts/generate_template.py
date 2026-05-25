#!/usr/bin/env python3
"""Generate a blank weekly logistics input template."""
import argparse
from pathlib import Path
from weekly_plan import generate_input_template


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="outputs/weekly_input_template.xlsx")
    args = parser.parse_args()
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    generate_input_template(str(output))


if __name__ == "__main__":
    main()
