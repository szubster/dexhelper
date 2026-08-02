---
id: task-333-345-graveyard-box-logic-qa
type: TASK
title: Graveyard Box State and Logic Verification
status: COMPLETED
owner_persona: qa
created_at: '2026-07-23'
updated_at: '2026-07-25'
depends_on:
  - task-333-344-graveyard-box-logic-impl
jules_session_id: null
pr_number: null
parent: story-131-333-graveyard-box-state
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Graveyard Box State and Logic Verification

## Objective
Verify the backend state and calculation logic for identifying Pokémon in the designated Graveyard Box as permanently dead.

## Contract / Acceptance Criteria
- [x] Verify that there is a backend configuration/state for specifying a "Graveyard Box".
- [x] Verify the logic correctly marks any Pokémon in the Graveyard Box as dead, regardless of HP.
- [x] Ensure all relevant tests pass.

## Instructions & Reminders for QA
- **Note:** This functionality appears to already exist in `src/engine/nuzlocke/tracker.ts` and `src/store.ts`. Ensure everything works as expected and submit an Empty PR checking off all Acceptance Criteria if no code changes are needed.
- **Transient Failures:** If you experience a transient failure requiring a retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Aborts:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
