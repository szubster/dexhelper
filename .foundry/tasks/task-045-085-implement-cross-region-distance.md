---
id: task-045-085-implement-cross-region-distance
type: TASK
title: Implement Gen 2 Cross-Region Distance Algorithm
status: COMPLETED
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
rejection_count: 2
rejection_reason: Merged with unfulfilled acceptance criteria
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

Please add these checks to your execution plan.
