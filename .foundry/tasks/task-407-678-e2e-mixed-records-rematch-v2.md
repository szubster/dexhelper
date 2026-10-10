---
id: task-407-678-e2e-mixed-records-rematch-v2
type: TASK
title: E2E Tests for Mixed Record and Rematch Tracking (v2)
status: READY
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - research-407-676-investigate-e2e-failure
parent: story-397-407-gen3-secret-base-parsing-e2e
jules_session_id: null
tags:
  - e2e
  - gen3
  - secret-base
rejection_count: 0
rejection_reason: ''
locks: []
---

# TASK: E2E Tests for Mixed Record and Rematch Tracking (v2)

## Context
As part of the Gen 3 Secret Base Epic, we need to verify mixed record trainer extraction and rematch tracking. This is a retry of `task-407-669-e2e-mixed-records-rematch` which failed due to an Autonomous No-Ask Policy Violation. It explicitly depends on the research node resolving any context issues.

## Acceptance Criteria
- [ ] Write E2E tests for mixed record trainer extraction.
- [ ] Write E2E tests for rematch status tracking.
- [ ] Ensure integration with UI.
