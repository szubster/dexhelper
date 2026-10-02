---
id: task-521-638-db-delete-save
type: TASK
title: Implement deleteSaveState in historyDb
status: ACTIVE
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: '13784077273059181186'
pr_number: null
parent: story-399-521-save-state-lru-eviction
tags:
  - storage
  - indexeddb
rejection_count: 0
rejection_reason: ''
research_references: []
notes: ''
locks: []
---

# Task: Implement deleteSaveState in historyDb

## Overview
Implement a `deleteSaveState(id: string): Promise<void>` utility function in `src/engine/storage/historyDb.ts`.

## Context
To enforce LRU eviction, we need a way to delete specific saves from both the `saves` and `metadata` object stores.

## Acceptance Criteria
- [ ] Implement `deleteSaveState` function.
- [ ] Add unit tests in `historyDb.test.ts` to verify deletion.
