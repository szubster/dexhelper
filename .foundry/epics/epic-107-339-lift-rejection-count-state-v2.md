---
id: epic-107-339-lift-rejection-count-state-v2
type: EPIC
title: Lift Constant and Update Context V2
status: PENDING
owner_persona: story_owner
created_at: '2026-07-22'
updated_at: '2026-07-22'
depends_on:
  - research-107-336-investigate-epic-301-failure
jules_session_id: null
pr_number: null
parent: prd-085-107-lift-rejection-count-state
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Lift Constant and Update Context V2

## Objective
Extract the `MAX_REJECTION_THRESHOLD` constant (value: 3) from local file scopes into `DagContext.tsx` or a dedicated shared constants utility, and expose it through the React context layer.

## Context
Currently, the threshold for determining if a node has permanently failed (`rejection_count >= 3`) is hardcoded in several components (e.g., `DagDashboard.tsx` and `DagNode.tsx`). This tight coupling makes maintaining and modifying the threshold difficult. Lifting this state is required by ADR 017 to display permanent failures correctly on the dashboard.

## Requirements
1. Define `MAX_REJECTION_THRESHOLD = 3` in `DagContext.tsx` (or a shared constants file).
2. Expose this value through the `DagContextState` interface.
3. Provide the value in the `DagProvider`.
4. Include an explicit requirement for E2E and integration tests.

## Acceptance Criteria
- [ ] Break down into Stories