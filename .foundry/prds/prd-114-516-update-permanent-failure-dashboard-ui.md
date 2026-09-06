---
id: prd-114-516-update-permanent-failure-dashboard-ui
type: PRD
title: Update Permanent Failure Dashboard UI for Cancelled Nodes
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-02'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '1890615126053409955'
pr_number: null
parent: idea-114-update-permanent-failure-dashboard-ui
tags:
  - foundry
  - ui
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# PRD: Update Permanent Failure Dashboard UI for Cancelled Nodes

## Objective
Update the DAG UI components to include nodes that are 'CANCELLED' with a rejection count of 3 or more (or a specific rejection reason) so they correctly appear in the Permanent Failure Dashboard.

## Context
Nodes that reach the max rejection count of 3 are now automatically transitioned to 'CANCELLED' status. The current UI filters for 'FAILED' and 'rejection_count >= 3', which misses these permanently failed nodes.

## Requirements
1. Update filtering logic in the DAG UI components to include nodes with 'status === CANCELLED' and 'rejection_count >= 3' (or checking for the specific rejection reason).
2. Ensure these nodes are correctly highlighted as permanent failures.

## Scope
- src/components/dag/DagDashboard.tsx
- src/components/dag/DagNode.tsx

## Acceptance Criteria
- [ ] epic-516-530-update-permanent-failure-dashboard-ui
