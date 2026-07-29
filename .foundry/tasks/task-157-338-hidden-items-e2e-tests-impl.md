---
id: task-157-338-hidden-items-e2e-tests-impl
type: TASK
title: Implement E2E Tests for Hidden Items UI
status: READY
owner_persona: coder
created_at: '2026-07-21'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-060-157-hidden-items-e2e-tests
tags:
  - testing
  - e2e
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement E2E Tests for Hidden Items UI

## Context
To ensure the Hidden Items Finder UI functions as expected and integrates properly with save file hydration, we must write E2E tests validating the component's behavior.

## Product Requirements
- Write an E2E test using Playwright.
- Verify that the Hidden Items view renders correctly after save hydration.
- Verify that acquired items are visually checked off.

## Tech Lead Instructions
- Implement the E2E tests for the Hidden Items UI component using Playwright.
- Ensure the test suite loads a mock save state with at least one hidden item acquired and verifies the visual check-off in the UI.
- Ensure the local development server URL is used correctly in the Playwright scripts (`http://localhost:3000/dexhelper/`).
- If you write UI tests targeting tactical bracket formatting (e.g., `[ SYS.LABEL ]`), use regex matchers in `getByText` queries (e.g., `/SYS.LABEL/i`) because strict string matching fails on the bracketed text.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Playwright E2E tests are implemented for the Hidden Items UI.
- [ ] The tests verify that the Hidden Items view renders correctly after save hydration.
- [ ] The tests verify that acquired items are visually checked off.
- [ ] Tests pass consistently.
