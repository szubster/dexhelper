---
id: task-333-375-sorting-strategies-regional-dex-impl
type: TASK
title: Implement Regional Dex Sorting Strategy
status: ACTIVE
owner_persona: coder
created_at: '2026-07-31'
updated_at: '2026-07-31'
depends_on: []
jules_session_id: '9002915095100024659'
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - feature
  - sorting
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Regional Dex Sorting Strategy

## Context
The `DexNumberSorter` in `src/engine/sorting/StandardSorters.ts` currently throws an error for regional variants. We need to implement regional dex sorting.

## Requirements
1. Update `DexNumberSorter` in `src/engine/sorting/StandardSorters.ts` to properly handle `regional` variant sorting.
2. Identify or implement a mapping of National Dex IDs to Regional Dex IDs (e.g., Hoenn Dex) to perform the sorting correctly.
3. Update `src/engine/sorting/StandardSorters.test.ts` to cover the new functionality.

## Acceptance Criteria
- [x] `DexNumberSorter` successfully sorts by regional dex order when configured with `variant: 'regional'`.
- [x] Unit tests in `StandardSorters.test.ts` pass and assert correct regional sorting orders.
- [x] `pnpm lint` and `pnpm test` pass.
