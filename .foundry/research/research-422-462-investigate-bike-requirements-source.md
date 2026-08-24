---
id: research-422-462-investigate-bike-requirements-source
type: RESEARCH
title: Investigate Bike Requirements Source for RouteRadarHeatmap
status: CANCELLED
owner_persona: researcher
created_at: '2026-08-23'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-413-422-update-route-radar-controller
tags:
  - gen3
  - map
  - radar
research_references: []
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# Investigate Bike Requirements Source for RouteRadarHeatmap

## Context
The `RouteRadarHeatmap` interface and `calculateHeatmap` function in `RouteRadarController` need to be updated to include bike requirements (`requiresMachBike`, `requiresAcroBike`). However, it is unclear where this data should be sourced from within the `calculateHeatmap` context. The `parseBikeRequirements` function exists in `src/engine/gen3/mapParsing/mapRequirements.ts` but requires a `metatiles` array, which is not available in the `UnifiedLocation` schema or `Suggestion` types.

## Objectives
1. Determine the source of the `metatiles` array for map definitions or if the bike requirements should be pre-calculated and stored in the database (`UnifiedLocation`).
2. Identify how `calculateHeatmap` can access this information efficiently.
3. Recommend structural changes to schema or interfaces to facilitate this.

## Acceptance Criteria
- [ ] researcher: Determine how and where bike requirements should be stored and accessed.
- [ ] researcher: Provide actionable steps for the coder to implement the data sourcing for `RouteRadarController`.
