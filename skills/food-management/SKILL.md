---
name: food-management
description: Plan Flight Test field-experiment food orders, especially Ein Yahav lunch catering, Aroma vegetarian salads, BBQ dinners, and BBB hamburger dinners. Use when a PM asks what food to order, how much catering to order, or how meal quantities should be derived from weekly staffing.
---

# Food Management

Plan meals from the weekly logistics plan without asking the PM to fill structured data.

## Source order
1. Use the current weekly plan when provided. Read `איושים` for people present by day, `הזמנות אוכל` for existing orders, and `שיבוצי רכבים` only when arrivals/departures affect meal headcount.
2. Use `data/food_catering_ein_yahav.csv` for known Ein Yahav catering items and prices.
3. Read `references/ein_yahav_food_rules.md` before recommending quantities for Ein Yahav.

## Operating rules
- Respond in English, while preserving Hebrew food, vendor, place, and person names exactly.
- Lunch in `עין יהב` is always ordered from the local catering service unless the PM says otherwise.
- Vegetarians get Aroma cafe salads for lunch: one salad per vegetarian per lunch. Ask for salad choices only when the PM wants the final order; otherwise record the count and flag choices as pending.
- Dinner is either BBQ or BBB hamburgers. If the PM has not chosen, ask that as a blocking question.
- Do not invent vendors, menu items, prices, allergies, or dietary restrictions.
- State assumptions and review flags clearly.

## Quantity workflow
1. Build meal headcount per day from people physically present at the site for that meal. Adjust for late arrivals, early returns, and one-day visitors.
2. Split lunch headcount into vegetarian and non-vegetarian counts.
3. Order Aroma salads for vegetarians, then size catering protein for non-vegetarians and shared sides for total headcount.
4. Prefer two main choices for groups of 16 or more; use one main plus one tray/pot option for smaller groups unless the PM asks for variety.
5. Include one carb every lunch, usually `אורז/תפו"א/פסטה ברוטב אדום`; add `קוסקוס` or another side for 14+ people or protein-heavy meals.
6. Add `סלט ירקות`: two trays for 17+ people, usually one without onion when preferences are unknown; one tray can be enough for smaller groups.
7. Capture gluten-free or allergy notes on the exact item, for example `ללא גלוטן`.

## Output
Give the PM a meal-by-meal order plan with:
- date/day and meal;
- headcount, vegetarian count, and non-vegetarian count;
- vendor;
- ordered items and quantities;
- assumptions and unresolved choices.

Do not expose JSON unless the PM explicitly asks for an internal payload.
