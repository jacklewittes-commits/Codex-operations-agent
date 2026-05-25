---
name: weekly-logistics
description: plan weekly field-experiment logistics from natural-language PM context and produce the standard formatted Google Sheet in the designated Google Drive folder. use when a PM describes next week's experiment, team, vehicles, trips, rooms, lodging, or asks to generate/revise the weekly logistics spreadsheet.
---

# Weekly Experiment Logistics Skill

## Product contract
The primary product is a formatted Google Sheet in the designated Drive folder. The PM should never be asked to write JSON. Internally, create a structured `weekly_plan` object only for validation and rendering.

## Required references
- Read `pm_intake.md` when collecting natural-language PM context.
- Read `planning_rules.md` when building or revising the logistics plan.
- Read `output_contract.md` before generating or reporting the sheet.
- Read `review_checklist.md` before returning the PM-facing completion message.
- Use `../../schemas/weekly_plan.schema.json` as the internal renderer payload shape.
- Use `../../integrations/google_sheets/webhook_client.py` to call the deployed Google Sheets renderer when a webhook URL is configured.

## Core workflow
1. Collect PM context naturally: week, site, experiment days, attendees, vehicles, lodging, and special trips.
2. Ask only for blocking missing information. Convert non-blocking gaps into assumptions or review flags.
3. Build the internal `weekly_plan` payload.
4. Validate hard constraints: vehicle capacity, trailer license, rental driver permission, trucks, room capacity, gender-separated lodging, required roles.
5. Prepare a draft renderer payload and ask for/receive PM approval before publishing to Drive.
6. After PM approval, render the Google Sheet using the Apps Script renderer into the designated Drive folder only.
7. Return the Sheet URL, assumptions, unresolved flags, and a concise PM review checklist.
8. For PM revisions, update the internal plan, revalidate, and regenerate/update the Sheet only with PM approval.

## Data handling
- Always respond to the PM in English.
- Preserve Hebrew names, room names, vehicle names, and locations exactly.
- Never invent people, vehicles, rooms, vendors, or site rules.
- If a repository data file is missing or malformed, report the exact file and continue only with explicit PM confirmation.

## Google Sheets renderer
The current renderer is stored under `integrations/google_sheets/`. It creates the operational tabs: `Week Setup`, `Vehicle Plan`, `איושים`, `שיבוצי לינה`, and `צוות`. The renderer payload `title` must follow `aa-bb.mm_plan` and the Apps Script must publish only to folder ID `1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV` after PM approval.

To create a sheet from a prepared payload:

```bash
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/.../exec" \
python integrations/google_sheets/webhook_client.py --input examples/weekly_plan_example.json
```

If the webhook is unavailable, produce and validate the `weekly_plan` payload and explain that renderer deployment/configuration is needed before the Google Sheet can be uploaded.

## Revision behavior
When the PM asks for changes, do not restart intake. Identify the changed field or assignment, apply it, check for downstream conflicts, and regenerate/update the sheet. Report only the new link/status and any changed flags.
