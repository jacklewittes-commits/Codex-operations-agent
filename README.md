# Codex Operations Agent

PM-facing Codex agent for Flight Test weekly experiment logistics. The PM describes the week naturally; the agent builds, validates, revises, and publishes the standard Google Sheet.

The Google Sheet is the product. JSON, schemas, scripts, and renderer payloads are internal implementation details.

## Primary Outputs
- Weekly logistics Sheet: staffing, vehicles, lodging, food, and PM review flags.
- Monthly operations calendar Sheet.
- Weekly food planning inside the weekly Sheet, not as a standalone product.

## Approved Drive Folders
- Weekly plans: https://drive.google.com/drive/folders/10wE1ivttA14x0GqbXQWSh00NRd8gJdM_
- Monthly plans: https://drive.google.com/drive/folders/1AebF43GTu4UAJR_MJAdzcT4_Z0jlbCKQ
- Tests/dry runs: https://drive.google.com/drive/folders/1uqKGYKgwvTk1ipW7slqT4NWTjNoF7jAf

Do not browse, inspect, list, or search Drive unless the PM grants task-specific permission. These folders are final publishing destinations.

## Key Paths
- `AGENTS.md` - repo-level operating rules.
- `skills/weekly-logistics/` - weekly planning skill and references.
- `skills/food-management/` - weekly food sub-skill.
- `skills/monthly-operations-calendar/` - monthly calendar skill.
- `planner/` - validator, naming, intake, revision, and planning modules.
- `integrations/google_sheets/` - Apps Script renderer and webhook client.
- `data/` - factual CSV master data only.
- `docs/` - Codex-native architecture and usage docs.

## Verification
```bash
python3 planner/validator.py examples/weekly_plan_example.json
python3 planner/naming.py 01/06/26 03/06/26
```
