---
name: food-management
description: Plan Flight Test field-experiment food orders, especially Ein Yahav lunch catering, Aroma salads for special diets, flexible WhatsApp/email food orders, BBQ dinners, and BBB hamburger dinners. Use when a PM asks what food to order, how much catering to order, or how meal quantities should be derived from weekly staffing.
---

# Food Management

Plan meals from the weekly logistics plan without asking the PM to fill structured data.

## Source order
1. Use the current weekly plan when provided. Read `איושים` for people present by day, `הזמנות אוכל` for existing orders, and `שיבוצי רכבים` only when arrivals/departures affect meal headcount.
2. Use `data/food_specials.csv` to confirm current non-standard food counts before finalizing quantities.
3. Use `data/food_catering_ein_yahav.csv` for known Ein Yahav catering items and prices, but treat it as a baseline menu rather than the only allowed food source.
4. Read `references/ein_yahav_food_rules.md` before recommending quantities for Ein Yahav.

## Operating rules
- Respond in English, while preserving Hebrew food, vendor, place, and person names exactly.
- Lunch in `עין יהב` is always ordered from the local catering service unless the PM says otherwise.
- Special lunch orders that are not standard catering are counted from `data/food_specials.csv`.
- If PM wording conflicts with `data/food_specials.csv` counts, preserve the CSV values for the draft and flag the mismatch before final ordering.
- Use `Aroma salad` as the default label for Aroma cafe salads; do not ask which salad unless the PM volunteers exact choices.
- Dinner is either BBQ or BBB hamburgers. If the PM has not chosen, ask that as a blocking question.
- Keep ordering flexible. If the PM wants food that is not in the catering CSV, record it as an ad hoc order and include the order channel when known: WhatsApp, email, phone, or manual.
- Do not send WhatsApp/email/vendor messages without explicit PM approval in that conversation.
- Do not invent vendors, menu items, prices, allergies, or dietary restrictions.
- State assumptions and review flags clearly.

## Quantity workflow
1. Build meal headcount per day from people physically present at the site for that meal. Adjust for late arrivals, early returns, and one-day visitors.
2. Read `data/food_specials.csv` and subtract non-standard special orders from the standard catering count when they are not covered by the regular menu.
3. Add `Aroma salad` rows for people whose food is handled by Aroma instead of the standard catering.
4. Size catering protein for the standard catering count and shared sides for the total headcount.
5. Prefer two main choices for groups of 16 or more; use one main plus one tray/pot option for smaller groups unless the PM asks for variety.
6. Include one carb every lunch, usually `אורז/תפו"א/פסטה ברוטב אדום`; add `קוסקוס` or another side for 14+ people or protein-heavy meals.
7. Add `סלט ירקות`: two trays for 17+ people, usually one without onion when preferences are unknown; one tray can be enough for smaller groups.
8. Capture gluten-free or allergy notes on the exact item, for example `ללא גלוטן`.

## Sheet output
The weekly Google Sheet must include a dedicated food order tab named `הזמנות אוכל`. It should show:
- the catering menu baseline;
- the current specials table from `data/food_specials.csv`;
- each food order by date, meal, vendor, item, amount, unit price, total, order channel, and notes.

## Output
Give the PM a meal-by-meal order plan with:
- date/day and meal;
- headcount, standard catering count, and special-order counts;
- vendor;
- ordered items and quantities;
- order channel when known;
- headcount, standard catering count, and special-order counts;
- vendor;
- ordered items and quantities;
- order channel when known;
- assumptions and unresolved choices.

Do not expose JSON unless the PM explicitly asks for an internal payload.
