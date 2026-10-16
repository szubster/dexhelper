---
id: task-551-683-gen3-heuristic-integration-e2e-impl
type: TASK
title: Implement Gen 3 Heuristic Integration and E2E Tests
status: READY
owner_persona: coder
created_at: '2026-09-18'
updated_at: '2026-09-18'
depends_on: []
jules_session_id: null
parent: story-536-551-integration-e2e-verification
tags:
  - e2e
  - integration
locks: []
rejection_reason: ''
---

# Implement Gen 3 Heuristic Integration and E2E Tests

## Context
As part of the Gen 3 Heuristic fix, we need to implement integration and E2E tests to verify that `isGen3Save` functions correctly without the mock.

## Requirements
- Write integration tests verifying proper Gen 3 save detection.
- Write E2E tests in Playwright to verify full functionality using real Gen 3 saves.
- Ensure tests verify there are no regressions caused by the mock removal.

## Acceptance Criteria
- [ ] Implement integration tests for `isGen3Save`.
- [ ] Implement E2E tests to verify Gen 3 save detection.
