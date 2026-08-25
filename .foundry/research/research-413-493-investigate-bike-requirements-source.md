---
id: research-413-493-investigate-bike-requirements-source
type: RESEARCH
title: Investigate Bike Requirements Source for RouteRadarHeatmap
status: PENDING
owner_persona: researcher
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-406-413-bike-requirement-heatmap
tags:
  - gen3
  - map
  - radar
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Bike Requirements Source for RouteRadarHeatmap

## Context
The RouteRadarHeatmap interface and calculateHeatmap function in RouteRadarController need to be updated to include bike requirements (requiresMachBike, requiresAcroBike). However, it is unclear where this data should be sourced from within the calculateHeatmap context. The parseBikeRequirements function exists in src/engine/gen3/mapParsing/mapRequirements.ts but requires a metatiles array, which is not available in the UnifiedLocation schema or Suggestion types.

## Objectives
1. Determine the source of the metatiles array for map definitions or if the bike requirements should be pre-calculated and stored in the database (UnifiedLocation) or injected via suggestions.
2. Identify how calculateHeatmap can access this information efficiently.
3. Recommend structural changes to schema or interfaces to facilitate this.

## Acceptance Criteria
- [ ] researcher: Determine how and where bike requirements should be stored and accessed.
- [ ] researcher: Provide actionable steps for the coder to implement the data sourcing for RouteRadarController.
