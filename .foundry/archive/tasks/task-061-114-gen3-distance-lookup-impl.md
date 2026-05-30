---
id: task-061-114-gen3-distance-lookup-impl
type: TASK
title: Implement Gen3 getDistanceToMap
status: COMPLETED
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-032-061-gen3-distance-lookup
tags:
  - gen3
  - map-graph
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Implements O(1) distance lookup for Gen 3 based on precomputed matrices.
---

# Task: Implement Gen3 getDistanceToMap

## Objective
Implement `getDistanceToMap` with precomputed distance matrix logic for Gen 3.

## Requirements
- Take `startMapId` and `targetAid`.
- Use a precomputed Floyd-Warshall distance lookup stored on `UnifiedLocation` objects (via `dist` array).
- Ensure O(1) performance during strategy evaluation.
- Implement this in `src/engine/mapGraph/gen3Graph.ts`.

## Acceptance Criteria
- [x] `getDistanceToMap` is implemented and exports the required signature.
- [x] `getDistanceToMap` correctly utilizes the `dist` array from `UnifiedLocation` for O(1) lookups.
