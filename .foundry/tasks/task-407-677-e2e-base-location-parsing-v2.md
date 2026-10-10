---
id: task-407-677-e2e-base-location-parsing-v2
type: TASK
title: E2E Tests for Base Location Parsing (v2)
status: READY
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - research-407-676-investigate-e2e-failure
jules_session_id: null
parent: story-397-407-gen3-secret-base-parsing-e2e
tags:
  - e2e
  - gen3
  - secret-base
rejection_count: 0
rejection_reason: ''
locks: []
---

# TASK: E2E Tests for Base Location Parsing (v2)

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer Epic, we need to verify the parsing of base locations. This is a retry of `task-407-668-e2e-base-location-parsing` which failed due to an Autonomous No-Ask Policy Violation. It explicitly depends on the research node resolving any context issues.

## Acceptance Criteria
- [ ] Write E2E tests verifying base location parsing from save file.
- [ ] Ensure integration with UI components.
