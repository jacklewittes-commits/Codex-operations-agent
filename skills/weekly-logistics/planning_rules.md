# Weekly Logistics Planning Rules

Apply these rules when converting PM context into the weekly plan.

## References
- Read `references/fleet_context.md` before vehicle planning.
- Read `references/pm_operational_domains.md` for airstrip, fuel, TRR, rentals, equipment, and trucking logic.
- Read `references/pm_checklist_tab.md` when generating PM checklist rows.
- Treat `data/members.csv`, `data/vehicles.csv`, `data/hostels.csv`, and `data/experiment_sites.csv` as master data.

## Objective
Produce a usable weekly logistics Google Sheet. The sheet is the primary product; written summaries are secondary.

## Core Entities
- Experiment: site, dates, manager, safety officer, staffing, vehicles, lodging, and operational needs.
- Trip: route, time window, vehicle, commander/driver, passengers, and notes.
- Vehicle: owned, permanent, rental, pickup, truck, trailer-equipped vehicle, or special vehicle.
- Accommodation: hostel, unit, room, capacity, and occupants by night.

## Hard Constraints
Never silently violate these. Stop or flag as blocking if unresolved.

1. Vehicle capacity cannot be exceeded.
2. Trailer vehicles require a present commander with trailer license.
3. Rental commanders/drivers must be allowed to drive rentals.
4. Truck usage must match site and payload requirements.
5. Trucks carry only driver plus optional escort unless the PM explicitly confirms otherwise.
6. Room capacity and gender separation must be respected.
7. Experiment manager and safety officer must be assigned when required.
8. Do not invent team members, rooms, vehicles, vendors, contacts, or site rules.

## Vehicle And Lodging
- Build outbound, return, and internal/special drives separately.
- When reading a staffing/source sheet, treat green-highlighted names as people going down south that day and red/pink-highlighted names as people coming back up that day; use this to seed outbound and return drive planning.
- Use PM-provided vehicles first; infer rentals only when the PM asks the agent to solve capacity.
- Assign logistics staff to pickups before regular cars when pickups are active.
- Assign integration/technical staff to the Ducato when active.
- Keep נטע and ספי in regular cars unless the PM explicitly overrides.
- Plan lodging only when the PM says the experiment is overnight or attendance spans overnight stays.
- Use booked lodging first; flag overnight attendees without rooms, but not one-day experiments.

## PM Checklist Behavior
- Generate `pmChecklist` rows from plan facts, assumptions, and unresolved flags.
- Put pre-experiment and during-experiment tasks in the `PM Checklist` tab, not only in chat.
- Mark blockers clearly when they affect safety, coordination, fuel, rooms, vehicles, or legal readiness.

## Revisions
When the PM asks for changes, update the existing plan, revalidate downstream conflicts, and regenerate/update the Sheet only with PM approval.

Food quantity planning lives in `skills/food-management/` when requested. Direct vendor contact workflows for food, rooms, and other services remain out of scope until explicitly added. For now, capture vendor contact needs as review flags, and do not send vendor messages without explicit PM approval and available channel access.
