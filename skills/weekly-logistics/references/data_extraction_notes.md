# Data Extraction Notes

Source: uploaded April 2026 weekly planning workbooks.

## What was extracted
- `data/members.csv`: seeded from the Apps Script embedded roster and expanded with names observed in the April staffing sheets.
- `data/vehicles.csv`: canonical company assets and rental templates based on observed vehicle sheets and PM clarification.
- `data/hostels.csv`: hostels/units/rooms observed in accommodation sheets. Capacities are only filled where already present in the renderer sample; otherwise they require verification.
- `data/experiment_sites.csv`: locations observed in staffing headers and vehicle routes.

## Confidence
- Members from the embedded renderer roster have higher confidence.
- Members observed only in weekly sheets are marked with `source=weekly_plans_april_2026` and notes requiring verification.
- Vehicle ownership/classification reflects PM clarification: pickups, Hyundais, RAV4/Toyota, Toyota Yaris cars, and Ducato are company assets; many other named cars are weekly rentals.
- Hostel capacities are incomplete and should be corrected from vendor/booking documents.
