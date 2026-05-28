---
id: task-073-141-qa-cancellation-unit-tests
type: TASK
title: QA Unit Tests for DAG Auto-Cancellation
status: READY
owner_persona: qa
created_at: '2026-05-23'
updated_at: '2026-05-28'
depends_on:
  - task-073-140-impl-cancellation-unit-tests
jules_session_id: null
pr_number: null
parent: story-035-073-orchestrator-cancellation-tests
tags:
  - orchestrator
  - testing
  - auto-cancel
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Unit Tests for DAG Auto-Cancellation

## Objective
Verify the coder's implementation of the unit tests in `.github/scripts/foundry-orchestrator.test.ts` for DAG auto-cancellation logic.

## Acceptance Criteria
- [ ] Verify that tests exist and pass for verifying dependent `PENDING` nodes are correctly transitioned to `CANCELLED` when their dependency hits the max rejection count.
- [ ] Verify that tests exist and pass for asserting the exact `rejection_reason` string formatting (`Cancelled due to permanent failure of dependency: <dependency_id>`).
- [ ] Verify that tests exist and pass for the anti-loop / cycle prevention mechanisms of the cancellation logic.

## Technical Contract
1. Run `pnpm exec vitest run --dir .github/scripts/` to verify tests pass.
2. Read the `.github/scripts/foundry-orchestrator.test.ts` file to ensure the specific edge cases for cycle prevention and rejection reason strings are well tested.
3. If they are not, reject the task with a detailed description of what is missing.

## Persona Contract Reminder (Coder / QA)
- If you abort or permanently fail this task, you **MUST** update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you **MUST** check off all Acceptance Criteria checkboxes before submitting.
