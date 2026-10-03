---
id: task-644-655-cva-visual-regression-complex-components-impl
type: TASK
title: Implement CVA Visual Regression Tests - Complex Components
status: ACTIVE
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-03'
depends_on: []
jules_session_id: '4775800541455720175'
pr_number: null
parent: story-568-644-cva-visual-regression-tests
tags:
  - testing
  - visual-regression
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
  - .foundry/research/research-145-002-component-theming-mechanisms.md
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Task: Implement CVA Visual Regression Tests - Complex Components

## Objective
Write Playwright visual regression tests for the refactored complex CVA components (e.g., cards, panels, modals).

## Requirements
- Target structural and layout-heavy React components.
- Ensure variants and slotted layouts are asserted with Playwright visual snapshots.
- Ensure tests run correctly in CI.

## Acceptance Criteria
- [ ] Create E2E test file(s) for complex CVA components.
- [ ] Ensure the tests can run in a headless CI environment.
- [ ] Verify that visual snapshots match the expected tactical output.
