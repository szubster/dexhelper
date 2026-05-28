---
id: task-075-133-qa-heartbeat-verifying-logic
type: TASK
title: QA Heartbeat VERIFYING Logic
status: ACTIVE
owner_persona: qa
created_at: '2026-05-22'
updated_at: '2026-05-24'
depends_on:
  - .foundry/tasks/task-075-132-implement-heartbeat-verifying-logic.md
jules_session_id: '10455639714604870206'
pr_number: null
parent: story-040-075-heartbeat-verifying-logic
tags:
  - process
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
---

# Task: QA Heartbeat VERIFYING Logic

## QA Details
- Review `.github/scripts/foundry-heartbeat.ts` to ensure `transitionNodeToCompleted` sets status to `VERIFYING` instead of `COMPLETED`, but only for `IDEA`, `PRD`, and `EPIC` node types.
- Review `.github/scripts/foundry-heartbeat.ts` to ensure `VERIFYING` nodes are checked for zombie sessions and timeouts, matching `ACTIVE` node logic.
- Ensure the changes align with the acceptance criteria defined in `task-075-132-implement-heartbeat-verifying-logic`.

## Acceptance Criteria
- [ ] Validated `transitionNodeToCompleted` sets status to `VERIFYING`.
- [ ] Validated zombie detection processes `VERIFYING` nodes.
