---
id: story-028-045-cross-region-distance
type: STORY
title: 'Phase 3: Cross-Region Distance'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-08'
updated_at: '2026-05-16'
depends_on:
  - story-028-044-indoor-outdoor-resolution
jules_session_id: null
pr_number: null
parent: epic-017-028-map-graph-routing
tags:
  - gen2
  - expansion
  - map-graph
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 2
rejection_reason: Implementation task task-045-085 failed validation.
notes: ''
---

# Phase 3: Cross-Region Distance

## Objective
Implement `getDistanceToMap` algorithms adapted for Gen 2 transition points.

## Requirements
- Implement pathfinding/distance algorithms (like `getDistanceToMap`) for Gen 2 map graph.
- Handle cross-region distances via transitions (e.g., Magnet Train, S.S. Aqua, Route 27).

## Generated Tasks
- [.foundry/tasks/task-045-085-implement-cross-region-distance.md](.foundry/tasks/task-045-085-implement-cross-region-distance.md)
- [.foundry/tasks/task-045-086-qa-cross-region-distance.md](.foundry/tasks/task-045-086-qa-cross-region-distance.md)

## Acceptance Criteria
- [x] Create implementation task.
- [x] Create QA task.
