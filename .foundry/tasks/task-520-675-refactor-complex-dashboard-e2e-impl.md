---
id: task-520-675-refactor-complex-dashboard-e2e-impl
type: TASK
title: E2E Verification for Complex Dashboard Components Migration - Implementation
status: READY
owner_persona: coder
created_at: '2026-09-03T13:29:59.885Z'
updated_at: '2026-10-10'
depends_on:
  - story-125-519-refactor-complex-dashboard
jules_session_id: null
pr_number: null
parent: story-125-520-refactor-complex-dashboard-e2e
tags:
  - styling
  - refactor
  - ui
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 100
---

# Task: E2E Verification for Complex Dashboard Components Migration - Implementation

## Context
Following the Tailwind v4 migration of complex dashboard components and specialized tracker UIs to use `@utility` classes, an exclusive Integration and E2E Verification story is required to ensure no visual or functional regressions have been introduced.

## Objectives
- **E2E Testing:** Write Playwright tests verifying that the refactored dashboard layouts and complex trackers render correctly.
- **Aesthetic Validation:** Validate that the tactical hardware aesthetics (sharp edges, dashed borders, specific background themes, and font styling) have not degraded as a result of using the new `@utility` classes.

## Implementation Details
1. Create or update E2E tests in `tests/e2e/dashboard.spec.ts` and `tests/e2e/trackers.spec.ts` (or relevant file) using Playwright.
2. Assert on visual styles corresponding to `tactical-panel`, `tactical-text`, and other relevant `@utility` classes by checking computed styles or snapshot tests.
3. Adhere to Playwright best practices (use relative navigation paths, use `locator.or()` for Strict Mode OR conditions, target specific elements).
4. Run E2E tests via `xvfb-run -a pnpm test:e2e tests/e2e/dashboard.spec.ts tests/e2e/trackers.spec.ts` and ensure they pass.

## Acceptance Criteria
- [ ] Playwright E2E tests for dashboard and tracker components exist, verifying structural rendering and style persistence.
- [ ] The E2E tests pass reliably.
