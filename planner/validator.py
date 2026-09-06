#!/usr/bin/env python3
"""Operational weekly_plan validator.

Checks the minimum renderer fields plus core logistics constraints using the
repo CSV master data. Warnings mean the plan cannot be fully verified from the
available data; errors mean the plan violates a known rule.
"""
from __future__ import annotations
import csv
import json
import re
import sys
from pathlib import Path

REQUIRED = ["title", "weekLabel", "days"]
ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"


def read_csv(name: str) -> list[dict[str, str]]:
    path = DATA / name
    if not path.exists():
        raise FileNotFoundError(f"missing data file: {path}")
    with path.open(encoding="utf-8-sig", newline="") as fh:
        return list(csv.DictReader(fh))


def normalize(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def assignment_name(value: object) -> str:
    text = normalize(value)
    text = re.sub(r"^(מלווה|נהג)\s*:\s*", "", text)
    text = re.split(r"\s+-\s*", text, maxsplit=1)[0]
    return normalize(text).rstrip("? ")


def compact(value: object) -> str:
    return re.sub(r"[\s\"'״׳-]+", "", str(value or ""))


def as_int(value: object) -> int | None:
    if isinstance(value, int):
        return value
    text = normalize(value)
    if not text:
        return None
    match = re.search(r"-?\d+", text)
    return int(match.group(0)) if match else None


def is_yes(value: object) -> bool:
    return normalize(value).lower() in {"כן", "yes", "true", "1", "y"}


def people_index(rows: list[dict[str, str]]) -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    for row in rows:
        names = [row.get("name", ""), row.get("english_name", "")]
        names.extend(str(row.get("aliases", "")).split("|"))
        for name in names:
            key = normalize(name)
            if key:
                out[key] = row
    return out


def vehicle_index(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    return rows


def find_vehicle(name: str, rows: list[dict[str, str]]) -> dict[str, str] | None:
    target = compact(name)
    for row in rows:
        values = [row.get("display_name", ""), row.get("vehicle_id", "")]
        values.extend(str(row.get("observed_names", "")).split(";"))
        for value in values:
            token = compact(value)
            if token and (token in target or target in token):
                return row
    return None


def staffing_by_day(payload: dict) -> list[set[str]]:
    days = payload.get("days") if isinstance(payload.get("days"), list) else []
    present = [set() for _ in days]
    for experiment in payload.get("staffing", []) or []:
        for prefill in experiment.get("prefill", []) or []:
            for idx, value in enumerate(prefill.get("days", []) or []):
                if idx < len(present):
                    name = assignment_name(value)
                    if name:
                        present[idx].add(name)
    return present


def role_names(payload: dict, role_pattern: str) -> set[str]:
    names: set[str] = set()
    for experiment in payload.get("staffing", []) or []:
        for prefill in experiment.get("prefill", []) or []:
            role = normalize(prefill.get("role", ""))
            if role_pattern in role:
                for name in prefill.get("days", []) or []:
                    person = assignment_name(name)
                    if person:
                        names.add(person)
    return names


def vehicle_leg_people(day: dict, prefix: str) -> list[str]:
    people = []
    cmd = assignment_name(day.get(f"{prefix}Cmd", ""))
    if cmd:
        people.append(cmd)
    for key, value in day.items():
        if re.fullmatch(prefix + r"P\d+", str(key)) and assignment_name(value):
            people.append(assignment_name(value))
    return people


def vehicle_capacity(vehicle: dict, master: dict[str, str] | None) -> int | None:
    for key in ("capacity", "capacityEstimate", "capacity_estimate"):
        cap = as_int(vehicle.get(key))
        if cap:
            return cap
    if master:
        cap = as_int(master.get("capacity_estimate"))
        if cap:
            return cap
        if normalize(master.get("vehicle_type")) == "truck":
            return 1
    return None


def food_special_total(food: dict) -> int:
    total = 0
    for item in food.get("specials", []) or []:
        total += as_int(item.get("amount", item.get("Amount"))) or 0
    return total


def validate(payload: dict) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    for key in REQUIRED:
        if key not in payload or payload[key] in (None, "", []):
            errors.append(f"missing required field: {key}")
    if "days" in payload and not isinstance(payload["days"], list):
        errors.append("days must be a list")

    try:
        members = people_index(read_csv("members.csv"))
        vehicles = vehicle_index(read_csv("vehicles.csv"))
        sites = read_csv("experiment_sites.csv")
    except FileNotFoundError as exc:
        errors.append(str(exc))
        return errors, warnings

    present = staffing_by_day(payload)
    validate_roles(payload, members, present, errors, warnings)
    validate_site_trucks(payload, sites, errors)
    validate_vehicles(payload, members, vehicles, present, errors, warnings)
    validate_accommodation(payload, members, errors, warnings)
    validate_food(payload, errors, warnings)
    return errors, warnings


def validate_roles(
    payload: dict,
    members: dict[str, dict[str, str]],
    present: list[set[str]],
    errors: list[str],
    warnings: list[str],
) -> None:
    manager = normalize(payload.get("experimentManager"))
    if manager:
        row = members.get(manager)
        if not row:
            errors.append(f"experiment manager not found in members.csv: {manager}")
        else:
            role_text = " ".join([row.get("position", ""), row.get("observed_roles", ""), row.get("notes", "")])
            if "מנהל" not in role_text and "Manager" not in role_text:
                errors.append(f"experiment manager is not marked as PM/Manager: {manager}")
    for safety in role_names(payload, "בטיחות"):
        if safety not in members:
            errors.append(f"safety officer not found in members.csv: {safety}")
    safety = normalize(payload.get("safetyOfficer"))
    if safety:
        attended = any(safety in day for day in present)
        if present and not attended:
            errors.append(f"safety officer is not attending any staffing day: {safety}")
    if not manager:
        warnings.append("experimentManager is empty; PM role eligibility cannot be verified")
    if not safety:
        warnings.append("safetyOfficer is empty; safety attendance cannot be verified")


def validate_site_trucks(payload: dict, sites: list[dict[str, str]], errors: list[str]) -> None:
    required = as_int(payload.get("trucksRequired")) or 0
    site_name = normalize(payload.get("site"))
    if not required and site_name == "קציעות":
        required = 2
    planned = 0
    for vehicle in payload.get("vehicles", []) or []:
        name = normalize(vehicle.get("name"))
        if "משאית" in name or "truck" in name.lower():
            planned += 1
    if required and planned < required:
        errors.append(f"site requires {required} truck(s), but plan includes {planned}")


def validate_vehicles(
    payload: dict,
    members: dict[str, dict[str, str]],
    vehicles: list[dict[str, str]],
    present: list[set[str]],
    errors: list[str],
    warnings: list[str],
) -> None:
    for vehicle in payload.get("vehicles", []) or []:
        name = normalize(vehicle.get("name"))
        master = find_vehicle(name, vehicles)
        capacity = vehicle_capacity(vehicle, master)
        is_trailer = bool(vehicle.get("trailerRequired")) or "נגרר" in name
        is_rental = "מושכר" in name or "rental" in name.lower() or (master and master.get("ownership") == "rental")
        is_truck = "משאית" in name or (master and master.get("vehicle_type") == "truck")

        if capacity is None:
            warnings.append(f"vehicle capacity unavailable, cannot verify capacity: {name}")

        for idx, day in enumerate(vehicle.get("days", []) or []):
            for prefix, label in (("out", "outbound"), ("ret", "return")):
                people = vehicle_leg_people(day, prefix)
                if not people:
                    continue
                commander = people[0]
                if capacity is not None and len(people) > capacity:
                    errors.append(f"{name} {label} day {idx + 1} has {len(people)} people, capacity {capacity}")
                if is_truck and len(people) > 1:
                    errors.append(f"{name} {label} day {idx + 1} has more than one team person")
                if is_trailer:
                    row = members.get(commander)
                    if not row:
                        errors.append(f"{name} {label} trailer commander not found in members.csv: {commander}")
                    elif not is_yes(row.get("trailer_license")):
                        errors.append(f"{name} {label} trailer commander lacks trailer_license=כן: {commander}")
                if is_rental:
                    row = members.get(commander)
                    if not row:
                        errors.append(f"{name} {label} rental commander not found in members.csv: {commander}")
                    elif normalize(row.get("can_drive_rental")) == "לא":
                        errors.append(f"{name} {label} rental commander cannot drive rentals: {commander}")
                if idx < len(present) and commander not in present[idx]:
                    warnings.append(f"{name} {label} commander not listed in staffing day {idx + 1}: {commander}")


def validate_accommodation(
    payload: dict,
    members: dict[str, dict[str, str]],
    errors: list[str],
    warnings: list[str],
) -> None:
    acc = payload.get("accommodation") or {}
    if not acc:
        return
    gender_keys = [key for key in next(iter(members.values()), {}).keys() if key.lower() in {"gender", "sex"} or key == "מין"]
    gender_key = gender_keys[0] if gender_keys else None
    if not gender_key:
        warnings.append("members.csv has no gender column; room gender sharing cannot be fully verified")

    assigned: set[str] = set()
    for unit in acc.get("units", []) or []:
        for room in unit.get("rooms", []) or []:
            room_name = f"{normalize(unit.get('name'))}/{normalize(room.get('name'))}"
            capacity = as_int(room.get("capacity"))
            if not capacity:
                errors.append(f"room capacity missing or invalid: {room_name}")
                continue
            for idx, occupants in enumerate(room.get("nights", []) or []):
                names = [normalize(name) for name in occupants if normalize(name)]
                assigned.update(names)
                if len(names) > capacity:
                    errors.append(f"{room_name} night {idx + 1} has {len(names)} occupants, capacity {capacity}")
                if gender_key:
                    genders = {normalize(members.get(name, {}).get(gender_key)) for name in names}
                    genders.discard("")
                    if len(genders) > 1:
                        errors.append(f"{room_name} night {idx + 1} mixes genders: {', '.join(names)}")
                    for name in names:
                        if name not in members:
                            warnings.append(f"room occupant not found in members.csv: {name}")
                        elif not normalize(members[name].get(gender_key)):
                            warnings.append(f"room occupant has unknown gender: {name}")

    if str(payload.get("overnight", "")).lower() in {"yes", "true", "כן"}:
        for name in set().union(*staffing_by_day(payload)) if staffing_by_day(payload) else set():
            if name not in assigned:
                warnings.append(f"overnight plan has attendee without lodging assignment: {name}")


def validate_food(payload: dict, errors: list[str], warnings: list[str]) -> None:
    food = payload.get("foodOrders") or {}
    if not food:
        return
    special_total = food_special_total(food)
    grouped: dict[tuple[str, str], list[dict]] = {}
    for meal in (food.get("meals") or food.get("orders") or []):
        key = (normalize(meal.get("date")), normalize(meal.get("meal")))
        grouped.setdefault(key, []).append(meal)
        headcount = as_int(meal.get("headcount"))
        standard = as_int(meal.get("standardCount"))
        if standard is not None and headcount is not None and standard > headcount:
            errors.append(f"food {key}: standardCount {standard} exceeds headcount {headcount}")

    for key, meals in grouped.items():
        headcounts = {as_int(meal.get("headcount")) for meal in meals if as_int(meal.get("headcount")) is not None}
        if len(headcounts) > 1:
            errors.append(f"food {key}: conflicting headcounts {sorted(headcounts)}")
            continue
        if not headcounts:
            warnings.append(f"food {key}: missing headcount")
            continue
        headcount = headcounts.pop()
        standard = max((as_int(meal.get("standardCount")) or 0 for meal in meals), default=0)
        alternate = sum(as_int(meal.get("amount")) or 0 for meal in meals if not as_int(meal.get("standardCount")))
        if standard + special_total + alternate < headcount:
            errors.append(
                f"food {key}: headcount {headcount} exceeds standardCount {standard} + specials {special_total} + alternate orders {alternate}"
            )

def main(path: str) -> int:
    payload=json.loads(Path(path).read_text(encoding="utf-8"))
    errors,warnings=validate(payload)
    for w in warnings:
        print(f"warning: {w}", file=sys.stderr)
    if errors:
        for e in errors: print(e, file=sys.stderr)
        return 1
    print("weekly_plan payload passes operational validation")
    return 0

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: python planner/validator.py path/to/weekly_plan.json", file=sys.stderr)
        raise SystemExit(2)
    raise SystemExit(main(sys.argv[1]))
