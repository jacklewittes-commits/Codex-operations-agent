# PM Intake Guide

The PM should speak naturally. Do not ask the PM to write JSON, fill schemas, inspect Apps Script, or know implementation details.

## Goal
Convert PM conversation or a linked partial Google Drive file into enough structured information to generate the same weekly logistics Google Sheet.

## Acceptable PM Input
- Week dates, experiment days, site, manager, safety officer, known team members, attendance changes, arrivals, departures, and sleepover intent.
- Vehicles, rentals, trucks, trailers, special drives, routes, timing, drivers, lodging already booked, hostel, units, rooms, and nights.
- Food needs, special orders, vendor/contact constraints, and weekly food preference or delegation.
- Airstrip constraints: flight window, יונתן coordination, other people on site, after-dark departure, and external company activity.
- Fuel (`דס״ל`) context: flight profile, jet-fuel tank truck, current liters, black jerrycans, and possible `שדה תימן` refill drive.
- Equipment and transport context: critical items, loading vehicle, required arrival time, platforms/assets, and truck load shape.

## Intake Behavior
1. Capture everything the PM gives, even if incomplete.
2. Normalize dates, locations, names, vehicles, and lodging against repository data when possible.
3. Ask only blocking questions before generating a sheet.
4. Convert non-blocking gaps into assumptions, PM checklist rows, or review flags.
5. Preserve Hebrew names exactly as supplied or as found in data files.
6. If the PM does not provide a food plan, ask one short preference question: choose the week's food approach, or let the agent plan it automatically.
7. Support both defaults: PM gives week context and the agent plans logistics, or PM gives staffing and the agent completes vehicles, rooms, food, and related logistics.

## Prompt References
- Use `references/pm_operational_domains.md` as the quiet PM mental checklist.
- Use `references/source_sheet_intake.md` when the PM provides a Google Drive link.
- Ask one concise follow-up at a time when a blocker exists.

## Blocking Fields
- Week label or date range.
- At least one experiment site/location.
- Experiment days or date span.

## Non-Blocking Fields
Treat these as assumptions or review flags when missing.

- Experiment manager or safety officer.
- Active vehicle set or instruction to infer from team size and site requirements.
- Lodging source; do not assume lodging is needed for one-day experiments.
- Exact license plates or non-trailer vehicle commander.
- Passenger order within a vehicle.
- Precise meal vendor requirements or vendor contacts.
- Weekly food preference choice, if the PM is comfortable letting the agent plan meals automatically.
- Exact current `דס״ל` tank quantity, if the PM can review before publication.
- Exact black jerrycan count, if tarmac refueling is possible but not confirmed.
- Exact loading vehicle for non-critical equipment.

## PM-Facing Response
Return the Google Sheet link by default. Share assumptions, blocking issues, or PM checklist items only when they materially affect the plan or the PM asks. Never expose internal JSON unless explicitly requested for debugging.
