---
id: task-490-525-progression-switcher-e2e-impl
type: TASK
title: Progression UI Context Switcher E2E Tests
status: PENDING
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-490-524-progression-sync-e2e-impl
jules_session_id: null
locks: []
pr_number: null
parent: story-036-490-progression-e2e-verification
tags:
  - ui
  - progression
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Progression UI Context Switcher E2E Tests

## Objective
Implement Playwright end-to-end tests to verify the concurrent game switcher UI correctly reflects active playthrough context swaps.

## Requirements
- Write E2E tests to verify the game switcher UI component.
- Ensure the UI accurately updates and reflects the correct state when switching between concurrent game saves.
- Tests must explicitly inspect the DOM and user interface (avoid solely polling internal state).

## Acceptance Criteria
- [ ] Implement Playwright E2E tests for the concurrent game switcher UI.
- [ ] Verify that context swaps correctly update the UI and underlying data context.
- [ ] Tests must run successfully against the local webserver.
