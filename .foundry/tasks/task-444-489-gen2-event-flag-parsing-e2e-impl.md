---
id: task-444-489-gen2-event-flag-parsing-e2e-impl
type: TASK
title: Implement E2E tests for Gen 2 Event Flag parsing
status: PENDING
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-061-444-gen2-event-flag-parsing-e2e
tags:
  - gen2
  - backend
  - save-parsing
  - e2e
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement E2E tests for Gen 2 Event Flag parsing

## Objective
Write E2E tests using Playwright to validate that mapped Gen 2 daily/weekly events appear correctly in the dynamic checklist UI.

## Technical Requirements
Create a new E2E test file (e.g., `tests/e2e/gen2_daily_events.spec.ts`) or add to an existing one. Use `initializeWithSave` to load a Gen 2 save file with known event flag states. Navigate to the relevant dashboard or checklist UI and assert that the Friday Lapras, Bug Catching Contest, Haircut Brothers, Daily Mystery Gift, Buena's Password, and Weekday Siblings events are displayed with their expected completion status.

## Acceptance Criteria
- [ ] E2E tests are implemented and pass for Gen 2 daily/weekly event display.
