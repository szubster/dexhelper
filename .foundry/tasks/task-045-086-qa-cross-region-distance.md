---
id: task-045-086-qa-cross-region-distance
type: TASK
title: 'QA: Gen 2 Cross-Region Distance Algorithm'
status: PENDING
owner_persona: qa
created_at: '2026-05-14'
updated_at: '2026-05-14'
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
