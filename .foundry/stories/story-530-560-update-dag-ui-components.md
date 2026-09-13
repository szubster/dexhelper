---
id: story-530-560-update-dag-ui-components
type: STORY
title: Update DAG UI components to support CANCELLED status nodes
status: ACTIVE
owner_persona: tech_lead
created_at: 2026-09-09T00:00:00.000Z
updated_at: '2026-09-12'
depends_on: []
jules_session_id: '3239683981913908916'
pr_number: null
parent: epic-516-530-update-permanent-failure-dashboard-ui
tags:
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update DAG UI components to support CANCELLED status nodes

## Objective
Update the DAG UI components to support CANCELLED status nodes with high rejection counts so they correctly appear in the Permanent Failure Dashboard.

## Acceptance Criteria
- [ ] Nodes with `status: CANCELLED` and `rejection_count >= 3` are visible in the Permanent Failure Dashboard.
- [ ] Nodes with `status: CANCELLED` and `rejection_count >= 3` are highlighted correctly in `DagNode.tsx` and `DagDashboard.tsx` (using the same red styling as FAILED nodes with high rejection counts).
- [ ] The filter panel or data selection logic properly includes these nodes.
- [ ] Break down into Tasks.
