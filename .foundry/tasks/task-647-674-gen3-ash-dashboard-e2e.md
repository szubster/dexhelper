---
id: task-647-674-gen3-ash-dashboard-e2e
type: TASK
title: 'Task: E2E Tests for Gen 3 Volcanic Ash Tracker Dashboard UI'
status: PENDING
owner_persona: coder
created_at: '2026-10-03T19:33:53.000Z'
updated_at: '2026-10-03T19:33:53.000Z'
depends_on:
  - task-647-673-gen3-ash-dashboard-ui-impl
jules_session_id: null
pr_number: null
parent: story-269-647-gen3-ash-dashboard-ui
tags:
  - ui
  - e2e
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ''
locks: []
---

# Task: E2E Tests for Gen 3 Volcanic Ash Tracker Dashboard UI

## Description
Write integration E2E tests using Playwright for the newly created Gen 3 Volcanic Ash Tracker Dashboard UI.

## Constraints
- Do not use `page.evaluate()` to manually inject hardcoded HTML strings into the DOM. E2E tests must target and verify the actual rendered React components.
- Always use the `isMobile` fixture to conditionally adjust locators if needed.
- Playwright tests and code examples must use relative paths (e.g., `./dashboard`) for navigation rather than absolute paths.

## Acceptance Criteria
- [ ] Write integration E2E tests for the new Ash Tracker UI component.
