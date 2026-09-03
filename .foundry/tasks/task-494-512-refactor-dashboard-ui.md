---
id: task-494-512-refactor-dashboard-ui
type: TASK
title: Refactor Dashboard UI components to use Context Rejection Threshold
status: ACTIVE
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '16760365745615102643'
pr_number: null
parent: story-344-494-dashboard-rejection-count
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Refactor Dashboard UI components to use Context Rejection Threshold

## Objective
Refactor `DagDashboard.tsx` and `DagNode.tsx` to use the `maxRejectionThreshold` from `useDagContext()` instead of importing the constant directly.

## Acceptance Criteria
- [x] Update `DagDashboard.tsx` to use `maxRejectionThreshold` from `useDagContext()` for filtering permanent failures.
- [x] Update `DagNode.tsx` to use `maxRejectionThreshold` from `useDagContext()` for determining permanent failure styles.
- [x] Eliminate all direct imports of `MAX_REJECTION_THRESHOLD` from `DagDashboard.tsx` and `DagNode.tsx`.
