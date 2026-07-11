---
id: task-280-304-item-db-schema-and-sync
type: TASK
title: Add Items Schema and PokeDB Sync
status: ACTIVE
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: '2586275593234808783'
pr_number: null
parent: story-087-280-item-runtime-integration
tags:
  - db
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Add Items Schema and PokeDB Sync

## Context
The application relies on hardcoded mapping files for items (e.g., `EVO_ITEM_NAMES` and Generation ID maps in `src/engine/assistant/strategies/items/gameItemMap.ts`). To transition this to a dynamically built runtime database, `items.jsonl` is now included in our msgpack payload (`pokedata.msgpack`) during build.
This task will configure the `PokeDB` IndexedDB instance to store this item data.

## Requirements

1. **Update `src/db/schema.ts`**:
   - Add `ITEMS: 'items'` to `DB_CONFIG.STORES`.
   - Ensure the new `items` store is properly defined within `PokeDBSchema` (using `id` as the key and `ItemMetadata` as the value). Note: Define an `ItemMetadata` interface matching the structure from `items.jsonl` (e.g. `id: number`, `name: string`, `gen1_id?: number`, `gen2_id?: number`, `gen3_id?: number`, etc.). Examine `items.jsonl` in `src/data/raw/` or `generate-pokedata.ts` to see what properties are exported.
   - Update `PokeDataExport` to include an `items: ItemMetadata[]` array so it expects the decoded msgpack data.

2. **Update `src/db/PokeDB.ts`**:
   - Update the `syncData` method. The decoded payload will now include the `items` array.
   - Using the existing transaction logic, inflate the `items` array into the new IndexedDB `items` store in bulk, just like is done for `pokemon`, `encounters`, and `locations`.

## Architectural Rules Reminder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Add `items` to `DB_CONFIG.STORES` in `src/db/schema.ts`.
- [x] Define the `ItemMetadata` interface and add the `items` object store to `PokeDBSchema`.
- [x] Update `PokeDataExport` to include `items`.
- [x] Implement inflation logic for the `items` array inside `syncData` in `src/db/PokeDB.ts`.
- [x] Ensure `pnpm type-check` and `pnpm lint` pass successfully.
