---
id: task-016-031-qa-wait-wake
type: TASK
title: "QA Wait & Wake logic in Orchestrator"
status: "ACTIVE"
owner_persona: qa
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on:
  - .foundry/tasks/task-016-030-implement-wait-wake.md
jules_session_id: "8718557929428105910"
pr_number: null
parent: ".foundry/stories/story-011-016-wait-wake-implementation.md"
---

# QA Wait & Wake logic in Orchestrator

## Description
Verify the Wait & Wake orchestration logic implemented in `.github/scripts/foundry-orchestrator.ts`. Write test suites in `.github/scripts/foundry-orchestrator.test.ts` to cover the `ACTIVE` -> `PENDING` state transition.

## Acceptance Criteria
- [x] Add a test that verifies an `ACTIVE` node transitions to `PENDING` when a new incomplete dependency is added to its `depends_on` array.
- [x] Add a test that verifies a `PENDING` parent node transitions to `READY` when its new dependency is `COMPLETED` (the Wake condition).
- [x] All tests pass successfully.

## QA Result
The Wait & Wake logic in `foundry-orchestrator.ts` is correctly implemented and covered by tests. Both Wait condition and Wake condition are validated. Approved.
