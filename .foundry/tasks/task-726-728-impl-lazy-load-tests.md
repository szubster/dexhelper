---
id: task-726-728-impl-lazy-load-tests
type: TASK
title: Implement E2E Tests for Lazy Loading Components
status: READY
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-25'
depends_on: []
jules_session_id: null
parent: story-421-726-splitting-validation
tags:
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# TASK: Implement E2E Tests for Lazy Loading Components

## Objective
Write Playwright E2E tests to verify that all components correctly lazy-load via `React.lazy`.

## Requirements
- Target specific routes and elements to ensure components are lazy-loaded dynamically without breaking the UI.
- Use page.evaluate() or network interception where necessary to confirm chunk loading if appropriate, or simply ensure the component correctly mounts after navigation.
- Ensure Vite cache is cleared locally before running to avoid false positives.

## Acceptance Criteria
- [ ] Tests verify lazy-loaded chunks load successfully upon interaction.
- [ ] No regression or unhandled promise rejections on navigation.
