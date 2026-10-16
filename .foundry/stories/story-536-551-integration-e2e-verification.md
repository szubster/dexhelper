---
id: story-536-551-integration-e2e-verification
type: STORY
title: E2E and Integration Testing for Gen3 Heuristic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-05'
updated_at: '2026-10-13'
depends_on:
  - story-536-550-remove-mock-and-fix-heuristic
jules_session_id: '14534191392819798487'
parent: epic-520-536-remove-gen3save-mock
tags:
  - e2e
  - integration
locks: []
rejection_reason: ''
---

# E2E and Integration Testing for Gen3 Heuristic

## Context
As required by the E2E verification mandate, this story is dedicated to running integration and E2E tests to ensure the `isGen3Save` heuristic correctly works in the wild and doesn't break other features.

## Requirements
- Verify that Gen 3 saves are properly parsed in Playwright E2E testing environments.
- Ensure the removal of the mock does not cause any regressions.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-551-683-gen3-heuristic-integration-e2e-impl
- [ ] task-551-684-gen3-heuristic-integration-e2e-qa
