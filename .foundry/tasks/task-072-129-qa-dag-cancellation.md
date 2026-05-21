---
id: task-072-129-qa-dag-cancellation
type: TASK
title: QA DAG Dependency Cancellation Logic
status: READY
owner_persona: qa
created_at: '2026-05-20'
updated_at: '2026-05-21'
depends_on:
  - task-072-128-implement-dag-cancellation
jules_session_id: null
pr_number: null
parent: story-035-072-implement-cancellation-logic
tags:
  - orchestrator
  - auto-cancel
  - backend
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA DAG Dependency Cancellation Logic

## Objective
Verify the implementation of DAG dependency cancellation logic introduced in `task-072-128-implement-dag-cancellation` by writing tests and testing the behavior of the orchestrator.

## Acceptance Criteria
- [ ] Write integration or unit tests in `.github/scripts/foundry-orchestrator.test.ts` to simulate a scenario where a node fails permanently and its dependent nodes are correctly marked as `CANCELLED`.
- [ ] Verify that dependent nodes only have their state changed to `CANCELLED` if they are currently `PENDING`.
- [ ] Ensure `rejection_reason` is correctly applied to the cancelled dependents (`"Cancelled due to permanent failure of dependency: <failed-node-id>"`).
- [ ] Test the infinite loop safeguard (e.g. by setting up a circular dependency and verifying it does not crash or hang during the cancellation check).
- [ ] Verify that all orchestrator tests run successfully via `pnpm exec vitest run .github/scripts/foundry-orchestrator.test.ts --config .github/scripts/vitest.config.ts`.
