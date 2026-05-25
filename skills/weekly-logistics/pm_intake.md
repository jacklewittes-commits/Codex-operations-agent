# PM Intake Guide

The PM should speak naturally. Do not ask the PM to write JSON, fill schemas, or know implementation details.

## Goal
Convert a PM conversation into enough structured information to generate the standard weekly logistics Google Sheet.

## Acceptable PM input
The PM may provide any subset of:
- Week dates and experiment days.
- Site/location.
- Experiment manager and safety officer.
- Team members known to attend.
- Vehicles already committed, including trucks, pickups, rentals, trailers, or special vehicles.
- Lodging already booked, including hostel name, units, rooms, and nights.
- Special trips during the experiment, including origin, destination, purpose, timing, candidate vehicle, and driver if known.
- Constraints or preferences, such as people who must travel together, cannot drive, arrive late, leave early, or need a specific room.

## Intake behavior
1. Capture everything the PM gives, even if incomplete.
2. Normalize dates, locations, names, vehicles, and lodging against repository data when possible.
3. Ask only blocking questions before generating a sheet. Non-blocking gaps should become assumptions or review flags.
4. Prefer one concise follow-up question at a time when a blocker exists.
5. Preserve Hebrew names exactly as supplied or as found in data files.

## Blocking fields before sheet generation
- Week label or date range.
- At least one experiment site/location.
- Experiment days or date span.
- Experiment manager.
- Safety officer, if required by operation policy.
- Active vehicle set or instruction to infer from team size and site requirements.
- Lodging source for overnight experiments: booked units/rooms or instruction to allocate from available inventory.

## Non-blocking fields
Treat these as assumptions or review flags when missing:
- Exact license plates.
- Exact vehicle commander for non-trailer cars.
- Passenger order within a vehicle.
- Precise meal/food vendor requirements.
- Vendor contacts.

## PM-facing response after generation
Return only operationally useful information:
- Google Sheet link.
- What the agent assumed.
- Conflicts or unresolved risks.
- Review checklist.

Never expose the internal weekly_plan JSON unless the user explicitly asks for debugging or development details.
