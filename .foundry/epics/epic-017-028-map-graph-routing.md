---
id: epic-017-028-map-graph-routing
type: EPIC
title: 'Phase 3: Johto/Kanto Map Graph Routing'
status: "COMPLETED"
owner_persona: story_owner
created_at: '2026-05-06'
updated_at: "2026-05-09"
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-006-017-gen2-expansion-phase-3-4
tags:
  - gen2
  - expansion
  - map-graph
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Phase 3: Johto/Kanto Map Graph Routing

## Objective
Implement the dual-region map graph for Johto and Kanto to support Gen 2 traversal and location resolution.

## Requirements
- **Gen 2 Map Graph**: Create a comprehensive map graph for Johto and Kanto.
- **Indoor to Outdoor Resolution**: Implement `resolveOutdoorMapId` mapping Johto and Kanto indoor locations to their outdoor hubs.
- **Cross-Region Distance**: Implement `getDistanceToMap` algorithms adapted for Gen 2 transition points (e.g., Magnet Train, S.S. Aqua, and Route 27).

## Acceptance Criteria
- [x] Map graph for Johto and Kanto is fully implemented.
- [x] `resolveOutdoorMapId` correctly maps indoor locations to outdoor hubs.
- [x] `getDistanceToMap` handles cross-region distances via transitions.

## Created Stories
- [.foundry/stories/story-028-043-gen2-map-graph.md](.foundry/stories/story-028-043-gen2-map-graph.md)
- [.foundry/stories/story-028-044-indoor-outdoor-resolution.md](.foundry/stories/story-028-044-indoor-outdoor-resolution.md)
- [.foundry/stories/story-028-045-cross-region-distance.md](.foundry/stories/story-028-045-cross-region-distance.md)
