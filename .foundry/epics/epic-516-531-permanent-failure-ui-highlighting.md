---
id: epic-516-531-permanent-failure-ui-highlighting
type: EPIC
title: UI Highlighting for Cancelled Permanent Failures
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

# Epic: UI Highlighting for Cancelled Permanent Failures

This epic ensures that once permanently failed nodes are correctly filtered, they are visually distinguishable and correctly highlighted within the UI components.

## Objectives
- Update `src/components/dag/DagNode.tsx` to render appropriate visual cues for permanently failed `CANCELLED` nodes.
- Ensure the aesthetic aligns with the tactical hardware/snooping design (ADR 008), using appropriate dashed borders or specific colors for permanent failure status.
- Ensure the rejection count or rejection reason is visible in the node visualization if applicable.

## Acceptance Criteria
- [ ] Break down into multiple STORY nodes for updating the DAG Node visualization.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
