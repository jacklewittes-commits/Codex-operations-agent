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
- Read `references/source_sheet_intake.md` when the PM provides a partial Google Drive file as input.
- Read `../food-management/SKILL.md` when the PM asks for food planning, meal quantities, catering, Aroma, BBQ, BBB, WhatsApp/email food orders, or special food requirements.
- Use `../../schemas/weekly_plan.schema.json` as the internal renderer payload shape.
- Use `../../integrations/google_sheets/webhook_client.py` to call the deployed Google Sheets renderer when a webhook URL is configured.

## Core workflow
1. Collect PM context from natural language, a partial source file, or both; always produce the same standard output Sheet.
2. Ask only for blocking missing information. Convert non-blocking gaps into assumptions or review flags.
3. Build the internal `weekly_plan` payload.
4. Validate hard constraints and PM operational planning checks: vehicle capacity, trailer license, rental driver permission, trucks, room capacity, gender-separated lodging, required roles, airstrip coordination, fuel sufficiency, equipment loading, rental/lodging handoffs, and PM checklist completeness.
5. Prepare a draft renderer payload and ask for/receive PM approval before publishing to Drive.
6. After PM approval, render the Google Sheet using the Apps Script renderer into the designated Drive folder only.
7. Return the Sheet URL, assumptions, unresolved flags, and the PM checklist items needing attention.
8. For PM revisions, update the internal plan, revalidate, and regenerate/update the Sheet only with PM approval.

## Data handling
- Always respond to the PM in English.
- Preserve Hebrew names, room names, vehicle names, and locations exactly.
- Never invent people, vehicles, rooms, vendors, or site rules.
- If a repository data file is missing or malformed, report the exact file and continue only with explicit PM confirmation.

## Google Sheets renderer
Use `output_contract.md` for PM-facing tab names and `references/publishing_policy.md` for file naming, approval, and Drive destination rules.

Use `integrations/google_sheets/webhook_client.py` when a webhook URL is configured. If the webhook is unavailable, produce and validate the `weekly_plan` payload and explain what renderer configuration is needed.

## Revision behavior
When the PM asks for changes, do not restart intake. Identify the changed field or assignment, apply it, check for downstream conflicts, and regenerate/update the sheet. Report only the new link/status and any changed flags.
