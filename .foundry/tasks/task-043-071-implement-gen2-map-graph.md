---
id: task-043-071-implement-gen2-map-graph
type: TASK
title: Implement Gen 2 Map Graph
status: COMPLETED
owner_persona: coder
created_at: '2026-05-09'
updated_at: '2026-05-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-028-043-gen2-map-graph
tags:
  - gen2
  - map-graph
research_references:
  - gen2_implementation_plan
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Map Graph

## Context
As part of the Gen 2 expansion (Phase 3), we need to create a unified map graph for Johto and Kanto. This graph will be used for resolving indoor/outdoor locations, pathfinding, and distance calculations across the dual regions.

## Requirements
- **Create File:** `src/engine/mapGraph/gen2Graph.ts`.
- **Implement Graph Nodes:** Define the graph of connected locations, nodes, and transitions across Johto and Kanto.
- **Reference Material:** Use standard map connections (e.g. Route 27 connecting Johto to Kanto).
- **Export Structure:** Export the defined graph (e.g. `const gen2MapGraph`) in a format similar to existing map structures if available, or appropriate for the `getDistanceToMap` and `resolveOutdoorMapId` logic.

## Acceptance Criteria
- [x] `src/engine/mapGraph/gen2Graph.ts` is created and correctly sets up the map nodes and connectivity for both Johto and Kanto.
