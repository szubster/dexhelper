---
id: task-428-437-update-data-loading-logic
type: TASK
title: Update Data Loading Logic for Core Bundle
status: ACTIVE
owner_persona: coder
created_at: $(date -I)
updated_at: '2026-08-21'
depends_on:
  - task-428-436-refactor-core-data-generation
jules_session_id: '4759718733010943672'
pr_number: null
parent: story-400-428-extract-core-data
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Update Data Loading Logic for Core Bundle

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Description
This task involves updating the client-side data loading logic (`src/db/PokeDB.ts`) to fetch `pokedata-core.msgpack` initially instead of `pokedata.msgpack`. The IndexedDB synchronization process needs to correctly hydrate the core data stores (pokemon, moves, items) from the new bundle.

## Acceptance Criteria
- [ ] `src/db/PokeDB.ts` updated to fetch and parse `pokedata-core.msgpack`.
- [ ] IndexedDB hydration logic adjusted to work correctly with the core bundle data structure.
