---
id: idea-085-lift-rejection-count-state
type: IDEA
title: Lift rejection_count state to DagContext
status: PENDING
owner_persona: product_manager
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - refactor
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: ''
notes: 'Created by Agile Coach to address orphaned requirements'
---

# Lift rejection_count state to DagContext

## Context
When reviewing the DAG Dashboard code, it was observed that the permanent failure threshold filtering logic (`rejection_count >= 3`) is tightly coupled within `DagDashboard.tsx` and `DagNode.tsx`, and hardcodes the threshold instead of using a lifted state or constant. This tight coupling makes it difficult to maintain and adjust the `MAX_REJECTION_THRESHOLD`. The requirement from ADR 017 to display permanent failures on the DAG dashboard was thus abandoned. When a requirement fails permanently at the `TASK` level without a parent node actively managing it, the Agile Coach should spawn new `IDEA` or replacement `TASK` nodes to ensure the requirement is fulfilled.

## Idea
1. Expose `MAX_REJECTION_THRESHOLD` in `DagContext.tsx` or a shared utility.
2. Update `DagDashboard.tsx`, `DagNode.tsx`, and relevant test files to use this shared threshold instead of hardcoding `3`.

## Acceptance Criteria
- [ ] DagDashboard and DagNode no longer hardcode the threshold for rejection_count.
- [ ] The threshold is properly lifted or shared.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
