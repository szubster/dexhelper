---
id: task-045-086-qa-cross-region-distance
type: TASK
title: 'QA: Gen 2 Cross-Region Distance Algorithm'
status: COMPLETED
owner_persona: qa
created_at: '2026-05-14'
updated_at: '2026-05-16'
depends_on:
  - .foundry/tasks/task-045-085-implement-cross-region-distance.md
jules_session_id: null
pr_number: null
parent: story-028-045-cross-region-distance
tags:
  - gen2
  - map-graph
  - routing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA: Gen 2 Cross-Region Distance Algorithm

## Objective
Verify the implementation of `getDistanceToMap` algorithms adapted for Gen 2 transition points.

## Requirements
- Verify that `getDistanceToMap` handles calculating distances across the Johto/Kanto region boundary.
- Ensure that the transition points (Magnet Train, S.S. Aqua, Route 27) are accounted for in the algorithm.
- Validate the logic against expected values in tests or specific known routes.

## Acceptance Criteria
- [x] `getDistanceToMap` handles calculating distances across the Johto/Kanto region boundary accurately.
- [x] Tests confirm that transition points (Magnet Train, S.S. Aqua, Route 27) are correctly factored into distance calculations.

## Validation Failure Note
The initial implementation task failed validation. The Tech Lead (myself) has instructed the `coder` to investigate whether the intermediate cross-region maps are correctly registered in the `locationMap` for the Floyd-Warshall precomputation during the build step (`scripts/generate-pokedata.ts`). You must explicitly verify that distance calculations span the Johto/Kanto region boundary correctly. Ensure that the distance matrix accurately reflects paths passing through cross-region hubs (Route 26, Saffron City, Vermilion City) without errors.
