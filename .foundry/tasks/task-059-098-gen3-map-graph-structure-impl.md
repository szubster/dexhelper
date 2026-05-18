---
id: task-059-098-gen3-map-graph-structure-impl
type: TASK
title: Implement Gen3 Map Graph Structure
status: COMPLETED
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-032-059-gen3-map-graph-structure
tags:
  - gen3
  - map-graph
research_references: []
rejection_count: 1
rejection_reason: The coder did not implement gen3Graph.ts.
notes: ''
---

# Task: Implement Gen3 Map Graph Structure

## Objective
Implement the `gen3Graph.ts` file according to the specifications in ADR 010.

## Requirements
- Create `src/engine/mapGraph/gen3Graph.ts`.
- Implement `getDistanceToMap(startMapId, targetAid)`: It must use the precomputed Floyd-Warshall distance lookup stored on the `UnifiedLocation` objects (via the `dist` array) to ensure O(1) performance during strategy evaluation.
- Implement `resolveOutdoorMapId(mapId)`: It must map indoor locations (like houses or caves) to their outdoor parent hubs by recursively traversing the `prnt` property on the location objects, matching the pattern established in `gen1Graph.ts` and `gen2Graph.ts`.
- Define and export map connectivity constants for the Gen 3 structures.

## Acceptance Criteria
- [x] `gen3Graph.ts` is created and exports `getDistanceToMap` and `resolveOutdoorMapId`.
- [x] O(1) distance lookups via the `dist` array are implemented.
- [x] Recursive `prnt` traversal for outdoor map resolution is implemented.
