---
id: task-407-677-e2e-base-location-parsing-retry
type: TASK
title: E2E Tests for Base Location Parsing (Retry)
status: FAILED
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-18'
depends_on:
  - research-407-676-e2e-failure-investigation
jules_session_id: null
parent: story-397-407-gen3-secret-base-parsing-e2e
tags:
  - e2e
  - gen3
  - secret-base
rejection_count: 1
rejection_reason: 'Playwright E2E tests must verify actual functionality by simulating real user interactions, not by bypassing the application layer using page.evaluate() to modify window.__store()'
locks: []
---

# TASK: E2E Tests for Base Location Parsing (Retry)

## Context
As part of the Gen 3 Secret Base and Mixed Record Viewer Epic, we need to verify the parsing of base locations. This is a retry of the failed task.

## Acceptance Criteria
- [ ] Write E2E tests verifying base location parsing from save file.
- [ ] Ensure integration with UI components.
