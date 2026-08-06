---
id: task-280-305-refactor-game-item-map
type: TASK
title: Refactor Game Item Map Data
status: ACTIVE
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-08-06'
depends_on: []
jules_session_id: '11436719022110870982'
pr_number: null
parent: story-087-280-item-runtime-integration
tags:
  - db
  - refactor
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: Refactor Game Item Map Data

## Context
With the dynamic `items` store integrated into `PokeDB` (from `task-280-304-item-db-schema-and-sync.md`), we can now eliminate hardcoded item ID mappings. Previously, `src/engine/assistant/strategies/items/gameItemMap.ts` contained hardcoded tables like `EVO_ITEM_NAMES`, `POKEAPI_TO_GEN1_ITEM`, `POKEAPI_TO_GEN2_ITEM`, and `POKEAPI_TO_GEN3_ITEM`.

This task involves deprecating those hardcoded tables and replacing them with queries against `PokeDB`.

## Requirements

1. **Refactor `src/engine/assistant/strategies/items/gameItemMap.ts`**:
   - Update `getGameItemId(pokeApiId: number, generation: number)` to be an asynchronous function (e.g. `getGameItemId(pokeApiId: number, generation: number): Promise<number>`).
   - Rather than checking hardcoded constants, query the `items` store in `PokeDB` to fetch the specific item record for the given `pokeApiId`.
   - Read the appropriate generation-specific internal ID from the fetched record (e.g. `gen1_id`, `gen2_id`, `gen3_id`). If it exists, return it; otherwise, fallback to `pokeApiId`.
   - Ensure you properly handle cases where the item does not exist in the store.
   - Refactor or remove `EVO_ITEM_NAMES` similarly, either looking up names dynamically or adjusting callers to look up item names via `PokeDB` by ID. *Hint: Look up usages of `EVO_ITEM_NAMES` (if any exist) and switch them to use `db.get('items', itemId)`. If it is unused or only used in one place, you can handle it appropriately.*

2. **Update Call Sites**:
   - Find references to `getGameItemId` across the application and update them to use `await getGameItemId(...)`.
   - Find references to `EVO_ITEM_NAMES` and update them to query the DB dynamically.
   - Ensure all affected tests are updated.

## Architectural Rules Reminder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Remove hardcoded item tables (`POKEAPI_TO_GENX_ITEM`, `EVO_ITEM_NAMES`) from `gameItemMap.ts`.
- [ ] Implement `getGameItemId` (and any other replaced functions) to asynchronously query `PokeDB` for item data.
- [ ] Update all calling modules to handle the new asynchronous behavior of item lookups.
- [ ] Run `pnpm type-check` and `pnpm lint` successfully.
- [ ] Run unit tests (`pnpm test`) to verify the refactored item map logic works correctly.
