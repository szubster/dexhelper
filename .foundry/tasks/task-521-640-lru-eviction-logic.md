---
id: task-521-640-lru-eviction-logic
type: TASK
title: Implement LRU eviction in writeSaveState
status: READY
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-10-03'
depends_on:
  - task-521-638-db-delete-save
  - task-521-639-db-get-oldest-saves
jules_session_id: null
pr_number: null
parent: story-399-521-save-state-lru-eviction
tags:
  - storage
  - indexeddb
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement LRU eviction in writeSaveState

## Overview
Modify `writeSaveState` in `src/engine/storage/historyDb.ts` to delete the oldest saves when reaching the `MAX_SAVE_STATES_PER_PLAYTHROUGH` limit instead of throwing an error.

## Context
Previously, we threw an error when the limit was reached. Now, if `currentCount >= MAX_SAVE_STATES_PER_PLAYTHROUGH`, we must find the oldest saves and delete them, to ensure the new count is `MAX_SAVE_STATES_PER_PLAYTHROUGH - 1` before writing the new save state.

## Acceptance Criteria
- [x] Update `writeSaveState` to implement LRU eviction.
- [x] Update tests in `historyDb.test.ts` to assert eviction rather than error-throwing on limit hit.
