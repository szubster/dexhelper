---
id: prd-085-107-lift-rejection-count-state
type: PRD
title: Lift rejection_count state to DagContext
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-05'
updated_at: '2026-07-22'
depends_on: []
jules_session_id: '12903023622937405499'
pr_number: null
parent: idea-085-lift-rejection-count-state
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Lift rejection_count state to DagContext

## Context
When reviewing the DAG Dashboard code, it was observed that the permanent failure threshold filtering logic (`rejection_count >= 3`) is tightly coupled within `DagDashboard.tsx` and `DagNode.tsx`, and hardcodes the threshold instead of using a lifted state or constant. This tight coupling makes it difficult to maintain and adjust the `MAX_REJECTION_THRESHOLD`. The requirement from ADR 017 to display permanent failures on the DAG dashboard was thus abandoned.

## Requirements
1. Extract `MAX_REJECTION_THRESHOLD` (value: 3) to `DagContext.tsx` or a dedicated shared constants utility file.
2. Update `DagDashboard.tsx` to use this shared constant when filtering for permanent failures.
3. Update `DagNode.tsx` to use this shared constant for any threshold checks.
4. Ensure all related test files are updated to reflect this shared constant.

## Acceptance Criteria
- [x] Break down into Epics

## Generated Epics
- [x] epic-107-301-lift-rejection-count-state
- [x] epic-107-302-update-dashboard-rejection-count
- [ ] research-107-342-investigate-lift-rejection-count-failure
- [ ] epic-107-343-lift-rejection-count-state
- [ ] epic-107-344-update-dashboard-rejection-count
