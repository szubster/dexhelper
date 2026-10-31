---
id: task-560-721-test-trick-house-e2e
type: TASK
title: Implement Gen 3 Trick House E2E Tests
status: READY
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-540-560-trick-house-e2e
tags:
  - dexhelper
  - feature
  - gen3
  - tracker
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Trick House E2E Tests

## Context
We need Playwright E2E tests to verify the Gen 3 Trick House Tracker UI integration with mocked save files.

## Requirements
- Expand `tests/e2e/gen3_trick_house.spec.ts` with comprehensive E2E tests.
- Use `initializeWithSave` to load mock Emerald/Ruby/Sapphire save files.
- Verify the dashboard displays the correct trick house level, entrance state, and puzzle room state.
- Ensure tests interact with the actual rendered React components.

## Acceptance Criteria
- [ ] Implement E2E tests in `tests/e2e/gen3_trick_house.spec.ts`.
