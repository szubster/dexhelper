---
id: task-431-447-save-state-write-api-impl
type: TASK
title: Implement Save State Write API
status: ACTIVE
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '14711519120076916460'
pr_number: null
parent: story-398-431-save-state-write-api
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Save State Write API

## Context
We need to implement the save state write API for `SaveHistoryDB` inside `src/engine/storage/historyDb.ts` to fulfill the write operations of `story-398-431-save-state-write-api`.

## Acceptance Criteria
- [ ] Export an asynchronous function `writeSaveState(id: string, saveData: Uint8Array, metadata: Record<string, unknown>)` in `src/engine/storage/historyDb.ts`.
- [ ] Implement the function so that it opens the database using `initHistoryDb()`.
- [ ] Run a transaction that saves `saveData` into the `saves` object store.
- [ ] In the same transaction, save the `metadata` into the `metadata` object store.
- [ ] Include error handling to safely catch issues.
- [ ] Add unit tests in `src/engine/storage/historyDb.test.ts` to verify the write operation, making sure metadata and the save states are written successfully.
