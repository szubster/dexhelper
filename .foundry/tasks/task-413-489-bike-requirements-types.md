---
id: task-413-489-bike-requirements-types
type: TASK
title: Define Bike Requirement Types for Route Radar
status: ACTIVE
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on:
  - research-413-493-investigate-bike-requirements-source
jules_session_id: '8659152214950487224'
pr_number: null
parent: story-406-413-bike-requirement-heatmap
tags:
  - gen3
  - map
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Define Bike Requirement Types for Route Radar

## Context
We need to expose bike requirements in the Route Radar heatmap. The database (UnifiedLocation) does not store this, so it must be injected via context or suggestions.

## Proposal
Update the types in src/engine/assistant/strategies/types.ts and src/engine/radar/RouteRadarController.ts to include requiresMachBike and requiresAcroBike.

## Acceptance Criteria
- [ ] coder: Update RouteRadarHeatmap to store an object with density, requiresMachBike, and requiresAcroBike instead of a plain number.
- [ ] coder: Extend Suggestion or EncounterDetail to optionally include bike requirements.
