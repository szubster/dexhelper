---
id: epic-017-028-map-graph-routing
type: EPIC
title: "Phase 3: Johto/Kanto Map Graph Routing"
status: PENDING
owner_persona: story_owner
created_at: "2026-05-06"
updated_at: "2026-05-06"
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/prds/prd-006-017-gen2-expansion-phase-3-4.md
tags:
  - gen2
  - expansion
  - map-graph
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Phase 3: Johto/Kanto Map Graph Routing

## Objective
Implement the dual-region map graph for Johto and Kanto to support Gen 2 traversal and location resolution.

## Requirements
- **Gen 2 Map Graph**: Create a comprehensive map graph for Johto and Kanto.
- **Indoor to Outdoor Resolution**: Implement `resolveOutdoorMapId` mapping Johto and Kanto indoor locations to their outdoor hubs.
- **Cross-Region Distance**: Implement `getDistanceToMap` algorithms adapted for Gen 2 transition points (e.g., Magnet Train, S.S. Aqua, and Route 27).

## Acceptance Criteria
- [ ] Map graph for Johto and Kanto is fully implemented.
- [ ] `resolveOutdoorMapId` correctly maps indoor locations to outdoor hubs.
- [ ] `getDistanceToMap` handles cross-region distances via transitions.
