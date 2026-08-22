---
id: research-437-440-hydration-logic-core-bundle
type: RESEARCH
title: Investigate Hydration Logic for Core Bundle Structure
status: COMPLETED
owner_persona: researcher
created_at: 2026-08-21T00:00:00.000Z
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
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
- [x] Determine the exact data structure emitted into `pokedata-core.msgpack`.
- [x] Specify necessary changes to `src/db/PokeDB.ts` to properly handle this structure during hydration.

## Findings

### 1. Data Structure of `pokedata-core.msgpack`
When `vite-plugins/pokedata-plugin.ts` builds the core bundle (`pokedata-core.msgpack`), it should omit the generation-specific extensions like `encounters` and `locations` from the exported structure entirely, meaning that `data.enc` and `data.loc` will be strictly `undefined` during parsing.

Currently, if the ETL generator attempts to produce a core bundle, `data.enc` and `data.loc` will simply be absent from the `data` payload parsed by `Unpackr`.

### 2. Required Changes in `src/db/PokeDB.ts`
Because `data.enc` and `data.loc` will be `undefined` in the core bundle, the current implementation in `src/db/PokeDB.ts` will throw a `TypeError: data.enc is not iterable` (and similarly for `data.loc`) during hydration because it assumes the arrays exist.

To fix this and gracefully hydrate from the core bundle, `syncData` in `src/db/PokeDB.ts` must default these missing properties to empty arrays prior to iteration.

**Specific Code Changes Needed in `src/db/PokeDB.ts`:**
1. For encounters:
   Update the loop starting at line `for (const e of data.enc)` to `for (const e of data.enc || [])`.
2. For locations:
   Update the loop starting at line `for (const l of data.loc)` to `for (const l of data.loc || [])`.

These precise changes will ensure the hydration process seamlessly parses the core bundle and populates the remaining `pokemon`, `moves`, and `items` stores without crashing.
