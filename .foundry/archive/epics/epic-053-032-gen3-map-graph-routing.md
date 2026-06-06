---
id: epic-053-032-gen3-map-graph-routing
type: EPIC
title: Gen 3 Map Graph Routing
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-17'
updated_at: '2026-05-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-053-023-gen3-map-graph
tags:
  - gen3
  - map-graph
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Created by architect.
---

# Epic: Gen 3 Map Graph Routing

## Objective
Implement the map graph for Generation 3, supporting routing and distance calculation for both Hoenn (Ruby, Sapphire, Emerald) and Kanto (FireRed, LeafGreen).

## Requirements
- **Gen 3 Map Graph**: Create a unified map graph structure in `src/engine/mapGraph/gen3Graph.ts` covering Hoenn and Kanto.
- **Indoor to Outdoor Resolution**: Implement `resolveOutdoorMapId` mapped to Gen 3 map ID structures.
- **Cross-Region/Distance Lookup**: Implement `getDistanceToMap` algorithms leveraging the precomputed Floyd-Warshall distance lookup matrix for Gen 3.

## Acceptance Criteria
- [x] `gen3Graph.ts` is implemented and unit tested.
- [x] `resolveOutdoorMapId` accurately determines the outdoor parent map ID for both Hoenn and Kanto Gen 3 internal structures.
- [x] `getDistanceToMap` yields accurate distances to target areas.

## Created Stories
<!-- Planner will add stories here -->
- [.foundry/stories/story-032-059-gen3-map-graph-structure.md](./../stories/story-032-059-gen3-map-graph-structure.md)
- [.foundry/stories/story-032-060-gen3-indoor-resolution.md](./../stories/story-032-060-gen3-indoor-resolution.md)
- [.foundry/stories/story-032-061-gen3-distance-lookup.md](./../stories/story-032-061-gen3-distance-lookup.md)
