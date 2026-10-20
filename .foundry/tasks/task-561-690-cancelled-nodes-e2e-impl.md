---
id: task-561-690-cancelled-nodes-e2e-impl
type: TASK
title: Implement E2E Test for Cancelled Nodes on Permanent Failure Dashboard
status: READY
owner_persona: coder
created_at: '2026-10-16T02:41:40.764Z'
updated_at: '2026-10-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-530-561-e2e-verify-cancelled-nodes
tags:
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement E2E Test for Cancelled Nodes on Permanent Failure Dashboard

## Objective
Write an E2E/Integration test to verify that the Permanent Failure Dashboard correctly displays CANCELLED nodes with high rejection counts (`>= 3`) and correctly highlights them.

## Acceptance Criteria
- [x] An E2E test is created and passes, verifying that `status: CANCELLED` nodes with `rejection_count >= 3` are visible in the Permanent Failure Dashboard.
