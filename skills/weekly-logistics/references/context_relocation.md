# Context relocation notes

The original package had files under `data/*.csv` that contained skill-style instructions, markdown, or code-like content rather than tabular data. Those files should not be treated as source data.

Use this separation going forward:

- `skills/weekly-logistics/SKILL.md`: top-level workflow and agent behavior.
- `skills/weekly-logistics/pm_intake.md`: how to gather natural-language PM context.
- `skills/weekly-logistics/planning_rules.md`: planning rules for vehicles, rooms, staffing, trips, assumptions, and validation.
- `skills/weekly-logistics/output_contract.md`: required output: a formatted Google Sheet in the designated Drive folder, plus PM review summary.
- `skills/weekly-logistics/review_checklist.md`: what the PM should review after sheet creation.
- `skills/weekly-logistics/references/fleet_context.md`: vehicle-specific context, including Hebrew terms such as טנדר = pickup truck and נגרר = trailer, two pickups, two trailers, company cars, and weekly rentals.
- `skills/weekly-logistics/references/data_extraction_notes.md`: notes about how master data was extracted from historical weekly plans and what still needs verification.
- `data/*.csv`: structured master data only.
- `integrations/google_sheets/`: Apps Script renderer and webhook client used to create the operational Google Sheet.

Rule: if content tells the agent how to think or act, store it under the skill. If content is a factual table of people, vehicles, rooms, sites, or vendors, store it under `data/`.
