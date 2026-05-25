# Experiment Logistics Agent

PM-facing agent for weekly field experiment logistics. The PM provides natural-language context; the agent validates staffing, vehicles, trips, and rooms, then creates the standard formatted Google Sheet in the designated Google Drive folder.

## Current structure
- `skills/weekly-logistics/` — Codex/ChatGPT skill instructions and references.
- `schemas/weekly_plan.schema.json` — internal payload schema for the sheet renderer.
- `integrations/google_sheets/` — Apps Script renderer and webhook client.
- `planner/` — placeholders for deterministic parsing, planning, validation, and revision modules.
- `data/` — master team/vehicle/location/lodging data.
- `examples/weekly_plan_example.json` — sample renderer payload.

The PM should not interact with JSON. JSON exists only between the agent and renderer.
