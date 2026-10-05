---
id: task-521-641-lru-eviction-qa
type: TASK
title: Verify LRU eviction logic for save states
status: READY
owner_persona: qa
created_at: '2026-09-28'
updated_at: '2026-10-05'
depends_on:
  - task-521-640-lru-eviction-logic
jules_session_id: null
pr_number: null
parent: story-399-521-save-state-lru-eviction
tags:
  - storage
  - indexeddb
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Verify LRU eviction logic for save states

## Overview
QA verification task to ensure LRU eviction works as expected.

## Acceptance Criteria
- [ ] Verify `deleteSaveState` works correctly.
- [ ] Verify `getOldestSaves` retrieves correctly sorted oldest records.
- [ ] Verify `writeSaveState` successfully evicts older records when limits are exceeded.
- [ ] Verify no regressions in general DB behavior.
