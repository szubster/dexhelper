---
id: story-028-044-indoor-outdoor-resolution
type: STORY
title: 'Phase 3: Indoor to Outdoor Resolution'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-08'
updated_at: '2026-05-13'
depends_on:
  - story-028-043-gen2-map-graph
jules_session_id: null
pr_number: null
parent: epic-017-028-map-graph-routing
tags:
  - gen2
  - expansion
  - map-graph
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Phase 3: Indoor to Outdoor Resolution

## Objective
Implement `resolveOutdoorMapId` mapping Johto and Kanto indoor locations to their outdoor hubs.

## Requirements
- Implement logic to resolve indoor maps (like Pokemon Centers, Gyms, Caves) to their root outdoor hub in `gen2Graph.ts` or related utility.
- Depends on the base map graph structure being defined.

## Acceptance Criteria
- [x] `resolveOutdoorMapId` correctly maps indoor locations to outdoor hubs.

## Generated Tasks
- [.foundry/tasks/task-044-080-implement-indoor-outdoor-resolution.md](.foundry/tasks/task-044-080-implement-indoor-outdoor-resolution.md)
- [.foundry/tasks/task-044-081-qa-indoor-outdoor-resolution.md](.foundry/tasks/task-044-081-qa-indoor-outdoor-resolution.md)
