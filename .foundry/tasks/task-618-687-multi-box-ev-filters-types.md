---
id: task-618-687-multi-box-ev-filters-types
type: TASK
title: Multi-Box EV Filters Types and Interfaces
status: ACTIVE
owner_persona: coder
created_at: '2026-10-14'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: '3266087009732688070'
pr_number: null
parent: story-575-618-multi-box-ev-filters
tags:
  - dexhelper
  - feature
  - search
  - pc-box
  - ev
  - types
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Task: Multi-Box EV Filters Types and Interfaces

## Context
As part of the Multi-Box Stat Filters Epic, we need to implement EV (Effort Value) filtering logic. The first step is to define the required types and interfaces.

## Objectives
- Create the EV filtering types in `src/engine/filtering/EVFilters.ts` (or similar).
- Implement filter state interfaces defining what can be filtered (e.g., target EV values, comparison operators, specific stats).

## Acceptance Criteria
- [x] Appropriate TypeScript interfaces are defined for the filter state.
