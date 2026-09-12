---
id: story-530-561-e2e-verify-cancelled-nodes
type: STORY
title: E2E Verify Cancelled Nodes on Permanent Failure Dashboard
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-09T00:00:00.000Z'
updated_at: '2026-09-12'
depends_on:
  - story-530-560-update-dag-ui-components
jules_session_id: null
pr_number: null
parent: epic-516-530-update-permanent-failure-dashboard-ui
tags:
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# E2E Verify Cancelled Nodes on Permanent Failure Dashboard

## Objective
Write an E2E/Integration test to verify that the Permanent Failure Dashboard correctly displays CANCELLED nodes with high rejection counts (`>= 3`) and correctly highlights them.

## Acceptance Criteria
- [ ] An E2E test is created and passes, verifying that `status: CANCELLED` nodes with `rejection_count >= 3` are visible in the Permanent Failure Dashboard.
- [ ] Break down into Tasks.
