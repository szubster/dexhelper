---
id: task-494-514-qa-verify-dashboard
type: TASK
title: QA Verification - Refactor Dashboard UI to consume Context Rejection Threshold
status: ACTIVE
owner_persona: qa
created_at: '2026-09-01'
updated_at: '2026-09-03'
depends_on:
  - task-494-513-refactor-dashboard-tests
jules_session_id: '6782707708980178601'
pr_number: null
parent: story-344-494-dashboard-rejection-count
tags:
  - qa
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verification - Refactor Dashboard UI to consume Context Rejection Threshold

## Objective
Verify that `DagDashboard.tsx` and `DagNode.tsx`, along with their respective tests, have been refactored correctly to use `maxRejectionThreshold` from `useDagContext()`.

## Acceptance Criteria
- [ ] Verify that `DagDashboard.tsx` uses `maxRejectionThreshold` from context and does not import `MAX_REJECTION_THRESHOLD` directly.
- [ ] Verify that `DagNode.tsx` uses `maxRejectionThreshold` from context and does not import `MAX_REJECTION_THRESHOLD` directly.
- [ ] Verify that `DagDashboard.test.tsx` correctly mocks or passes the context threshold and does not import `MAX_REJECTION_THRESHOLD`.
- [ ] Verify that `DagNode.test.tsx` correctly mocks or passes the context threshold and does not import `MAX_REJECTION_THRESHOLD`.
- [ ] Ensure all unit tests pass correctly (`pnpm test`).
