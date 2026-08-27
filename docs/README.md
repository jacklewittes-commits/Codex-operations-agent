# Codex Agent Docs

This directory documents the Codex-native Flight Test logistics agent. The PM-facing product is a Google Sheet, while local JSON and scripts are internal plumbing.

## Read First
- `HOW_TO_USE.md` - PM and operator workflow.
- `ARCHITECTURE.md` - current system design and module responsibilities.
- `../AGENTS.md` - repo-level agent behavior.
- `../skills/weekly-logistics/SKILL.md` - weekly planning entrypoint.

## Product Boundaries
- Weekly planning includes staffing, vehicles, lodging, food, and review flags.
- Food planning is part of weekly planning or weekly food revision.
- Monthly planning produces calendar Sheets only.
- Drive folders are publishing destinations, not standing context sources.
