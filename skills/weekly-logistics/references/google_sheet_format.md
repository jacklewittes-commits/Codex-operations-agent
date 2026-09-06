# Google Sheet Format

## Source Of Truth
- Copy the full canonical workbook from `output_contract.md`.
- Do not rebuild tabs from scratch when formatting matters.
- Do not duplicate only one tab; the weekly deliverable needs all four tabs.
- After copying, clear and refill operational cells while preserving row heights, column widths, colors, merges, borders, dropdown chips, formulas, and frozen panes.

## Required Tabs
- `איושים`
- ` שיבוצי לינה`
- ` שיבוצי רכבים`
- `  הזמנות אוכל`

## איושים
- Keep both staffing tables: `עין יהב` and `מבוא חורון`.
- Never omit the full `עין יהב` manpower table.
- Keep role labels, brown headers, beige work areas, and totals row.
- Red/pink cells mean the person returns up that day: text includes `חזרה`.
- Green cells mean the person goes down that day: text includes `ירידה` and not `חזרה`.
- Use those movement colors to seed car outbound and return planning.
- Preserve conditional formatting rules that color `ירידה` green and `חזרה` red/pink.

## שיבוצי רכבים
- Keep the operational vehicle-block format: vehicle column, details column, daily `הלוך` and `חזור` columns.
- Build drives from the manpower plan first: `ירידה` entries need a southbound seat, and `חזרה` entries need a northbound seat.
- Separate vehicles by experiment per day. A car used for מבוא חורון cannot also serve עין יהב that same day.
- Give עין יהב priority for fuel-capable DMAX/pickup vehicles because they refuel the planes.
- מבוא חורון uses small generators and should use regular cars or rentals when possible.
- Include regular cars when active: `טויטה יאירס 1`, `טויטה יאירס 2`, `יונדאי`, and northern cars.
- Include `דוקאטו`, company pickups, Ford Rangers, rentals, and `משאית` blocks when relevant.

## Trucks
- A `משאית` bringing a plane down needs one team person total with the truck.
- Do not add a driver plus a second `מלווה` unless the PM explicitly asks for two team people.
- Remove that person from any regular car for the same trip to avoid double-booking.

## שיבוצי לינה
- Preserve lodging section headers, unit/room columns, gray sleeping grid, notes column, and totals row.
- Assign only overnight attendees.
- Respect room capacity and gender-correct sharing.
- At `בקתה ערבה - נוני`, give each person a separate available room before putting two people in one room, because the second-room quality is lower.

## הזמנות אוכל
- Preserve the מחירון table and daily order blocks.
- Use `data/food_catering_ein_yahav.csv` as the menu data source.
- Plan each catered day from attendance, overnight counts, and food limitations.
- Keep dropdown-like menu cells and totals formatting.
