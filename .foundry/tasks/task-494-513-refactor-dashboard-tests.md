---
id: task-494-513-refactor-dashboard-tests
type: TASK
title: Refactor Dashboard UI tests to mock Context Rejection Threshold
status: COMPLETED
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-03'
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
locks: []
---

# Refactor Dashboard UI tests to mock Context Rejection Threshold

## Objective
Refactor the tests for `DagDashboard.tsx` and `DagNode.tsx` to correctly mock or pass the context threshold, eliminating direct imports of `MAX_REJECTION_THRESHOLD`.

## Acceptance Criteria
- [x] Update `DagDashboard.test.tsx` to correctly mock or pass `maxRejectionThreshold` in context.
- [x] Update `DagNode.test.tsx` to correctly mock or pass `maxRejectionThreshold` in context.
- [x] Eliminate all direct imports of `MAX_REJECTION_THRESHOLD` from `DagDashboard.test.tsx` and `DagNode.test.tsx`.
