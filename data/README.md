# Data directory

This directory contains structured master data only. CSV files should hold facts that the planner can read directly, not workflow instructions or narrative skill context.

Current CSVs:
- `members.csv`: team roster and capabilities.
- `vehicles.csv`: company fleet, trailer assets, and rental vehicle templates.
- `hostels.csv`: lodging inventory by location, hostel, unit, room, and capacity.
- `experiment_sites.csv`: known experiment sites/locations.
- `food_catering_ein_yahav.csv`: known Ein Yahav catering items, prices, units, and menu notes.

Former misplaced CSV content that described agent behavior has been moved to `skills/weekly-logistics/` and its `references/` folder.
