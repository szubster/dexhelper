---
id: research-044-207-investigate-roamer-location-failure
type: RESEARCH
title: Investigate Gen 3 Roamer Location Failure at Epic Level
status: PENDING
owner_persona: researcher
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - map
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Location Failure at Epic Level

## Objective
Formally investigate and document the impossibility of extracting Gen 3 roamer locations at the macro Epic level, ensuring the dashboard UI can be re-architected safely without map dependencies.

## Context
The previous attempt to build the Gen 3 Roamer Location Radar (`epic-044-072-gen3-roamer-location-radar`) permanently failed because the roamer's active map coordinates are stored dynamically in EWRAM and never serialized into the `.sav` file (as established in `adr-108-027`). Because of this, the downstream UI Epic (`epic-044-073`) which depended on the radar also became an orphaned impossible node. We need a formal research task to validate the constraints for the new v2 dashboard.

## Acceptance Criteria
- [ ] Review `adr-108-027-gen3-roamer-location-impossible` to confirm the architectural constraints regarding EWRAM and the `.sav` file.
- [ ] Determine what UI elements (if any) can still be safely displayed for the roamer given the lack of location data.
- [ ] Output a definitive recommendation for the new Roamer Dashboard UI architecture.
