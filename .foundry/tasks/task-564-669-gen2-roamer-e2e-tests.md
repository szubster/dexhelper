---
id: task-564-669-gen2-roamer-e2e-tests
type: TASK
title: Gen 2 Roamer E2E Tests
status: FAILED
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-29'
depends_on:
  - task-564-668-gen2-roamer-ui-impl
jules_session_id: null
pr_number: null
parent: story-140-564-gen2-roamer-translation-integration
tags:
  - gen2
  - roamer
  - e2e
research_references: []
rejection_count: 2
rejection_reason: 'Autonomous No-Ask Policy Violation: Session entered AWAITING_USER_FEEDBACK'
notes: ''
locks: []
---

# Gen 2 Roamer E2E Tests

## Objective
Write Playwright E2E tests for the Gen 2 roamer translation UI.

## Description
- Write or update E2E tests to confirm the dashboard correctly renders the human-readable route names for roamers.
- Use Playwright relative paths and correct assertions as per E2E policies.

## Acceptance Criteria
- [x] E2E tests successfully verify the rendering of roamer locations.
- [x] Tests use relative paths and correct strict mode assertions.

### Auditor Rejection
The Playwright E2E tests violate the Playwright E2E Architecture Policy by using `page.evaluate()` to directly inject hardcoded save state into the store. You must write E2E tests that verify the UI by interacting with the application layer normally.
