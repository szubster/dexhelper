---
id: idea-114-update-permanent-failure-dashboard-ui
type: IDEA
title: Update Permanent Failure Dashboard UI for Cancelled Nodes
status: READY
owner_persona: product_manager
created_at: '2026-07-12'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - ui
research_references: []
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Update Permanent Failure Dashboard UI for Cancelled Nodes

## Context
With the implementation of `epic-052-096-automated-max-rejection-cancellation`, nodes that reach the maximum rejection count (3) are now automatically transitioned to the `CANCELLED` status by the orchestrator.
Previously, the Permanent Failure Dashboard UI (`src/components/dag/DagDashboard.tsx` and `src/components/dag/DagNode.tsx`) filtered for nodes with `status === 'FAILED'` and `rejection_count >= 3`. Since these permanently failed nodes are now `CANCELLED`, they no longer appear in the Permanent Failure Dashboard.

## Proposed Solution
Update the filtering logic in the DAG UI components to include nodes that are `status === 'CANCELLED'` and have `rejection_count >= 3` (or check for the specific `rejection_reason`) so they are correctly highlighted as permanent failures.

## Acceptance Criteria
- [ ] prd-114-516-update-permanent-failure-dashboard-ui
