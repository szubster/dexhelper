---
id: task-139-442-ribbon-filter-state
type: TASK
title: Implement Ribbon Dashboard State Layer
status: READY
owner_persona: coder
created_at: '2026-08-19'
updated_at: '2026-08-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-066-139-ribbon-filtering-sorting
tags:
  - feature
  - state
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Task: Implement Ribbon Dashboard State Layer

## 1. Description
Define the React Context (or Zustand slice if global, though context is likely preferred for a specific dashboard) to store the state for Ribbon filtering and sorting preferences.

## 2. Technical Blueprint
- Create a context provider to manage `filterCategory` (e.g., 'all', 'missing', 'contest') and `sortBy` (e.g., 'id', 'missingCount').
- Ensure proper typings for the state and dispatch actions.
- Write a unit test ensuring the context provider correctly updates state.

## 3. Acceptance Criteria
- [ ] State layer for ribbon filtering/sorting is defined and tested.
