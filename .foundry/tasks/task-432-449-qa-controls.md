---
id: task-432-449-qa-controls
type: TASK
title: QA Verification - Tactical Controls Refactor
status: READY
owner_persona: qa
created_at: '2026-08-20'
updated_at: '2026-08-21'
depends_on:
  - task-432-447-migrate-button-input
  - task-432-448-migrate-select
jules_session_id: null
pr_number: null
parent: story-071-432-migrate-tactical-controls
tags:
  - qa
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Verification - Tactical Controls Refactor

## Objective
Verify that the refactoring of `TacticalButton`, `TacticalInput`, and `TacticalSelect` to use `@utility` classes did not introduce any visual or functional regressions.

## Scope
1. **Target Components**:
   - `TacticalButton`
   - `TacticalInput`
   - `TacticalSelect`
2. **Verification Process**:
   - Write E2E/Integration tests or run existing visual tests to ensure the components render correctly with all their variants, states (hover, focus, disabled), and sizes.
   - Verify that the components look exactly the same as they did before the refactor. Ensure specific states like the `focus-within` on `TacticalInput` and the different variants on `TacticalButton` are functioning as expected.
   - Verify that the new `@utility` classes are correctly applied in the DOM.

## Acceptance Criteria
- [ ] No visual regressions are present in `TacticalButton`, `TacticalInput`, or `TacticalSelect`.
- [ ] All variants and states (hover, focus, disabled) work as expected.
- [ ] Verification passes `pnpm lint` and `pnpm test`.
