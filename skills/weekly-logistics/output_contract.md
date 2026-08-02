# Output Contract

## Primary Artifact
The required output is a formatted Google Sheet in the designated Google Drive folder. The PM-facing deliverable is the sheet URL, not JSON, local Apps Script files, or renderer/debug instructions.

## Standard Tabs
Use the canonical weekly workbook format from:
`https://docs.google.com/spreadsheets/d/1Qw-VSdhknkzg_vp0UsI9XDNGEqJaJhg0-GOH9Isa460/edit`

- `איושים`
- ` שיבוצי לינה`
- ` שיבוצי רכבים`
- `  הזמנות אוכל`

Preserve the exact tab names, including leading spaces, unless the PM asks to rename tabs.

## Format Rules
- Create reusable weekly templates by copying the canonical workbook and clearing operational content, not by rebuilding the style from scratch.
- In ` שיבוצי רכבים`, keep vehicle names, row labels, colors, merges, and borders; clear all editable assignment cells, including columns I-L, so the car table waits for content.
- In `איושים`, keep role labels and colored movement semantics; clear copied names, counts, and week-specific dates.
- In lodging and food tabs, keep lodging/menu/order scaffolding and formulas; clear occupants, dates, counts, and order inputs.

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
