# Output Contract

## Primary Artifact
The required output is a formatted Google Sheet in the designated Google Drive folder. The PM-facing deliverable is the sheet URL, not JSON, local Apps Script files, or renderer/debug instructions.

## Standard Tabs
Use these PM-facing tabs when corresponding data exists:

- `איושים`
- `שיבוצי רכבים` as the base vehicle-assignment tab, typically hidden after generation
- `מעודכן שיבוצי רכבים` as the visible working vehicle tab
- `שיבוצי לינה`
- `הזמנות אוכל`

## Internal Payload
The agent may internally produce a `weekly_plan` object that conforms to `schemas/weekly_plan.schema.json`. Do not ask the PM to produce it.

- Use `foodOrders` when food planning is requested.
- Use `pmChecklist` for internal review and optional hidden support output when there are PM tasks to track before or during the experiment.
- Read `references/pm_checklist_tab.md` for checklist columns and row-generation rules.

## Publishing
Generated sheets are published only after PM approval.

- Read `references/publishing_policy.md` for the approved Drive folder and file naming convention.
- Do not browse, list, read from, or write to any other Drive location unless the PM explicitly grants permission in that conversation.

## Completion Message
When the sheet is created, respond with the Google Sheet link first. Add assumptions, blockers, or PM checklist items only when they are important for execution or the PM asks for more detail.

## Failure Behavior
If the sheet cannot be generated, report the failure type, the smallest set of information or configuration needed to proceed, and any partial plan that is safe to preserve.
