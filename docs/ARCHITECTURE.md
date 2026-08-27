# Codex Logistics Agent Architecture

## Product
The PM-facing product is a native Google Sheet. Codex may use JSON, schemas, scripts, and Apps Script internally, but the PM should receive links, assumptions, blockers, and review flags.

## Main Flow
PM conversation -> intake -> internal weekly plan -> validation -> Google Sheet copy/fill or renderer -> PM approval -> Drive publication -> revisions.

## Canonical Output Path
For weekly plans, prefer copying the canonical weekly workbook and clearing/filling the existing tabs while preserving formatting. Use the Apps Script renderer when the canonical copy/fill workflow is unavailable or a legacy generated sheet is requested.

Monthly calendars use the Apps Script `monthCalendar` renderer.

## Module Responsibilities
- `skills/weekly-logistics/`: PM intake, planning rules, output contract, and review behavior.
- `skills/food-management/`: weekly food sub-skill used by weekly logistics.
- `skills/monthly-operations-calendar/`: monthly calendar Sheet creation.
- `data/`: factual CSV master data only.
- `planner/validator.py`: operational validation. Currently basic; should be expanded.
- `planner/intake_parser.py`: future deterministic extraction from PM text into plan facts.
- `planner/revision_engine.py`: future deterministic plan mutation and conflict checking.
- `integrations/google_sheets/`: Apps Script renderer and webhook client.

## Drive Policy
Publish only after PM approval. The approved folders are:
- Weekly: https://drive.google.com/drive/folders/10wE1ivttA14x0GqbXQWSh00NRd8gJdM_
- Monthly: https://drive.google.com/drive/folders/1AebF43GTu4UAJR_MJAdzcT4_Z0jlbCKQ
- Tests: https://drive.google.com/drive/folders/1uqKGYKgwvTk1ipW7slqT4NWTjNoF7jAf

The agent must not list, search, browse, or inspect Drive unless the PM explicitly grants task-specific permission.

## Data Boundaries
CSV files contain facts, not workflow instructions. Skills contain operational logic. Apps Script renders Sheets and should not become the planning engine.

## Current Gaps
- Intake parsing is still conversational, not deterministic.
- Revision behavior exists as skill instruction, not as a coded engine.
- Validation must expand to vehicle, lodging, role, and food constraints.
- Canonical workbook copy/fill needs implementation parity with the renderer.

## Long-Term Vision

This is evolving into an operational logistics orchestration agent for field experiments.

Potential future capabilities:

- vendor coordination
- lodging booking
- food ordering
- multi-week planning
- vehicle optimization
- staffing balancing
- route planning
- conflict simulation
- automated operational alerts

The Google Sheet remains the central operational interface for humans.
