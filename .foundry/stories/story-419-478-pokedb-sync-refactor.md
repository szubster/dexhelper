---
id: story-419-478-pokedb-sync-refactor
type: STORY
title: Refactor PokeDB sync logic for multiple bundles
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-08-26'
depends_on:
  - story-419-477-pokedata-plugin-refactor
jules_session_id: '6706478323854200827'
pr_number: null
parent: epic-340-419-data-splitting
tags:
  - database
  - performance
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Refactor PokeDB sync logic for multiple bundles

## Context
The database synchronization logic must be updated to load the core data by default and load extension data on demand.

## Requirements
- Refactor `src/db/PokeDB.ts` to fetch and synchronize `pokedata-core.msgpack` on initial load.
- Implement logic to fetch and sync generation-specific extensions when required by the detected save file.

## Acceptance Criteria
- [ ] Break down into Tasks
