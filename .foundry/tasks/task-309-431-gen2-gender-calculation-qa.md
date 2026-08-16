---
id: task-309-431-gen2-gender-calculation-qa
type: TASK
title: QA - Gen 2 Gender Calculation Utility
status: ACTIVE
owner_persona: qa
created_at: '2026-08-16'
updated_at: '2026-08-16'
depends_on:
  - task-309-430-gen2-gender-calculation-engine
jules_session_id: '4167650424668125636'
pr_number: null
parent: story-309-001-gender-calculation-engine
tags:
  - gen2
  - breeding
  - logic
  - qa
research_references:
  - .foundry/docs/knowledge_base/engine/gen2-breeding.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Gen 2 Gender Calculation Utility

## Description
Verify the implementation of the Gen 2 Pokémon gender calculation logic implemented by the coder in `src/engine/breeding/gender.ts`.

## Acceptance Criteria
- [x] Verify `getGen2Gender(attackDV: number, genderRate: number)` is implemented according to the specified formula.
- [x] Verify it correctly handles edge cases, such as `gender_rate === -1` (Genderless), `0` (Male), and `8` (Female).
- [x] Verify unit tests have been added and cover all cases.
