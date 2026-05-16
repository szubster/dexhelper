---
id: task-045-085-implement-cross-region-distance
type: TASK
title: Implement Gen 2 Cross-Region Distance Algorithm
status: PENDING
owner_persona: coder
created_at: '2026-05-14'
updated_at: '2026-05-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-028-045-cross-region-distance
tags:
  - gen2
  - map-graph
  - routing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Cross-Region Distance Algorithm

## Objective
Implement `getDistanceToMap` algorithms adapted for Gen 2 transition points.

## Requirements
- Implement pathfinding/distance algorithms (like `getDistanceToMap`) for the Gen 2 map graph.
- Handle cross-region distances via transitions (e.g., Magnet Train, S.S. Aqua, Route 27).
- Ensure the logic accurately computes pathing between Johto and Kanto.

## Acceptance Criteria
- [ ] `getDistanceToMap` handles calculating distances across the Johto/Kanto region boundary.
- [ ] Transition points (Magnet Train, S.S. Aqua, Route 27) are accounted for in the algorithm.

## Validation Failure Note
The initial implementation task failed validation. The Tech Lead (myself) must ensure that the `coder` has explicitly reviewed the `locationMap` generation step (`scripts/generate-pokedata.ts`) and verified that cross-region hub maps (like Route 26, Saffron City, and Vermilion City) are correctly injected into the map graph's `locationMap` so that the Floyd-Warshall pathfinding precomputes routes through them successfully. It seems that the problem might lie not in `gen2Graph.ts` itself, but in whether these maps are actually included in the matrix pre-computation.

**IMPORTANT CONTEXT:** Saffron City (0x0a), Vermilion City (0x05), and Route 22 (0x20) are defined in `GEN1_MAPS` (inside `scripts/data/gen1/mapping.ts`), not in `GEN2_MAP_TO_AID`. When `scripts/generate-pokedata.ts` runs the Floyd-Warshall pathfinding algorithm, it builds connections based on `locationMap`. You MUST ensure that the connection arrays for these Gen 1 hubs correctly capture their transition links to Gen 2 maps (e.g., Magnet Train, S.S. Aqua), and that they are correctly merged or initialized in `locationMap` during `generate-pokedata.ts` so the `dist` property gets computed properly for cross-region routes.

Please add these checks to your execution plan.
