---
id: task-560-569-test-dag-cancelled-highlighting
type: TASK
title: Write unit tests for DAG CANCELLED node highlighting
status: PENDING
owner_persona: coder
created_at: '2026-09-11'
updated_at: '2026-09-11'
jules_session_id: null
parent: story-530-560-update-dag-ui-components
depends_on: [task-560-568-implement-dag-cancelled-highlighting]
tags: [ui, react, tests]
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Write unit tests for DAG CANCELLED node highlighting

## Objective
Write unit tests to verify the DAG UI components correctly handle CANCELLED status nodes with high rejection counts.

## Acceptance Criteria
- [ ] Tests for `DagNode.tsx` verify CANCELLED nodes with `rejection_count >= maxRejectionThreshold` get the permanent failure styling.
- [ ] Tests for `DagDashboard.tsx` verify `getMiniMapNodeColor` returns `#dc2626` for CANCELLED nodes with `rejection_count >= maxRejectionThreshold`.
- [ ] Tests for `DagDashboard.tsx` verify CANCELLED nodes with `rejection_count >= maxRejectionThreshold` are included when `showPermanentFailures` is true.
