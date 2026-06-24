---
id: task-061-115-gen3-distance-lookup-qa
type: TASK
title: QA Gen3 getDistanceToMap
status: COMPLETED
owner_persona: qa
created_at: '2026-05-18'
updated_at: '2026-05-19'
depends_on: []jules_session_id: null
pr_number: null
parent: story-032-061-gen3-distance-lookup
tags:
  - gen3
  - map-graph
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Verifies distance lookup logic.
---

# Task: QA Gen3 getDistanceToMap

## Objective
Verify that `getDistanceToMap` accurately returns distances using the precomputed matrix and test performance.

## Requirements
- Write unit tests in `src/engine/mapGraph/gen3Graph.test.ts`.
- Ensure `getDistanceToMap` yields accurate distances to target areas.
- Verify O(1) performance lookup behavior.

## Acceptance Criteria
- [x] Unit tests for `getDistanceToMap` cover various scenarios (direct connection, no connection, same location).
- [x] All tests pass successfully.
