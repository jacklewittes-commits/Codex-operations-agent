# Experiment Logistics Agent

PM-facing agent for weekly field experiment logistics. The PM provides natural-language context; the agent validates staffing, vehicles, trips, and rooms, then creates the standard formatted Google Sheet in the designated Google Drive folder.

## Current structure
- `skills/weekly-logistics/` — Codex/ChatGPT skill instructions and references.
- `schemas/weekly_plan.schema.json` — internal payload schema for the sheet renderer.
- `integrations/google_sheets/` — Apps Script renderer and webhook client.
- `planner/` — placeholders for deterministic parsing, planning, validation, and revision modules.
- `data/` — master team/vehicle/location/lodging data.
- `examples/weekly_plan_example.json` — sample renderer payload.


# Migration & Architecture Summary

## Overview

This project started as a Claude-based operational logistics agent and was migrated into a Codex-compatible repository structure.

The agent is intended to support weekly experiment planning for the Flight Test Division.

The PM interacts with the agent in natural language. The PM does NOT write JSON or manually structure data.

The agent’s responsibility is to:
- understand the upcoming experiment
- plan logistics
- validate operational constraints
- generate the standardized operational Google Sheet
- publish the approved sheet to the designated Google Drive folder

The generated Google Sheet is the PRIMARY artifact of the system.

---

# Core Operational Flow

PM conversation
→ agent intake/questions
→ internal structured plan
→ validation
→ Google Sheets renderer
→ Google Drive publishing
→ PM review/revisions

The PM may:
- ask the agent to revise the plan
- or manually edit the Google Sheet afterward

---

# Important Architectural Decisions

## 1. Google Apps Script payload schema is the source of truth

The Apps Script renderer defines the canonical structure of the weekly plan.

The local Excel generator currently diverges and should eventually be:
- updated to match the schema
OR
- deprecated

The authoritative output path is:

weekly_plan schema
→ Apps Script renderer
→ native Google Sheet

---

## 2. JSON is internal only

The PM never interacts with JSON directly.

The agent may internally generate:
- structured objects
- validation payloads
- intermediate schemas

…but this is hidden from the PM.

---

## 3. Google Sheet is the operational product

The system is NOT just a planning chatbot.

It is an operational logistics planning system whose output is:
- a formatted Google Sheet
- used by the experiment team during execution

The renderer:
- creates tabs
- formats sheets
- creates staffing plans
- creates lodging assignments
- creates vehicle assignments
- creates operational review sheets

---

# Drive Publishing Policy

The agent publishes ONLY after PM approval.

The agent:
- must NOT browse Drive
- must NOT inspect other folders
- must NOT list files
- must NOT search Drive

The configured Drive folder is ONLY a publishing destination.

Folder:
https://drive.google.com/drive/folders/1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV

Folder ID:
1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV

Naming convention:
aa-bb.mm_plan

Example:
01-03.06_plan

---

# Current Repo Structure

experiment-logistics-agent/

├── AGENTS.md
├── skills/
│   └── weekly-logistics/
│       ├── SKILL.md
│       ├── pm_intake.md
│       ├── planning_rules.md
│       ├── output_contract.md
│       ├── review_checklist.md
│       └── references/
│           ├── fleet_context.md
│           ├── publishing_policy.md
│           ├── context_relocation.md
│           └── data_extraction_notes.md
│
├── schemas/
│   └── weekly_plan.schema.json
│
├── planner/
│   ├── validator.py
│   ├── naming.py
│   ├── intake_parser.py
│   └── revision_engine.py
│
├── integrations/
│   └── google_sheets/
│       ├── apps_script.js
│       ├── webhook_client.py
│       └── deploy.md
│
├── data/
│   ├── members.csv
│   ├── vehicles.csv
│   ├── hostels.csv
│   ├── experiment_sites.csv
│   └── README.md
│
├── examples/
├── outputs/
└── tests/

---

# Important Data/Context Separation

One of the biggest architecture corrections made today:

OLD STATE:
- CSV files incorrectly contained instructions/context/logic
- operational data was embedded in Apps Script

NEW STATE:
- CSV files contain ONLY structured factual data
- Skills contain operational logic/context
- Apps Script only renders Sheets

Rule:

skills/ = operational reasoning
data/ = factual structured datasets
integrations/ = rendering and publishing

---

# Current Operational Datasets

## members.csv

Contains:
- name
- team
- position
- can_load
- trailer license
- rental permissions

Important updates:
- everyone currently marked as capable of loading
- ספי marked as "Manager"
- Kira rental restriction represented structurally instead of notes

---

## vehicles.csv

Important fleet context:

- טנדר = pickup truck
- נגרר = trailer

Current assumptions:
- 2 company pickups
- 2 company trailers
- Hyundais are company vehicles
- RAV4/Toyota is company vehicle
- Jumpy and some others may be rented weekly
- rental vehicles are common operationally

This logic is documented in:
skills/weekly-logistics/references/fleet_context.md

---

## hostels.csv

Hostel inventory currently extracted from historical weekly plans.

Current hostels are in:
עין יהב

Additional locations/hostels will likely be added later.

---

# Skills / Agent Behavior

The Skill currently teaches the agent to:

- intake PM context conversationally
- ask only blocking questions
- infer missing structure
- create weekly logistics plans
- validate constraints
- generate the operational Google Sheet
- return review guidance
- revise plans iteratively

---

# Current Status

Current maturity:
v0.1.0

This represents:
- successful migration into Codex architecture
- working repository structure
- initial operational datasets
- Google Sheets renderer integration
- planning workflow definition

NOT yet complete:
- stable planning engine
- fully aligned validator
- production-grade schema enforcement
- vendor integrations
- automatic conflict resolution
- automated routing optimization

---

# Current Known Technical Gap

There are currently TWO output systems:

1. Google Apps Script renderer
2. Local Excel generator

They are NOT fully aligned.

The Apps Script payload schema should become the single canonical schema moving forward.

---

# Next Recommended Steps

1. Consolidate around the Apps Script schema
2. Strengthen schema validation
3. Improve planner engine
4. Build realistic PM conversation examples
5. Test full Google Sheet publishing flow
6. Add vendor/contact integrations later

---

# Long-Term Vision

This is evolving into an operational logistics orchestration agent for field experiments.

Potential future capabilities:
- vendor coordination
- lodging booking
- food ordering
- multi-week planning
- vehicle optimization
- staffing balancing
- route planning
- conflict simulation
- automated operational alerts

The Google Sheet remains the central operational interface for humans.
