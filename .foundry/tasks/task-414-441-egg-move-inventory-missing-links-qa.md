---
id: task-414-441-egg-move-inventory-missing-links-qa
type: TASK
title: QA - Egg Move Inventory Missing Links Calculation
status: ACTIVE
owner_persona: qa
created_at: '2026-08-18'
updated_at: '2026-08-21'
depends_on:
  - task-414-440-egg-move-inventory-missing-links-impl
jules_session_id: '8562944859325507451'
pr_number: null
parent: story-114-414-egg-move-inventory-missing-links
tags:
  - qa
  - mechanics
  - state
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA - Egg Move Inventory Missing Links Calculation

## Context
The Coder has implemented the logic to identify missing links in breeding chains (intermediate species either completely missing or missing a valid male) and included this data in the `StandardSuggestion`.

## Verification Requirements
1. Review `src/engine/assistant/generators/breedGenerator.ts` to ensure the missing links calculation is correct and efficient.
2. Verify that the `missingLinks` property in `StandardSuggestion` (`src/engine/assistant/strategies/types.ts`) is appropriately structured.
3. Ensure the unit tests cover the required scenarios for both `absent` and `missing_male` cases.
4. If any validation fails, reject the target implementation task following the QA Persona Contract.

## Acceptance Criteria
- [x] Reviewed the implementation of missing link calculation for accuracy.
- [x] Validated the test cases for completeness.
- [x] Approved the Coder's work or provided actionable feedback.
