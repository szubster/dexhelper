---
id: story-536-551-integration-e2e-verification
type: STORY
title: E2E and Integration Testing for Gen3 Heuristic
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on:
  - story-536-550-remove-mock-and-fix-heuristic
jules_session_id: null
parent: epic-520-536-remove-gen3save-mock
tags:
  - e2e
  - integration
---

# E2E and Integration Testing for Gen3 Heuristic

## Context
As required by the E2E verification mandate, this story is dedicated to running integration and E2E tests to ensure the `isGen3Save` heuristic correctly works in the wild and doesn't break other features.

## Requirements
- Verify that Gen 3 saves are properly parsed in Playwright E2E testing environments.
- Ensure the removal of the mock does not cause any regressions.

## Acceptance Criteria
- [ ] Break down into Tasks
