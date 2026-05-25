# Codex Operations Agent

PM-facing weekly experiment logistics planner for Flight Test operations. The PM describes the week in natural language; the agent turns that context into a validated logistics plan and generates the standard operational Google Sheet.

The Google Sheet is the primary deliverable. JSON exists only as internal plumbing between the agent, validator, and renderer.

## What It Does

- Intake PM context conversationally.
- Ask only blocking follow-up questions.
- Plan staffing, vehicles, trips, and lodging.
- Validate operational constraints before publishing.
- Render the standardized Google Sheet through the Google Apps Script integration.
- Publish only after PM approval to the approved Drive destination.
- Support iterative PM revisions without exposing internal JSON.

## Publishing Boundary

Generated sheets are published only after PM approval.

The approved Drive folder is:

- Folder URL: https://drive.google.com/drive/folders/1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV
- Folder ID: `1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV`

The agent must not browse, inspect, list, or search Drive unless the PM explicitly grants permission for a specific task. The folder is treated only as the final publishing destination.

Sheet naming convention:

```text
aa-bb.mm_plan
```

Example: `01-03.06_plan`

## Repository Structure

- `AGENTS.md` - repo-level operating instructions.
- `skills/weekly-logistics/` - Codex skill instructions, planning rules, intake behavior, output contract, and references.
- `schemas/weekly_plan.schema.json` - internal renderer payload schema.
- `planner/` - validation, naming helpers, and future deterministic planning modules.
- `integrations/google_sheets/` - Apps Script renderer, webhook client, and deployment notes.
- `data/` - structured factual datasets for members, vehicles, sites, and hostels.
- `examples/` - sample weekly plan payloads for development and testing.
- `docs/` - architecture and usage notes.

## Data And Logic Separation

- `skills/` contains operational reasoning and planning behavior.
- `data/` contains factual structured datasets only.
- `integrations/` contains rendering and publishing code.

CSV files should not contain planning instructions. Apps Script should render Sheets, not encode planning logic.

## Current Status

Current maturity: `v0.1.0`

Working:

- Codex-compatible repository structure.
- Initial operational datasets.
- Google Sheets renderer integration.
- Drive publishing policy and file naming helper.
- Baseline payload validation.

Known gaps:

- Stable deterministic planning engine.
- Stronger schema enforcement.
- Full alignment between local Excel generation and the Apps Script renderer.
- Production-grade revision/conflict handling.
- Vendor/contact integrations.

## Source Of Truth

The Apps Script renderer payload schema is the canonical output path:

```text
weekly plan schema -> Apps Script renderer -> native Google Sheet
```

The local Excel generator currently diverges and should either be aligned with the schema or deprecated.

## Verification

From the repository root:

```bash
python3 planner/validator.py examples/weekly_plan_example.json
python3 planner/naming.py 01/06/26 03/06/26
```

To test the deployed renderer:

```bash
python3 integrations/google_sheets/webhook_client.py --input examples/weekly_plan_example.json
```

The webhook command requires `GOOGLE_SHEETS_WEBHOOK_URL` or `--url`.
