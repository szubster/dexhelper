---
id: task-478-587-pokedb-sync-extensions
type: TASK
title: Implement on-demand extension syncing for PokeDB
status: READY
owner_persona: coder
created_at: '2026-09-17T07:56:29Z'
updated_at: '2026-09-17T07:56:29Z'
depends_on:
  - task-478-586-pokedb-sync-core
jules_session_id: null
pr_number: null
parent: story-419-478-pokedb-sync-refactor
tags:
  - database
  - performance
  - extensions
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement on-demand extension syncing for PokeDB

## Context
After splitting the data, generation-specific datasets (like match calls, encounters for specific regions, etc.) are compiled into extension bundles (e.g., `pokedata-gen3.msgpack`). The database should fetch and sync these extension bundles dynamically when required by the detected save file, rather than all at once.

## Requirements
- Add a new method to `src/db/PokeDB.ts` (e.g., `syncExtension(extensionName: string)`) to load and hydrate specific generation extensions.
- This method should fetch the requested bundle (e.g., `pokedata-gen3.msgpack`).
- Ensure `syncExtension` uses `msgpackr` to unpack the data and populates the appropriate stores without clearing the core data.
- Update `DB_CONFIG` or metadata store handling as needed to track which extensions have been loaded so they are not fetched repeatedly on every load.

## Acceptance Criteria
- [ ] Logic implemented to fetch and sync generation-specific extensions.
- [ ] Mechanism added to track synced extensions to prevent redundant fetches.
