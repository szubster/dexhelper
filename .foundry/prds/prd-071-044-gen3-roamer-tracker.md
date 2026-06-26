---
id: prd-071-044-gen3-roamer-tracker
type: PRD
title: Gen 3 Roaming Legendary Tracker and IV Glitch Inspector
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-06-09'
updated_at: '2026-06-26'
depends_on:
  - research-071-138-gen3-roamer-offsets
jules_session_id: '4609885172036957237'
pr_number: null
parent: idea-071-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - iv-glitch
research_references: []
rejection_count: 0
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

- [x] .foundry/epics/epic-044-070-gen3-roamer-core-extraction.md
- [ ] .foundry/epics/epic-044-101-gen3-roamer-core-extraction-v2.md
- [x] .foundry/epics/epic-044-071-gen3-roamer-iv-glitch.md
- [ ] .foundry/epics/epic-044-102-gen3-roamer-iv-glitch-v2.md
- [x] .foundry/epics/epic-044-072-gen3-roamer-location-radar.md
- [x] .foundry/epics/epic-044-073-gen3-roamer-dashboard-ui.md
- [ ] .foundry/research/research-044-207-gen3-roamer-ui-alternatives.md
- [ ] .foundry/epics/epic-044-096-gen3-roamer-dashboard-ui-v2.md
