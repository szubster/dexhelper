---
id: task-644-654-cva-visual-regression-base-components-impl
type: TASK
title: Implement CVA Visual Regression Tests - Base Components
status: ACTIVE
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-05'
depends_on: []
jules_session_id: '8106104577078333368'
pr_number: null
parent: story-568-644-cva-visual-regression-tests
tags:
  - testing
  - visual-regression
research_references:
  - .foundry/research/research-145-001-component-variant-libraries.md
  - .foundry/research/research-145-002-component-theming-mechanisms.md
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 60
confidence_score: 100
---

# Task: Implement CVA Visual Regression Tests - Base Components

## Objective
Write Playwright visual regression tests for the refactored base CVA components (e.g., buttons, badges, inputs).

## Requirements
- Target simple, base-level React components implemented with CVA.
- Ensure variants (intent, size, disabled, etc.) are covered and asserted correctly with snapshots.
- Ensure tests run correctly in CI.

## Acceptance Criteria
- [x] Create E2E test file(s) for base CVA components.
- [x] Ensure the tests can run in a headless CI environment.
- [x] Verify that visual snapshots match the expected tactical output.
