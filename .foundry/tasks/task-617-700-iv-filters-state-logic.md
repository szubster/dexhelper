---
id: task-617-700-iv-filters-state-logic
type: TASK
title: Implement State and Logic for Multi-Box IV Filters
status: ACTIVE
owner_persona: coder
created_at: '2026-10-16T21:13:54.689Z'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: '131536191422632149'
pr_number: null
parent: story-575-617-multi-box-iv-filters
tags:
  - react
  - dexhelper
  - zustand
  - feature
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement State and Logic for Multi-Box IV Filters

## Objective
Extend the `FilterType` with new IV-related filters (e.g., 'perfect-ivs') and implement the filter logic to properly filter Pokémon based on their `ivs` or `dvs`.

## Acceptance Criteria
- [x] Extend `FILTER_TYPES` in `src/store.ts` to include an IV filter (e.g. `perfect-ivs`).
- [x] Ensure that filtering logic uses the new filter state to filter Pokémon based on their `ivs` or `dvs` properties.
- [x] Add basic unit tests for the state management and filtering logic in `src/store.test.ts` and `src/engine/filtering` as appropriate.
