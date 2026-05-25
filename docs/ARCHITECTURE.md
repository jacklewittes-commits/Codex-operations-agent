# Experiment Logistics Agent - Migration and Architecture Summary

## Overview

This project started as a Claude-based operational logistics agent and was migrated into a Codex-compatible repository structure.

The agent supports weekly experiment planning for the Flight Test Division. The PM interacts with the agent in natural language and does not write JSON or manually structure data.

The agent is responsible for:

- understanding the upcoming experiment
- planning logistics
- validating operational constraints
- generating the standardized operational Google Sheet
- publishing the approved sheet to the designated Google Drive folder

The generated Google Sheet is the primary artifact of the system.

## Core Operational Flow

PM conversation -> agent intake/questions -> internal structured plan -> validation -> Google Sheets renderer -> Google Drive publishing -> PM review/revisions

The PM may ask the agent to revise the plan, or manually edit the Google Sheet afterward.

## Architectural Decisions

### Google Apps Script Payload Schema Is The Source Of Truth

The Apps Script renderer defines the canonical structure of the weekly plan.

The local Excel generator currently diverges and should eventually be updated to match the schema or deprecated.

The authoritative output path is:

weekly plan schema -> Apps Script renderer -> native Google Sheet

### JSON Is Internal Only

The PM never interacts with JSON directly.

The agent may internally generate structured objects, validation payloads, and intermediate schemas, but these are hidden from the PM.

### Google Sheet Is The Operational Product

The system is not just a planning chatbot. It is an operational logistics planning system whose output is a formatted Google Sheet used by the experiment team during execution.

The renderer creates tabs, formats sheets, and produces staffing plans, lodging assignments, vehicle assignments, and operational review sheets.

## Drive Publishing Policy

The agent publishes only after PM approval.

The agent must not:

- browse Drive
- inspect other folders
- list files
- search Drive

The configured Drive folder is only a publishing destination.

Folder:
https://drive.google.com/drive/folders/1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV

Folder ID:
`1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV`

Naming convention:
`aa-bb.mm_plan`

Example:
`01-03.06_plan`

## Repository Structure

```text
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
├── schemas/
│   └── weekly_plan.schema.json
├── planner/
│   ├── validator.py
│   ├── naming.py
│   ├── intake_parser.py
│   └── revision_engine.py
├── integrations/
│   └── google_sheets/
│       ├── apps_script.js
│       ├── webhook_client.py
│       └── deploy.md
├── data/
│   ├── members.csv
│   ├── vehicles.csv
│   ├── hostels.csv
│   ├── experiment_sites.csv
│   └── README.md
├── examples/
├── outputs/
└── tests/
```

## Data And Context Separation

One of the biggest architecture corrections was separating factual data from operational reasoning.

Previous state:

- CSV files incorrectly contained instructions, context, and logic.
- Operational data was embedded in Apps Script.

Current state:

- CSV files contain only structured factual data.
- Skills contain operational logic and context.
- Apps Script only renders Sheets.

Rule:

- `skills/` = operational reasoning
- `data/` = factual structured datasets
- `integrations/` = rendering and publishing

## Operational Datasets

### members.csv

Contains:

- name
- team
- position
- can load
- trailer license
- rental permissions

Important updates:

- everyone currently marked as capable of loading
- ספי marked as Manager
- Kira rental restriction represented structurally instead of notes

### vehicles.csv

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

This logic is documented in `skills/weekly-logistics/references/fleet_context.md`.

### hostels.csv

Hostel inventory currently extracted from historical weekly plans.

Current hostels are in עין יהב.

Additional locations and hostels will likely be added later.

## Skill Behavior

The skill currently teaches the agent to:

- intake PM context conversationally
- ask only blocking questions
- infer missing structure
- create weekly logistics plans
- validate constraints
- generate the operational Google Sheet
- return review guidance
- revise plans iteratively

## Current Status

Current maturity: `v0.1.0`

This represents:

- successful migration into Codex architecture
- working repository structure
- initial operational datasets
- Google Sheets renderer integration
- planning workflow definition

Not yet complete:

- stable planning engine
- fully aligned validator
- production-grade schema enforcement
- vendor integrations
- automatic conflict resolution
- automated routing optimization

## Known Technical Gap

There are currently two output systems:

1. Google Apps Script renderer
2. Local Excel generator

They are not fully aligned. The Apps Script payload schema should become the single canonical schema moving forward.

## Recommended Next Steps

1. Consolidate around the Apps Script schema.
2. Strengthen schema validation.
3. Improve planner engine.
4. Build realistic PM conversation examples.
5. Test the full Google Sheet publishing flow.
6. Add vendor/contact integrations later.

## Long-Term Vision

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
