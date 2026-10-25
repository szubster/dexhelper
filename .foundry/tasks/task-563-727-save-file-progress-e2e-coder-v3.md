---
id: task-563-727-save-file-progress-e2e-coder-v3
type: TASK
title: Implement Save File Progress E2E Tests (v3)
status: READY
owner_persona: coder
created_at: '2026-10-25T00:00:00.000Z'
updated_at: '2026-10-25T00:00:00.000Z'
depends_on:
  - research-563-726-investigate-e2e-retry-failure
jules_session_id: null
pr_number: null
parent: story-556-563-e2e-tests-save-file-progress-tracking
tags:
  - e2e
  - playwright
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Save File Progress E2E Tests (v3)

## Context
Implementation of the Playwright End-to-End tests simulating save file uploads to verify the success notifications for wild held item progress tracking, based on v3 research findings.

## Requirements
- Write a Playwright test file `tests/e2e/wild-item-tracking.spec.ts`.
- Simulate uploading the `with-target-item` fixture.
- Verify that a success notification or relevant UI highlight indicating the item was acquired successfully is displayed.
- Simulate uploading the `without-target-item` fixture.
- Verify the success notification is NOT displayed.
- Use Playwright best practices including `isMobile` fixture for layout adjustments and `clearStorage`/`waitForSync` from `tests/e2e/test-utils.ts`.

## Acceptance Criteria
- [ ] Test file `tests/e2e/wild-item-tracking.spec.ts` is implemented.
- [ ] Test correctly passes when a save with the item is injected.
- [ ] Test correctly passes when a save without the item is injected.
