---
name: monthly-operations-calendar
description: create or revise reusable monthly experiment operations calendars in Google Sheets, with Hebrew RTL month grids, team constraint rows, side tables for מנחתים/מעטפת, and scalable open-task tables.
---

# Monthly Operations Calendar

## Use When
- The PM asks for a monthly or multi-month experiment calendar/planner.
- The PM wants team members to add availability, constraints, early returns, drives, or personal blockers.

## Product Contract
The deliverable is a native Google Sheet saved in the PM's requested Drive folder, then returned as a link. Do not ask the PM to write JSON. Collect month/year and destination folder naturally, ask once whether the PM wants to provide known tasks or calendar entries before creation, then render quietly through the Google Sheets Apps Script.

## Creation Flow
1. Ask which month(s) and year to create. Infer the correct number of days and week blocks from the calendar.
2. Ask for the destination Drive folder if it is not already provided. The default monthly folder is `https://drive.google.com/drive/folders/1AebF43GTu4UAJR_MJAdzcT4_Z0jlbCKQ`.
3. Before creating, ask one concise optional-prefill question: whether the PM has known tasks, flight areas, envelopes, team constraints, or fixed dates to include now.
4. Create a clean blank planner unless the PM explicitly provides dated cells, open tasks, or highlights for the new month.
5. Save the created Google Sheet in the requested Drive folder and return only the Sheet link plus any material assumptions.

## Format Rules
- Use RTL Hebrew tabs named by month, e.g. `אוגוסט Calendar` or the PM’s preferred tab name.
- Calendar grid uses columns `A:H`: row label plus Sunday-Saturday.
- Every week block has rows: date, `מנחת`, `תכולות`, `דרישות`, `גופים`, a three-row `אילוצי אופרציה` writing block, and `מעטפת`.
- All calendar cells are right-aligned, vertically centered, and wrapped.
- `תכולות`, `דרישות`, and `גופים` rows must be tall enough for multi-line `- ` lists.
- In-cell lists use one item per line with `- `; wrapping alone is not a bullet list.
- Side blocks include compact `מנחתים`, `מעטפת`, and `משימות פתוחות` tables.
- `מנחתים` and `מעטפת` side reference values are part of the reusable format.
- Do not copy July/August-specific content, task rows, experiment details, or special yellow/US-week highlighting into a new month unless the PM explicitly asks.

## Renderer Payload
Use `integrations/google_sheets/apps_script.js` with `monthCalendar`.

Minimum:
```json
{
  "title": "חודש אוגוסט - גאנט ניסויים",
  "folderUrl": "https://drive.google.com/drive/folders/1AebF43GTu4UAJR_MJAdzcT4_Z0jlbCKQ",
  "monthCalendar": { "year": 2026, "month": 8 }
}
```

Optional entries can include `date`, `airstrip`, `contents`, `requirements`, `assets`, `operationsConstraints`, `operationsConstraints2`, `operationsConstraints3`, and `envelope`. Values may be strings or arrays; arrays become `- ` lists.

Optional tasks use `{ "task": "...", "week": "...", "notes": "..." }`.

## Review
Before returning the link, verify the month tab exists, rows are wrapped, `תכולות/דרישות/גופים` row heights are expanded, and side task rows are preformatted for adding more tasks.
