---
id: task-563-691-save-file-progress-e2e-coder-retry
type: TASK
title: Implement Save File Progress E2E Tests (Retry)
status: CANCELLED
owner_persona: coder
created_at: '2026-10-16T21:00:50.586Z'
updated_at: '2026-10-25'
depends_on:
  - research-563-690-investigate-save-file-progress-e2e-failure
jules_session_id: null
pr_number: null
parent: story-556-563-e2e-tests-save-file-progress-tracking
tags:
  - e2e
  - playwright
  - integration
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
locks: []
---

# Task: Implement Save File Progress E2E Tests (Retry)

## Context
Retry of the Playwright End-to-End tests simulating save file uploads to verify the success notifications for wild held item progress tracking, based on research findings.

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
