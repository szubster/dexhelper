---
id: task-562-578-wild-item-selection-state
type: TASK
title: Wild Item Selection State Management
status: COMPLETED
owner_persona: coder
created_at: '2026-09-12'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-555-562-wild-item-selection-ui
tags:
  - dexhelper
  - state
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Wild Item Selection State Management

## Context
As part of the Wild Item Hunting UI, we need to maintain state for the user's selected target items to hunt in the wild.

## Requirements
- Update the application's Zustand store (e.g., in `src/store.ts`) or create a dedicated React context if appropriate to track a list of selected target item IDs (`number[]` or `string[]`).
- Provide actions to add, remove, and clear selected target items.
- Ensure the state can be accessed by downstream components (e.g., the tracker or map).

## Acceptance Criteria
- [x] Add state structure for selected wild hunting items.
- [x] Implement add/remove/clear actions for the selected items.
