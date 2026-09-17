---
id: task-478-586-pokedb-sync-core
type: TASK
title: Refactor PokeDB to sync core bundle
status: READY
owner_persona: coder
created_at: '2026-09-17T08:55:53Z'
updated_at: '2026-09-17T08:55:53Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-419-478-pokedb-sync-refactor
tags:
  - database
  - performance
  - core
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Refactor PokeDB to sync core bundle

## Context
As part of the pokedata bundle splitting, the database synchronization logic in `src/db/PokeDB.ts` must be updated. Instead of downloading a monolithic `pokedata.msgpack`, it must fetch `pokedata-core.msgpack` on initial load.

## Requirements
- Modify `src/db/PokeDB.ts`.
- Update `syncData` to fetch `pokedata-core.msgpack` instead of `pokedata.msgpack`.
- Update the fetch URL to use `pokedata-core.msgpack`.

## Acceptance Criteria
- [ ] `syncData` fetches `pokedata-core.msgpack`.
