# How to Talk to the Logistics Agent

## One-time setup
1. Go to claude.ai → Projects → New Project → name it "Experiment Logistics"
2. Paste CLAUDE.md contents into Project Instructions
3. Upload to Project Knowledge: SKILL.md, members.csv, vehicles.csv, experiment_sites.csv, hostels.csv

## Every week
1. Start a new conversation in the Project
2. Say: "I have an experiment at [site] on [days]"
3. Agent asks for מנהל ניסוי and קצין בטיחות — confirm them
4. Agent generates blank template xlsx — download and fill in staffing + vehicles
5. Upload filled template and say: "Here is the filled template"
6. Agent returns 3-sheet plan — review and discuss

## When data changes
- New team member → add row to data/members.csv, re-upload to Project
- New vehicle → add row to data/vehicles.csv, re-upload
- New experiment site → add row to data/experiment_sites.csv, re-upload
- New hostel → add rows to data/hostels.csv, re-upload
