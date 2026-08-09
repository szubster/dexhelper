---
id: task-359-411-multi-save-comparison-algorithms-impl
type: TASK
title: Multi-Save Comparison Algorithms Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-09'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '570164945438249273'
pr_number: null
parent: story-349-359-multi-save-comparison-algorithms
tags:
  - backend
  - multi-save
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Multi-Save Comparison Algorithms Implementation

## Context
As part of the Multi-Save Trade Planner, this task creates comparison algorithms for analyzing multiple save files in memory simultaneously. Now that `src/store.ts` supports multiple saves in the `saves` dictionary, we need functions to analyze and compare them.

## Requirements
- Create a new file `src/utils/saveComparison.ts`.
- Implement a function `compareSaves(save1: SaveData, save2: SaveData)` that returns an object highlighting differences between two saves. Specifically, it should identify the missing Pokémon in each save compared to the other.
- Implement a function `findTradePossibilities(saves: Record<string, SaveData>)` that analyzes a collection of saves to determine which saves have Pokémon that other saves need.
- Ensure the algorithms are efficient.
- Ensure proper TypeScript types are defined for the return values of these functions.
- Write unit tests in `src/utils/saveComparison.test.ts` to verify the logic of the comparison functions.

## Acceptance Criteria
- [x] Implement `compareSaves` function in `src/utils/saveComparison.ts`.
- [x] Implement `findTradePossibilities` function in `src/utils/saveComparison.ts`.
- [x] Write unit tests for `compareSaves` and `findTradePossibilities`.
