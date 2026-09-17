---
id: task-478-588-pokedb-sync-tests
type: TASK
title: Write unit tests for PokeDB sync refactor
status: READY
owner_persona: coder
created_at: '2026-09-17T08:55:53Z'
updated_at: '2026-09-17T08:55:53Z'
depends_on:
  - task-478-587-pokedb-sync-extensions
jules_session_id: null
pr_number: null
parent: story-419-478-pokedb-sync-refactor
tags:
  - database
  - testing
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Write unit tests for PokeDB sync refactor

## Context
After updating `src/db/PokeDB.ts` to sync the core bundle and on-demand extensions, we need to ensure the logic works correctly by adding unit tests.

## Requirements
- Update `src/db/__tests__/PokeDB.test.ts` to test that `syncData` correctly fetches `pokedata-core.msgpack`.
- Add tests to ensure `syncExtension` correctly fetches and processes the requested extension bundles (e.g., `pokedata-gen3.msgpack`).
- Ensure tracking logic for loaded extensions is tested (verifying it does not fetch the same extension multiple times).

## Acceptance Criteria
- [ ] Unit tests for core bundle syncing pass.
- [ ] Unit tests for extension syncing pass.
