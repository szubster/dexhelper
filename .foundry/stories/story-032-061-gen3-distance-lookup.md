---
id: story-032-061-gen3-distance-lookup
type: STORY
title: Gen3 Distance Lookup
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on:
  - .foundry/stories/story-032-059-gen3-map-graph-structure.md
jules_session_id: null
pr_number: null
parent: epic-053-032-gen3-map-graph-routing
tags:
  - gen3
  - map-graph
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Depends on map graph structure.
---

# Story: Gen3 Distance Lookup

## Objective
Implement `getDistanceToMap` with precomputed distance matrix logic for Gen 3.

## Requirements
- Take `startMapId` and `targetAid`.
- Use a precomputed Floyd-Warshall distance lookup stored on `UnifiedLocation` objects (via `dist` array).
- Ensure O(1) performance during strategy evaluation.

## Acceptance Criteria
- [x] `getDistanceToMap` yields accurate distances to target areas.
- [x] O(1) performance lookup unit tests pass successfully.

## Created Tasks
- [.foundry/tasks/task-061-114-gen3-distance-lookup-impl.md](./../tasks/task-061-114-gen3-distance-lookup-impl.md)
- [.foundry/tasks/task-061-115-gen3-distance-lookup-qa.md](./../tasks/task-061-115-gen3-distance-lookup-qa.md)
