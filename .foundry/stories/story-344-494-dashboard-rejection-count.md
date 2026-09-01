---
id: story-344-494-dashboard-rejection-count
type: STORY
title: Refactor Dashboard UI to consume Context Rejection Threshold
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-31'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: '15823873669453076371'
pr_number: null
parent: epic-107-344-update-dashboard-rejection-count
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Dashboard UI to consume Context Rejection Threshold

## Objective
Refactor `DagDashboard.tsx`, `DagNode.tsx`, and their corresponding test files to use the `MAX_REJECTION_THRESHOLD` constant injected by `DagContext` instead of importing it directly.

## Requirements
1. Update `DagDashboard.tsx` to use the `maxRejectionThreshold` from `useDagContext()` instead of direct imports for filtering out permanent failures.
2. Update `DagNode.tsx` to use the `maxRejectionThreshold` from `useDagContext()` for determining permanent failure styles.
3. Update tests (`DagDashboard.test.tsx`, `DagNode.test.tsx`) to correctly mock or pass the context threshold.
4. Eliminate all direct imports of `MAX_REJECTION_THRESHOLD` from these files.

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.
- [ ] task-494-512-refactor-dashboard-ui
- [ ] task-494-513-refactor-dashboard-tests
- [ ] task-494-514-qa-verify-dashboard
