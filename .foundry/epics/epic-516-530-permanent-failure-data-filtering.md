---
id: epic-516-530-permanent-failure-data-filtering
type: EPIC
title: Data Filtering for Cancelled Permanent Failures
status: PENDING
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-114-516-update-permanent-failure-dashboard-ui
tags:
  - foundry
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Data Filtering for Cancelled Permanent Failures

This epic focuses on updating the core filtering logic within the DAG Dashboard to correctly identify and include nodes that have reached a permanent failure state via cancellation.

## Objectives
- Identify nodes with `status === CANCELLED` and `rejection_count >= 3`.
- Include nodes with `status === CANCELLED` that have a specific `rejection_reason`.
- Update the state or props filtering logic in `src/components/dag/DagDashboard.tsx` to properly bucket these nodes into the Permanent Failure Dashboard.

## Acceptance Criteria
- [ ] Break down into multiple STORY nodes for implementing the filtering logic.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
