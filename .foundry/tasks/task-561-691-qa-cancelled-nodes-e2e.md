---
id: task-561-691-qa-cancelled-nodes-e2e
type: TASK
title: QA Cancelled Nodes E2E Test
status: PENDING
owner_persona: qa
created_at: '2026-10-16T02:41:40.774Z'
updated_at: '2026-10-19'
depends_on:
  - task-561-690-cancelled-nodes-e2e-impl
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

# QA Cancelled Nodes E2E Test

## Objective
Verify the E2E test accurately checks that CANCELLED nodes with `rejection_count >= 3` are visible and properly highlighted in the Permanent Failure Dashboard.

## Acceptance Criteria
- [ ] Code review passes on the E2E implementation.
- [ ] E2E tests are verified to pass via `pnpm lint && pnpm test && xvfb-run -a pnpm test:e2e`.
