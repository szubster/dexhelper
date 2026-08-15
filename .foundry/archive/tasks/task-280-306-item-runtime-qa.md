---
id: task-280-306-item-runtime-qa
type: TASK
title: QA - Item Data Runtime Integration
status: COMPLETED
owner_persona: qa
created_at: '2026-07-06'
updated_at: '2026-08-14'
depends_on:
  - task-280-305-refactor-game-item-map
jules_session_id: null
pr_number: null
parent: story-087-280-item-runtime-integration
tags:
  - qa
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA - Item Data Runtime Integration

## Context
The coder has completed tasks to integrate dynamic item data into `PokeDB` (from the `items.jsonl` / `pokedata.msgpack` build artifact) and to replace the hardcoded item tables in `gameItemMap.ts` with dynamic lookups from IndexedDB.

Your job is to thoroughly test and verify that these changes are functionally correct, do not break the UI, and have removed the hardcoded mappings as intended.

## Requirements

1. **Verify DB Sync Integration**:
   - Check out the codebase or ensure you have the latest state.
   - Run a local server/preview.
   - Check IndexedDB in the browser (or run automated tests) to verify the `items` object store exists in `PokeDB` and is correctly populated with records.

2. **Verify Refactored Mappings**:
   - Verify that `src/engine/assistant/strategies/items/gameItemMap.ts` no longer contains the hardcoded mapping constants (e.g. `POKEAPI_TO_GEN1_ITEM`, `EVO_ITEM_NAMES`).
   - Run all existing unit tests to ensure `getGameItemId` and features dependent on item names function normally with the async queries.

3. **Verify App Functionality**:
   - If applicable, navigate the application (especially parts dealing with evolution items or inventory) to ensure no regressions have occurred as a result of switching from synchronous hardcoded maps to asynchronous IndexedDB queries.

## Architectural Rules Reminder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Verify `items` object store is successfully populated in IndexedDB.
- [x] Verify hardcoded mappings are removed from `gameItemMap.ts`.
- [x] Run test suite (`pnpm test`) and ensure all tests pass.
- [x] Submit an empty PR passthrough using `request_code_review` if all checks pass successfully.
