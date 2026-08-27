---
name: food-management
description: Weekly logistics sub-skill for Flight Test food planning from weekly attendance, lodging, and vehicle timing; use only inside weekly plan creation or weekly food revisions, not for monthly calendars.
---
# Food Management
Plan meals as part of the weekly logistics plan. This is not an independent PM product and is not used by monthly calendar planning.

## Sources
- Read `../../data/README.md`.
- Use the current weekly plan when provided. Read `איושים` for people present by day, `הזמנות אוכל` for existing orders, and `שיבוצי רכבים` only when arrivals/departures affect meal headcount.
- Use `../../data/food_specials.csv` to confirm current non-standard food counts before finalizing quantities.
- Use `../../data/food_catering_ein_yahav.csv` for known Ein Yahav catering items and prices, but treat it as a baseline menu rather than the only allowed food source.
- Read `references/ein_yahav_food_rules.md` before recommending quantities for Ein Yahav.
## Operating rules
- Respond in English, while preserving Hebrew food, vendor, place, and person names exactly.
- Invoke this skill from `weekly-logistics` when building or revising a weekly plan; do not invoke it from `monthly-operations-calendar` unless the PM explicitly turns a calendar item into a weekly food plan.
- Before auto-filling food, ask whether the PM has food preferences for the week or wants the agent to plan it.
- Lunch is chosen from `קייטרינג עין יהב`, `BBB`, or `Aroma`, based on PM preference or agent planning when delegated.
- Special lunch orders that are not standard catering are counted from `../../data/food_specials.csv`; if PM wording conflicts, preserve the CSV values for the draft and flag the mismatch.
- Use `Aroma salad` as the default label for Aroma cafe salads; do not ask which salad unless the PM volunteers exact choices.
- Dinner has no fixed vendor rule; decide it week by week with the PM, or leave it to the agent when the PM delegates planning.
- Keep ordering flexible. If the PM wants food outside the catering CSV, record it as ad hoc and include the order channel when known: WhatsApp, email, phone, or manual.
- Do not send WhatsApp/email/vendor messages without explicit PM approval in that conversation.
- Do not invent vendors, menu items, prices, allergies, or dietary restrictions.
- State assumptions and review flags clearly.
- Keep `README.md`, `AGENTS.md`, and skill docs at 50 lines or fewer; split longer guidance into referenced docs.
## Quantity workflow
1. Build meal headcount per day from people physically present for that meal. Adjust for late arrivals, early returns, and one-day visitors.
2. Build dinner headcount from the people sleeping that night, unless the PM explicitly says dinner includes non-sleepers.
3. Read `../../data/food_specials.csv` and subtract non-standard special orders from the standard lunch count when they are not covered by the regular lunch vendor.
4. Add `Aroma salad` rows for people whose lunch is handled by Aroma instead of the standard lunch order.
5. Size lunch quantities from that day's team size and lunch vendor.
6. Size dinner quantities from the overnight sleeper count for that night.
7. For Ein Yahav catering lunches, prefer two main choices for 16+ people; use one main plus one tray/pot option for smaller groups unless the PM asks for variety.
8. Include one carb every catering lunch, usually `אורז/תפו"א/פסטה ברוטב אדום`; add `קוסקוס` or another side for 14+ people or protein-heavy meals.
9. Add `סלט ירקות`: two trays for 17+ people, usually one without onion if preferences are unknown; one tray can be enough for smaller groups.
10. Capture gluten-free or allergy notes on the exact item, for example `ללא גלוטן`.

## Sheet output
The weekly Google Sheet tab `  הזמנות אוכל` must show the catering menu baseline, current specials, and each order by date, meal, vendor, item, amount, unit price, total, order channel, and notes.

## Output
Give the PM a meal-by-meal order plan with:
- date/day and meal;
- headcount, standard catering count, and special-order counts;
- vendor and ordered items with quantities;
- order channel when known;
- assumptions, unresolved choices, and no JSON unless explicitly requested.
