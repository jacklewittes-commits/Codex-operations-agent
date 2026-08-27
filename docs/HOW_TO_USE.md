# How To Use The Codex Logistics Agent

## Weekly Planning
1. Tell Codex the week dates, site, experiment days, and any known staffing, vehicle, lodging, or food constraints.
2. Codex asks only blocking follow-up questions.
3. Codex builds an internal weekly plan, validates it, and keeps JSON out of the PM conversation.
4. After PM approval, Codex publishes or updates the standard weekly Google Sheet.
5. The PM reviews the Sheet and requests revisions naturally.

## Monthly Planning
1. Ask for a month or date range calendar.
2. Provide fixed events, constraints, or open tasks if known.
3. Codex creates a monthly operations calendar Sheet in the monthly Drive folder.

## Revisions
Ask naturally, for example: "move דניאל to the pickup on Tuesday", "add two Aroma salads Wednesday", or "ספי returns early Thursday." Codex should update the existing plan, revalidate downstream effects, and regenerate the Sheet only after approval.

## Data Changes
- People: update `data/members.csv`.
- Vehicles: update `data/vehicles.csv`.
- Sites: update `data/experiment_sites.csv`.
- Lodging: update `data/hostels.csv`.
- Food menu or specials: update `data/food_catering_ein_yahav.csv` or `data/food_specials.csv`.
