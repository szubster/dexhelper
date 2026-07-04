---
id: task-107-253-update-dag-orchestration-tests
type: TASK
title: Update DAG Orchestration Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-07-01'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: '9127575521615074271'
pr_number: null
parent: story-053-107-update-dag-orchestration-tests
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update DAG Orchestration Tests

## Objective
Update the DAG orchestration tests in `.github/scripts/foundry-orchestrator.test.ts` to use the new module `.github/scripts/dag-utils.ts`.

## Context
A recent refactor moved DAG utilities (like `todayISO`, `buildReverseDependencyGraph`, `getOrphanedNodes`) into a shared `dag-utils.ts` module. The orchestrator tests need to be updated to ensure they are compatible with this change. Note that the orchestrator itself (`.github/scripts/foundry-orchestrator.ts`) already uses these methods.

## Technical Specifications
- Review `.github/scripts/foundry-orchestrator.test.ts`.
- Ensure that any functionality related to testing orchestrator logic still passes. It appears the tests already pass successfully when run, so if there is nothing to update, use the Empty PR Policy to mark this task as completed.
- Ensure all tests in `.github/scripts` pass by running `cd .github/scripts && pnpm install && npx vitest run`.

## Coder Contract Constraints
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Existing orchestration tests are verified to pass successfully.
- [x] Any necessary imports are updated, or if no changes are needed, an empty PR is submitted with this checkbox checked.
