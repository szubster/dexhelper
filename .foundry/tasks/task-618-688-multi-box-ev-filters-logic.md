---
id: task-618-688-multi-box-ev-filters-logic
type: TASK
title: Multi-Box EV Filters Core Logic
status: PENDING
owner_persona: coder
created_at: '2026-10-14'
updated_at: '2026-10-18'
depends_on:
  - task-618-687-multi-box-ev-filters-types
jules_session_id: null
pr_number: null
parent: story-575-618-multi-box-ev-filters
tags:
  - dexhelper
  - feature
  - search
  - pc-box
  - ev
  - logic
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Task: Multi-Box EV Filters Core Logic

## Context
As part of the Multi-Box Stat Filters Epic, we need to implement EV (Effort Value) filtering logic. This task focuses on the core comparison logic.

## Objectives
- Implement the EV filtering core logic functions in `src/engine/filtering/EVFilters.ts`.
- Ensure the logic correctly handles comparisons for individual stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) and total EVs.
- Ensure type safety using the defined filter state interfaces and the `PokemonInstance` interface.

## Acceptance Criteria
- [ ] EV filtering core logic functions are implemented and exported.
