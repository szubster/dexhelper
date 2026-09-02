---
id: task-494-512-refactor-dashboard-ui
type: TASK
title: Refactor Dashboard UI components to use Context Rejection Threshold
status: READY
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-344-494-dashboard-rejection-count
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Refactor Dashboard UI components to use Context Rejection Threshold

## Objective
Refactor `DagDashboard.tsx` and `DagNode.tsx` to use the `maxRejectionThreshold` from `useDagContext()` instead of importing the constant directly.

## Acceptance Criteria
- [ ] Update `DagDashboard.tsx` to use `maxRejectionThreshold` from `useDagContext()` for filtering permanent failures.
- [ ] Update `DagNode.tsx` to use `maxRejectionThreshold` from `useDagContext()` for determining permanent failure styles.
- [ ] Eliminate all direct imports of `MAX_REJECTION_THRESHOLD` from `DagDashboard.tsx` and `DagNode.tsx`.
