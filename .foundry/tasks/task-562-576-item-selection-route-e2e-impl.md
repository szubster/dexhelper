---
id: task-562-576-item-selection-route-e2e-impl
type: TASK
title: Write E2E Tests for Item Selection and Route Display
status: CANCELLED
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-556-562-e2e-tests-item-selection-route-display
tags:
  - e2e
  - integration
research_references: []
rejection_count: 2
rejection_reason: 'Permanent failure: The UI components for Wild Item Selection do not exist yet. This task lacks a dependency on the UI implementation task (task-562-579) and must be aborted to prevent infinite resurrection loops.'
notes: ''
locks: []
priority: 50
---

# Task: Write E2E Tests for Item Selection and Route Display

## Context
This task implements the e2e testing requirements defined in its parent story. It requires writing Playwright tests to ensure the UI correctly handles item selection and displays the appropriate routes and drop rates.

## Requirements
- Write Playwright tests verifying the item selection dropdown works correctly.
- Write tests to ensure selecting an item displays the correct recommended routes and encounter rates on the UI.
- Use the `isMobile` context fixture to account for layout adjustments if necessary.
- Tests should be written in `tests/e2e/`.

## Acceptance Criteria
- [ ] coder: Write the e2e tests.
