---
id: research-044-210-investigate-location-radar-failure
type: RESEARCH
title: Investigate Gen 3 Roamer Location Radar Epic Failure
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
research_references:
  - .foundry/epics/epic-044-072-gen3-roamer-location-radar.md
  - .foundry/docs/adrs/adr-108-027-gen3-roamer-location-impossible.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Location Radar Epic Failure

## Objective
Investigate the failure of the Gen 3 Roamer Location Radar epic (`epic-044-072-gen3-roamer-location-radar.md`) and determine the necessary adjustments to the dashboard UI requirements.

## Context
The Gen 3 Roamer Location Radar epic was permanently cancelled by the Auditor because, as established in `adr-108-027-gen3-roamer-location-impossible`, the active map coordinates for a roaming Pokémon are stored dynamically in EWRAM during gameplay and are never serialized to the static save file.

Because `epic-044-073-gen3-roamer-dashboard-ui.md` was waiting on the location radar epic (which is now cancelled), it is stuck in a pending state with a permanently failed dependency.

## Acceptance Criteria
- [ ] Determine how the Gen 3 Roamer Dashboard UI should be redesigned or updated given that location tracking is impossible.
- [ ] Document what alternative UI tracking indicators (if any) are viable using the available roamer flags and IVs.