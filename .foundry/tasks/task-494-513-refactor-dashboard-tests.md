---
id: task-494-513-refactor-dashboard-tests
type: TASK
title: Refactor Dashboard UI tests to mock Context Rejection Threshold
status: PENDING
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on:
  - task-494-512-refactor-dashboard-ui
jules_session_id: null
pr_number: null
parent: story-344-494-dashboard-rejection-count
tags:
  - refactor
  - dashboard
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Dashboard UI tests to mock Context Rejection Threshold

## Objective
Refactor the tests for `DagDashboard.tsx` and `DagNode.tsx` to correctly mock or pass the context threshold, eliminating direct imports of `MAX_REJECTION_THRESHOLD`.

## Acceptance Criteria
- [ ] Update `DagDashboard.test.tsx` to correctly mock or pass `maxRejectionThreshold` in context.
- [ ] Update `DagNode.test.tsx` to correctly mock or pass `maxRejectionThreshold` in context.
- [ ] Eliminate all direct imports of `MAX_REJECTION_THRESHOLD` from `DagDashboard.test.tsx` and `DagNode.test.tsx`.
