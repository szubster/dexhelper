---
id: task-157-339-hidden-items-e2e-tests-qa
type: TASK
title: QA E2E Tests for Hidden Items UI
status: ACTIVE
owner_persona: qa
created_at: '2026-07-21'
updated_at: '2026-08-01'
depends_on:
  - task-157-338-hidden-items-e2e-tests-impl
jules_session_id: '16537868172268837134'
pr_number: null
parent: story-060-157-hidden-items-e2e-tests
tags:
  - testing
  - e2e
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA E2E Tests for Hidden Items UI

## Context
QA verification for the Hidden Items Finder UI Playwright E2E tests.

## Verification Requirements
- Verify that Playwright E2E tests have been implemented for the Hidden Items Finder UI.
- Verify that the tests evaluate the component's rendering correctly after save hydration.
- Verify that the tests correctly assert that acquired items are visually checked off.
- Verify that the local development server URL is used correctly (`http://localhost:3000/dexhelper/`).
- Verify that UI tests targeting tactical bracket formatting use regex matchers.
- Run the tests to ensure they pass consistently.

## Tech Lead Instructions
- **Empty PR Policy Reminder**: If you submit an empty PR because the logic already exists and is fully verified, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Error Handling Reminder**: If you experience a transient failure requiring retry (or if the coder's implementation fails your checks), update the YAML frontmatter to `status: FAILED` with a detailed `rejection_reason` explaining what the coder missed. If you must permanently abort (impossible or max rejections reached), update to `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [ ] Code review passes, ensuring Playwright tests are correctly implemented.
- [ ] Tests verify rendering after hydration.
- [ ] Tests verify visual check-off of acquired items.
- [ ] All tests pass consistently.
