---
id: task-562-622-wild-item-selection-tests-retry
type: TASK
title: Wild Item Selection Tests Retry
status: READY
owner_persona: coder
created_at: '2026-09-24'
updated_at: '2026-09-24'
depends_on:
  - task-562-621-wild-item-selection-ui-retry
jules_session_id: null
pr_number: null
parent: story-555-562-wild-item-selection-ui
tags:
  - dexhelper
  - testing
  - vitest
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Wild Item Selection Tests Retry

## Context
As part of the Wild Item Hunting UI epic, we need unit tests and/or browser tests to ensure the UI and state management for selecting wild items function correctly. This is a retry of the permanently failed task `task-562-580-wild-item-selection-tests`.

## Requirements
- Write tests using `vitest` for the state management logic introduced in `task-562-578-wild-item-selection-state`.
- Write browser component tests using `vitest-browser-react` for the `WildItemSelector` component introduced in `task-562-621-wild-item-selection-ui-retry`.
- Verify that users can add and remove items successfully and that the UI reflects the current state.
- Ensure all tests pass.

## Acceptance Criteria
- [ ] Write unit tests for the wild item selection state.
- [ ] Write component tests for `WildItemSelector`.
