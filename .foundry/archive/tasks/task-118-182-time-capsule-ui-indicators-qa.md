---
id: task-118-182-time-capsule-ui-indicators-qa
type: TASK
title: QA Time Capsule UI Indicators
status: COMPLETED
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-18'
depends_on: []jules_session_id: null
pr_number: null
parent: story-052-118-time-capsule-ui-indicators
tags:
  - qa
  - feature
  - gen2
  - trade
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Time Capsule UI Indicators

## Objective
Verify the implementation of Time Capsule UI indicators in DexHelper, ensuring correct logic application and UI presentation.

## Contract
- Verify that the Time Capsule validation utility correctly evaluates eligible and ineligible Pokémon (Gen 1 species only, no Gen 2 exclusive moves).
- Verify that `isGen1Species` and `hasGen2ExclusiveMove` are used by the validation utility.
- Verify that a visual indicator for Time Capsule readiness correctly displays in the Storage View when a Generation 2 save file is loaded.
- Verify that the indicator does NOT display when a Generation 1 or Generation 3 save file is loaded.
- Verify that the detailed Pokémon view correctly displays the Time Capsule status.
  - Check that valid Pokémon are shown as "[ TIME CAPSULE READY ]".
  - Check that invalid Pokémon display the correct reason for invalidation (e.g., "INVALID: Gen 2 Species" or "INVALID: Gen 2 Exclusive Move(s)").
- Verify that the UI aesthetic adheres to the "tactical hardware/snooping" theme (ADR 008).
- Verify that all unit tests pass (`pnpm test`).
- Verify that type checks pass (`pnpm type-check`).
- Document any verification failures in your journal and appropriately fail this task if the implementation is incorrect.

## Notes for QA
- If you reject the implementation, you MUST update the target implementation task's YAML frontmatter to `status: FAILED`, provide a `rejection_reason`, increment `rejection_count`, and leave its acceptance criteria unchecked.
- You MUST NOT modify your own task's YAML frontmatter (it remains ACTIVE) and must document the failure in your own markdown body.
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Time Capsule validation logic verified.
- [x] Storage View UI indicators verified.
- [x] Detailed Pokémon view status and error messages verified.
- [x] Aesthetics verified against ADR 008.
- [x] `pnpm test` and `pnpm type-check` pass.
