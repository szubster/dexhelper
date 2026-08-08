---
id: task-358-402-multi-save-data-structures-impl
type: TASK
title: Multi-Save Data Structures Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-05'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: '8079679931890145311'
pr_number: null
parent: story-349-358-multi-save-data-structures
tags:
  - backend
  - multi-save
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Multi-Save Data Structures Implementation

## Context
As part of the Multi-Save Trade Planner, this task implements the necessary data structures in the Zustand store (`src/store.ts`) to manage multiple concurrent game save states in memory.

## Requirements
- Introduce a `saves` dictionary/record mapping a unique string ID to `SaveData` objects in `src/store.ts`.
- Introduce an `activeSaveId` string (or null) to indicate the currently active save.
- Ensure backwards compatibility for existing components by keeping the `saveData` state property as a derived or synchronized state representing the `activeSaveId`'s save data.
- Ensure `saves` and `activeSaveId` are not persisted via `partialize`, following the invariant of keeping heavy payload data out of localStorage.

## Acceptance Criteria
- [ ] Implement `saves` dictionary in the store.
- [ ] Implement `activeSaveId` in the store.
- [ ] Maintain `saveData` backwards compatibility.
