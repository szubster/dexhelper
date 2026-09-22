---
id: task-478-587-pokedb-extension-sync-impl
type: TASK
title: Implement logic to fetch and sync generation-specific extensions in PokeDB
status: READY
owner_persona: coder
created_at: '2026-09-17T07:47:47.000Z'
updated_at: '2026-09-22'
depends_on:
  - task-478-586-pokedb-core-sync-impl
jules_session_id: null
pr_number: null
parent: story-419-478-pokedb-sync-refactor
tags:
  - database
  - performance
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement logic to fetch and sync generation-specific extensions in PokeDB

## Context
Generation-specific encounter and location data (`pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, `pokedata-gen3.msgpack`) are separated into extension bundles. `PokeDB` needs to dynamically fetch and sync these extension bundles when required by the active save file or generation context.

## Requirements
- Implement extension bundle loading methods in `src/db/PokeDB.ts` (e.g. `syncExtension(gen: number)` or `ensureExtension(gen: number)`).
- Hydrate encounter and location object stores with the extension data without corrupting existing records.

## Acceptance Criteria
- [ ] Implement on-demand extension bundle fetching and hydration in `src/db/PokeDB.ts`.
- [ ] Add unit tests verifying generation extension loading and database store hydration.
