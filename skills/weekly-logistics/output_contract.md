# Output Contract

## Primary artifact
The required output is a formatted Google Sheet in the designated Google Drive folder. The PM-facing deliverable is the sheet URL, not JSON.

## Sheet tabs
The current renderer creates these tabs when corresponding data exists:
- `Week Setup`
- `Vehicle Plan`
- `איושים`
- `שיבוצי לינה`
- `צוות`

## Internal plan object
The agent may internally produce a `weekly_plan` object that conforms to `schemas/weekly_plan.schema.json`. This object exists only to validate and render the sheet. Do not ask the PM to produce it.

## PM-facing completion message
When the sheet is created, respond with:
1. Google Sheet link.
2. Assumptions made.
3. Blocking issues, if any.
4. Review checklist summary.

## Failure behavior
If the sheet cannot be generated, report:
- Whether the failure was intake, validation, renderer, or Google/Drive deployment.
- The smallest set of information or configuration needed to proceed.
- Any partial plan that is safe to preserve.
