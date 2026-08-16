---
id: task-309-430-gen2-gender-calculation-engine
type: TASK
title: Implement Gen 2 Gender Calculation Utility
status: COMPLETED
owner_persona: coder
created_at: '2026-08-16'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-309-001-gender-calculation-engine
tags:
  - gen2
  - breeding
  - logic
research_references:
  - .foundry/docs/knowledge_base/engine/gen2-breeding.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Gender Calculation Utility

## Description
Create a new utility file in `src/engine/breeding/gender.ts` to implement the Gen 2 Pokémon gender calculation logic as described in the story.
The utility should export a function `getGen2Gender(attackDV: number, genderRate: number): 'Male' | 'Female' | 'Genderless'` that dynamically determines a Pokémon's gender based on its Attack DV and its species' `gender_rate`.
The logic must adhere to the formula: `female_threshold = gender_rate * 2`. A Pokémon is female if its `Attack DV < female_threshold`. It must correctly handle edge cases, such as `gender_rate === -1` (Genderless), `0` (Male), and `8` (Female).

## Acceptance Criteria
- [x] Implement `getGen2Gender` utility in `src/engine/breeding/gender.ts`.
- [x] Add unit tests for `getGen2Gender` in `src/engine/breeding/gender.test.ts`.
