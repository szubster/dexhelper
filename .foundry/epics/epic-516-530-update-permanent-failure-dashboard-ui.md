---
id: epic-516-530-update-permanent-failure-dashboard-ui
type: EPIC
title: Update Permanent Failure Dashboard UI for Cancelled Nodes
status: PENDING
owner_persona: story_owner
created_at: "2026-09-04"
updated_at: "2026-09-04"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: prd-114-516-update-permanent-failure-dashboard-ui
tags:
  - foundry
  - ui
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Update Permanent Failure Dashboard UI for Cancelled Nodes

## Objective
Update the DAG UI components to include nodes that are `CANCELLED` with a rejection count of 3 or more (or a specific rejection reason) so they correctly appear in the Permanent Failure Dashboard.

## Prerequisites
- Familiarity with the DAG React Flow components (`DagDashboard.tsx` and `DagNode.tsx`).
- Understanding of the Permanent Failure Dashboard filtering logic.

## Acceptance Criteria
- [ ] Nodes with `status: CANCELLED` and `rejection_count >= 3` are visible in the Permanent Failure Dashboard.
- [ ] Nodes with `status: CANCELLED` and `rejection_count >= 3` are highlighted correctly (e.g., using the same red styling as FAILED nodes with high rejection counts) in `DagNode.tsx` and `DagDashboard.tsx`.
- [ ] The filter panel or data selection logic properly includes these nodes.
- [ ] An E2E/Integration test STORY is created to verify the Permanent Failure Dashboard correctly displays CANCELLED nodes.

## Implementation Details
1. Modify the `DagDashboard.tsx` and `DagNode.tsx` components to account for the new `CANCELLED` status when identifying permanently failed nodes.
2. Ensure the mini-map node color logic and node rendering logic treats `CANCELLED` nodes with high rejection counts equivalently to permanently `FAILED` nodes.
