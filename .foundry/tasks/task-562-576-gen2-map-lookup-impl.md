---
id: task-562-576-gen2-map-lookup-impl
type: TASK
title: Implement Gen 2 Map Lookup Function
status: PENDING
owner_persona: coder
created_at: '2026-09-13'
updated_at: '2026-09-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-140-562-gen2-roamer-map-lookup-table
tags:
  - gen2
  - mapGraph
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 2 Map Lookup Function

## Objective
Implement `getGen2MapName` in `src/engine/mapGraph/gen2Graph.ts` to translate `mapGroup` and `mapId` to human-readable map names.

## Description
The `allLocations` array accessed throughout the application already contains unified names mapped via build-time scripts. The map ID can be constructed from `mapGroup` and `mapId` using bitwise logic.

- Implement `export function getGen2MapName(allLocations: UnifiedLocation[], mapGroup: number, mapId: number): string` in `src/engine/mapGraph/gen2Graph.ts`.
- Inside the function, construct the `gameId` by bitwise shifting `mapGroup` 8 bits left and bitwise ORing it with `mapId` (`(mapGroup << 8) | mapId`).
- Use the `getLocation` helper from `common.ts` to look up the location in `allLocations`.
- Return the `n` (name) property if found. If not found or if the location object is falsy, return the string `'Unknown Location'`.
- Add unit tests for `getGen2MapName` in `src/engine/mapGraph/gen2Graph.test.ts`.

## Acceptance Criteria
- [ ] `getGen2MapName` is implemented in `src/engine/mapGraph/gen2Graph.ts`.
- [ ] The function correctly combines `mapGroup` and `mapId` and uses `getLocation` to find the string name.
- [ ] Unit tests are added to `src/engine/mapGraph/gen2Graph.test.ts` validating successful lookups and fallbacks.
