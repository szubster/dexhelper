---
id: story-087-280-item-runtime-integration
type: STORY
title: Item Data Runtime Integration
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-049-087-dynamic-item-list-parsing
tags:
  - refactor
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Item Data Runtime Integration

## Background
We have successfully generated `items.jsonl` dynamically and integrated it into the `msgpackr` payload (`pokedata.msgpack`) via the Vite plugin. Now, we need to integrate this dynamically generated item data into the application runtime, specifically by adding the `items` object store to `PokeDB` and replacing the remaining hardcoded item mapping tables.

## Goals
1. Add an `items` object store to `DB_CONFIG.STORES` and `PokeDBSchema` in `src/db/schema.ts`.
2. Update the `syncData` process in `src/db/PokeDB.ts` to inflate and store the decoded `items` array from the msgpack payload.
3. Replace manual/hardcoded tables for item data (like `EVO_ITEM_NAMES` in `src/engine/assistant/strategies/items/gameItemMap.ts`) to use the dynamically populated runtime DB.

## Acceptance Criteria
- [x] Add the `items` object store in IndexedDB.
- [x] Implement inflation and storage logic for items in `PokeDB.ts` during `syncData`.
- [x] Replace usage of hardcoded item maps with queries to the new database store.
- [x] Break down this STORY into concrete TASK nodes for implementation.
- [x] task-280-304-item-db-schema-and-sync
- [x] task-280-305-refactor-game-item-map
- [x] task-280-306-item-runtime-qa
