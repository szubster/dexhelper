---
id: task-478-586-pokedb-core-sync-impl
type: TASK
title: Refactor PokeDB sync logic to fetch pokedata-core.msgpack on initial load
status: PENDING
owner_persona: coder
created_at: 2026-09-17T07:47:12Z
updated_at: 2026-09-17T07:47:12Z
depends_on: []
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

# Task: Refactor PokeDB sync logic to fetch pokedata-core.msgpack on initial load

## Context
The database synchronization logic needs to be updated to support multi-bundle data splitting. The core bundle contains species, moves, items, berries, match calls, and metadata, while generation-specific encounters and locations are split into separate bundle files.

## Requirements
- Refactor `src/db/PokeDB.ts` sync logic to fetch and hydrate `pokedata-core.msgpack` on initial application load.
- Ensure proper hash checking and store initialization for core database tables.

## Acceptance Criteria
- [ ] Refactor `syncData` in `src/db/PokeDB.ts` to fetch `pokedata-core.msgpack` and populate core stores.
- [ ] Add unit tests verifying `pokedata-core.msgpack` sync behavior.
