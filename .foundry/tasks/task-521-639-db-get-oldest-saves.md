---
id: task-521-639-db-get-oldest-saves
type: TASK
title: Implement getOldestSaves in historyDb
status: READY
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-09-28'
depends_on: []
jules_session_id: null
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

# Task: Implement getOldestSaves in historyDb

## Overview
Implement a `getOldestSaves(playthroughId: string, limit: number): Promise<string[]>` function in `src/engine/storage/historyDb.ts`.

## Context
To enforce the maximum limit (50), we must identify the oldest save(s) (by timestamp, in ascending order) so they can be deleted when a new save exceeds the limit.

## Acceptance Criteria
- [ ] Implement `getOldestSaves` function returning an array of IDs.
- [ ] Add unit tests in `historyDb.test.ts` to verify oldest saves retrieval.
