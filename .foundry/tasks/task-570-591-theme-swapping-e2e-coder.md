---
id: task-570-591-theme-swapping-e2e-coder
type: TASK
title: Write E2E tests for theme swapping
status: READY
owner_persona: coder
created_at: '2026-09-18T17:03:41Z'
updated_at: '2026-09-18T17:03:41Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-566-570-cva-theme-variables-e2e-verification
tags:
  - e2e
  - testing
  - theming
research_references: []
rejection_reason: ''
locks: []
priority: 60
---

# Task: Write E2E tests for theme swapping

## Context
As part of our theming architecture, CSS custom variables are swapped at the document root to change themes. We need to verify that this swapping mechanism works correctly on the frontend.

## Objective
Write Playwright E2E tests to ensure that swapping theme variables behaves as expected on the frontend (e.g., testing different document themes).

## Acceptance Criteria
- [ ] Write E2E tests to simulate swapping themes and verify the document's CSS variables update correctly.
- [ ] Ensure that background colors and text colors update to match the newly swapped theme.
- [ ] Tests must pass successfully.
