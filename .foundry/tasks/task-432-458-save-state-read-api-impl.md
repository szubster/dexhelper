---
id: task-432-458-save-state-read-api-impl
type: TASK
title: Implement Save State Read API
status: READY
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-398-432-save-state-read-api
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Save State Read API

## Context
We need to implement the save state read API for `SaveHistoryDB` inside `src/engine/storage/historyDb.ts` to fulfill the read operations of `story-398-432-save-state-read-api`. The read API is necessary to get the most recent state and fetch the previous state for diffing.

## Acceptance Criteria
- [ ] Export an asynchronous function `getMostRecentSave(playthroughId: string)` in `src/engine/storage/historyDb.ts`.
- [ ] Export an asynchronous function `getPreviousSave(saveId: string)` in `src/engine/storage/historyDb.ts`.
- [ ] Ensure the queries effectively utilize the indexes in the `SaveHistoryDB` schema. You may need to create missing indexes using a new version in `initHistoryDb`.
- [ ] Write unit tests in `src/engine/storage/historyDb.test.ts` to verify the read operations and edge cases.
