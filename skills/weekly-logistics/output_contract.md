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


## Drive publishing policy
Generated sheets are published only after PM approval. Until approval, the agent should treat all plans as drafts and should not access or write to Google Drive.

When the PM approves publication, use only this designated Drive folder:
- Folder URL: https://drive.google.com/drive/folders/1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV?usp=drive_link
- Folder ID: `1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV`

The agent must not browse, list, read from, or write to any other Drive location unless the PM explicitly grants permission in that conversation. Treat this folder only as the final publishing destination for approved weekly logistics sheets.

## File naming convention
Use the file title format `aa-bb.mm_plan`, where:
- `aa` = two-digit start day of month
- `bb` = two-digit end day of month
- `mm` = two-digit month

Examples:
- June 1-3 -> `01-03.06_plan`
- April 28-30 -> `28-30.04_plan`

Set the renderer payload `title` field to this exact file name. Keep the richer human-readable experiment/site description in `weekLabel`, not in the file name.

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
