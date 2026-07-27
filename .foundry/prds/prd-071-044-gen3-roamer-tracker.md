---
id: prd-071-044-gen3-roamer-tracker
type: PRD
title: Gen 3 Roaming Legendary Tracker and IV Glitch Inspector
status: READY
owner_persona: epic_planner
created_at: '2026-06-09'
updated_at: '2026-07-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-071-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - iv-glitch
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---
# PRD: Gen 3 Roaming Legendary Tracker and IV Glitch Inspector

## Purpose
Provide an immediate, exact breakdown of a roaming legendary's internal state (Nature, IVs, HP, location) parsed directly from the `.sav` file.

## Scope
- Parse roamer data structure from Gen 3 save files using DataView.
- Extract and display Nature, IVs, HP, status condition, and location index.
- Detect and display a warning if the "Roamer IV Glitch" affects the Pokémon.
- Provide a Route Radar to map the roamer's current location index.

## Acceptance Criteria
- [x] Break down into Epics
- [x] epic-044-070-gen3-roamer-core-extraction
- [x] epic-044-101-gen3-roamer-core-extraction-v2
- [x] epic-044-071-gen3-roamer-iv-glitch
- [x] epic-044-102-gen3-roamer-iv-glitch-v2
- [x] epic-044-072-gen3-roamer-location-radar
- [x] epic-044-073-gen3-roamer-dashboard-ui
- [x] research-044-207-gen3-roamer-ui-alternatives
- [x] epic-044-096-gen3-roamer-dashboard-ui-v2
- [x] epic-044-122-gen3-roamer-dashboard-ui-v3
- [x] epic-044-145-gen3-roamer-dashboard-ui-v4
- [x] epic-044-146-gen3-roamer-core-extraction-v3
- [x] epic-044-147-gen3-roamer-iv-glitch-v3
- [x] epic-044-149-gen3-roamer-core-extraction-v4
- [x] epic-044-150-gen3-roamer-iv-glitch-v4
- [x] epic-044-148-gen3-roamer-dashboard-ui-v5
- [x] epic-044-151-gen3-roamer-dashboard-ui-v6

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
