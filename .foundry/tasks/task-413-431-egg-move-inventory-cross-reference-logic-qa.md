---
id: task-413-431-egg-move-inventory-cross-reference-logic-qa
type: TASK
title: QA - Egg Move Inventory Cross-Reference Logic
status: COMPLETED
owner_persona: qa
created_at: '2026-08-16'
updated_at: '2026-08-18'
depends_on:
  - task-413-430-egg-move-inventory-cross-reference-logic-impl
jules_session_id: null
pr_number: null
parent: story-114-413-egg-move-inventory-cross-reference-logic
tags:
  - qa
  - mechanics
  - state
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA - Egg Move Inventory Cross-Reference Logic

## Context
The Coder has implemented strict gender verification logic for passing down egg moves in Gen 2 and Gen 3. In these generations, only Male Pokémon can pass down egg moves.

## Verification Requirements
1. Review the Coder's implementation in `src/engine/assistant/generators/breedGenerator.ts` and `src/utils/gender.ts`.
2. Ensure that `calculateGen3Gender` uses the lowest 8 bits of the personality value (`pv & 0xFF`) and correctly compares it against the gender rate thresholds (mapping the 0-8 enum to a 0-255 scale threshold, similar to `calculateGen2Gender`).
3. Verify that the unit tests cover cases for both Gen 2 (using `dvs.atk`) and Gen 3 (using `personalityValue`), including missing males, present females, and present males with the correct move.
4. Ensure the tests pass and no regressions are introduced.
5. If any validation fails, reject the target implementation task following the strict QA Persona Contract.

## Acceptance Criteria
- [x] Reviewed the implementation for accuracy.
- [x] Validated the test cases for completeness and correctness.
- [x] Approved the Coder's work or provided actionable feedback.
