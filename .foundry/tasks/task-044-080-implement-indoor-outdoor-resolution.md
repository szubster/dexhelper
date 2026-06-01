---
id: task-044-080-implement-indoor-outdoor-resolution
type: TASK
title: Implement Gen 2 Indoor to Outdoor Map Resolution
status: COMPLETED
owner_persona: coder
created_at: '2026-05-11'
updated_at: '2026-05-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-028-044-indoor-outdoor-resolution
tags:
  - gen2
  - expansion
  - map-graph
research_references:
  - gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Indoor to Outdoor Map Resolution

## Context
As part of the Gen 2 map routing infrastructure, we need to correctly resolve indoor maps (like Pokemon Centers, Gyms, Caves, multi-level buildings) to their root outdoor hubs (the main city or route). The current `getOutdoorMapId` in `src/engine/mapGraph/gen2Graph.ts` only resolves a single level of `prnt`. We need an exported `resolveOutdoorMapId` function that handles recursive parent resolution for multi-level indoor maps.

## Requirements
- Modify `src/engine/mapGraph/gen2Graph.ts`.
- Rename or replace `getOutdoorMapId` with an exported `resolveOutdoorMapId` function.
- `resolveOutdoorMapId(allLocations: UnifiedLocation[], mapId: number): number` must iteratively or recursively traverse the `prnt` property of locations until it finds a location without a `prnt` (the root outdoor hub), and return that ID.
- Update `getDistanceToMap` to use the new `resolveOutdoorMapId` function.
- Ensure the O(1) location cache strategy is maintained or improved.
- Make similar updates to `gen1Graph.ts` to keep the APIs consistent, if it exists and uses the same pattern.

## Acceptance Criteria
- [x] `resolveOutdoorMapId` is implemented and exported in `gen2Graph.ts`.
- [x] It correctly resolves multi-level indoor maps to their root outdoor parent.
- [x] `getDistanceToMap` uses the new function.
- [x] Existing tests pass, and new tests are added for `resolveOutdoorMapId` covering multi-level indoor maps.
