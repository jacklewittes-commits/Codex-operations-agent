---
name: monthly-operations-calendar
description: create or revise reusable monthly experiment operations calendars in Google Sheets, with Hebrew RTL month grids, team constraint rows, side tables for מנחתים/מעטפת, and scalable open-task tables.
---

# Monthly Operations Calendar

## Use When
- The PM asks for a monthly or multi-month experiment calendar/planner.
- The PM wants team members to add availability, constraints, early returns, drives, or personal blockers.
- The PM asks to recreate the approved month format for another month.

## Product Contract
The deliverable is a native Google Sheet. Do not ask the PM to write JSON. Collect month/year and any known tasks or calendar entries naturally, then render quietly through the Google Sheets Apps Script.

## Format Rules
- Use RTL Hebrew tabs named by month, e.g. `אוגוסט Calendar` or the PM’s preferred tab name.
- Calendar grid uses columns `A:H`: row label plus Sunday-Saturday.
- Every week block has rows: date, `מנחת`, `תכולות`, `דרישות`, `גופים`, `אילוצי אופרציה`, `אילוצי טכנאים`, `אילוצי מטיסים`, `מעטפת`.
- All calendar cells are right-aligned, vertically centered, and wrapped.
- `תכולות`, `דרישות`, and `גופים` rows must be tall enough for multi-line `- ` lists.
- In-cell lists use one item per line with `- `; wrapping alone is not a bullet list.
- Side blocks include compact `מנחתים`, `מעטפת`, and `משימות פתוחות` tables.

## Renderer Payload
Use `integrations/google_sheets/apps_script.js` with `monthCalendar`.

Minimum:
```json
{
  "title": "חודש אוגוסט - גאנט ניסויים",
  "monthCalendar": { "year": 2026, "month": 8 }
}
```

Optional entries can include `date`, `airstrip`, `contents`, `requirements`, `assets`, `operationsConstraints`, `technicianConstraints`, `pilotConstraints`, and `envelope`. Values may be strings or arrays; arrays become `- ` lists.

Optional tasks use `{ "task": "...", "week": "...", "notes": "..." }`.

## Review
Before returning the link, verify the month tab exists, rows are wrapped, `תכולות/דרישות/גופים` row heights are expanded, and side task rows are preformatted for adding more tasks.
