# Source File Intake

Use this when the PM provides a Google Drive link with partial planning context.

## Supported Flows
- Option 1: PM describes the experiment in chat and asks the agent to plan the rest.
- Option 2: PM provides a partial Google Sheet or doc with team members, vehicles, rooms, food, or notes.
- Hybrid: PM provides both chat context and a source file; use both.
- In every flow, produce the same standard output Sheet defined in `output_contract.md`.

## Access
- Use the connected Google Drive/Sheets tools when available.
- If the file cannot be accessed, ask the PM to share access or paste the relevant rows/notes.
- Do not treat inaccessible source data as a blocker when the PM can provide the three required blockers another way.

## Reading Behavior
- Treat the source file as intake context, not as the final deliverable.
- Do not edit the source file unless the PM explicitly asks.
- Read only tabs/ranges needed for the weekly plan.
- Preserve Hebrew names, locations, vehicles, rooms, and raw cell values exactly.
- Map source content loosely to `איושים`, `שיבוצי רכבים`, `שיבוצי לינה`, `הזמנות אוכל`, and notes.

## Conflict Handling
- If chat and source file conflict, use the PM's latest explicit instruction.
- If the latest instruction is unclear, flag the conflict instead of guessing.
- Missing manager, safety officer, vehicles, rooms, food, contacts, or assignments become assumptions, checklist rows, or review flags.

## Planning Output
- Build the same internal `weekly_plan` regardless of intake mode.
- Validate the same constraints and generate the same standard Sheet.
- Add `PM Checklist` rows for follow-ups discovered in the source file, such as TBD drivers, unconfirmed rooms, or fuel/refill tasks.
