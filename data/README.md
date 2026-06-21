# Data directory

This directory contains structured master data only. CSV files should hold facts that the planner can read directly, not workflow instructions or narrative skill context.

Current CSVs used by `skills/weekly-logistics/` and `skills/food-management/`:
- `members.csv`: team roster and capabilities.
- `vehicles.csv`: company fleet, trailer assets, and rental vehicle templates.
- `hostels.csv`: lodging inventory by location, hostel, unit, room, and capacity.
- `experiment_sites.csv`: known experiment sites/locations.
- `food_catering_ein_yahav.csv`: known Ein Yahav catering items, prices, units, and menu notes.
- `food_specials.csv`: current non-standard food counts by special category.

Cross-reference:
- Planning behavior lives in `skills/weekly-logistics/` and `skills/food-management/`.
- Repo-level operating rules live in `AGENTS.md`.
