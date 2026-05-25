# Weekly Logistics Planning Rules

Apply these rules when converting PM context into the weekly plan.

## Planning objective
Produce a usable weekly logistics Google Sheet for the experiment team. The sheet is the primary product. Written summaries are secondary.


## Required data/context files
- Read `references/fleet_context.md` before vehicle planning.
- Treat `data/members.csv`, `data/vehicles.csv`, `data/hostels.csv`, and `data/experiment_sites.csv` as master data.
- Treat rental vehicles as weekly context unless they appear as company assets in `data/vehicles.csv`.

## Core entities
- Experiment: a site/location over a date/day range with a manager, safety officer, staffing needs, vehicle needs, and lodging needs.
- Trip: a vehicle movement during the week. Each trip needs a route, time window, vehicle, commander/driver where relevant, passengers, and notes.
- Vehicle: owned, permanent, rental, pickup, truck, trailer-equipped vehicle, or special vehicle.
- Accommodation: hostel, unit, room, capacity, occupants per night.

## Hard constraints
Never silently violate these. Stop or flag as blocking if unresolved:
1. Vehicle capacity cannot be exceeded.
2. Trailer vehicles require a present commander with trailer license.
3. Rental commanders/drivers must be allowed to drive rentals.
4. Truck usage must match site requirements, including fixed requirements for special sites.
5. Trucks carry only driver plus optional escort unless the PM explicitly confirms otherwise.
6. Room capacity cannot be exceeded.
7. Women never share a room with men.
8. Experiment manager and safety officer must be assigned when required.
9. Do not invent team members, rooms, vehicles, or vendors.

## Vehicle planning
- Build outbound, return, and internal/special trips separately.
- Use PM-provided vehicles first.
- Infer additional rentals only when the PM asks the agent to solve capacity.
- Keep teams together where practical.
- Assign logistics staff to pickups before regular cars when pickups are active.
- Assign integration/technical staff to the Ducato when active.
- Keep נטע and ספי in regular cars unless the PM explicitly overrides.
- For each trip, capture route, timing, commander/driver, passengers, and notes.

## Accommodation planning
- Only allocate rooms for overnight experiments.
- Use booked units first.
- Keep the same room across nights unless attendance changes.
- Keep teams together where possible after hard constraints.
- Reserve small/single units for people who require privacy or by standing preference when known.
- Flag any person attending overnight who has no room.

## Revision behavior
When the PM asks for changes after the sheet is created:
1. Interpret the requested change in natural language.
2. Update the internal plan.
3. Revalidate constraints.
4. Either update/regenerate the Google Sheet or provide the exact change if the PM prefers editing manually.
5. Return the revised sheet link and new flags only.

## Vendor phase placeholder
Vendor contact workflows for food, rooms, and other services are out of scope until explicitly added. For now, capture vendor needs as review flags.
