---
id: task-560-568-implement-dag-cancelled-highlighting
type: TASK
title: Implement DAG CANCELLED node highlighting
status: READY
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-14'
depends_on: []
jules_session_id: null
parent: story-530-560-update-dag-ui-components
tags:
  - ui
  - react
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement DAG CANCELLED node highlighting

## Objective
Update the DAG UI components to support CANCELLED status nodes with high rejection counts so they correctly appear in the Permanent Failure Dashboard.

## Acceptance Criteria
- [x] Nodes with `status: CANCELLED` and `rejection_count >= maxRejectionThreshold` are highlighted in `DagNode.tsx` using the same red styling as FAILED nodes with high rejection counts (e.g., `isPermanentFailure`).
- [x] Nodes with `status: CANCELLED` and `rejection_count >= maxRejectionThreshold` are rendered as red (`#dc2626`) in `getMiniMapNodeColor` inside `DagDashboard.tsx`.
- [x] `displayNodes` logic in `DagDashboard.tsx` properly includes CANCELLED nodes with `rejection_count >= maxRejectionThreshold` when `showPermanentFailures` is true.
