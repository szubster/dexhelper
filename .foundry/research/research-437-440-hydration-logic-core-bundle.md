---
id: research-437-440-hydration-logic-core-bundle
type: RESEARCH
title: Investigate Hydration Logic for Core Bundle Structure
status: ACTIVE
owner_persona: researcher
created_at: 2026-08-21T00:00:00.000Z
updated_at: '2026-08-22'
depends_on: []
jules_session_id: '14961088573646025492'
pr_number: null
parent: task-428-437-update-data-loading-logic
tags:
  - architecture
  - database
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Hydration Logic for Core Bundle Structure

## Context
While updating the client-side data loading logic (`src/db/PokeDB.ts`) to fetch `pokedata-core.msgpack` initially instead of `pokedata.msgpack`, we encountered a lack of clarity regarding how the IndexedDB hydration logic should be adjusted to work correctly with the core bundle data structure.
Although the task description suggests the core bundle handles only "pokemon, moves, items", the underlying generation scripts and types still seem to emit `encounters` and `locations`.

## Description
This research node must investigate the exact data structure of `pokedata-core.msgpack` output by the modified `scripts/generate-pokedata.ts`. It needs to determine whether `encounters` and `locations` arrays are present (but perhaps empty) in the core bundle, or if they are entirely omitted, and define precisely what changes (if any) are required to the IndexedDB hydration logic (`syncData` in `src/db/PokeDB.ts`) to successfully parse and hydrate the database without errors or regressions.

## Acceptance Criteria
- [ ] Determine the exact data structure emitted into `pokedata-core.msgpack`.
- [ ] Specify necessary changes to `src/db/PokeDB.ts` to properly handle this structure during hydration.
