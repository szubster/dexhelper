---
id: task-605-688-permanent-failure-dashboard-e2e-qa
type: TASK
title: QA Playwright E2E Tests for Permanent Failure Dashboard UI
status: COMPLETED
owner_persona: qa
created_at: '2026-10-14'
updated_at: '2026-10-20'
depends_on:
  - task-605-687-permanent-failure-dashboard-e2e-tests
jules_session_id: null
pr_number: null
parent: story-047-605-permanent-failure-dashboard-e2e
tags:
  - foundry
  - ui
  - dashboard
  - e2e
  - playwright
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# QA Playwright E2E Tests for Permanent Failure Dashboard UI

## Objective
Verify the E2E tests for the "Permanent Failures" dashboard view implemented by the coder.

## Context
A coder has just implemented Playwright E2E tests for the "Permanent Failures" view in the DAG Dashboard. We need to review and ensure the tests are robust, use correct locators, and follow our Playwright E2E Best Practices (e.g., using relative paths, handling Vite base URL correctly, targeting specific files).

## Acceptance Criteria
- [x] Review the Playwright E2E test file (`tests/e2e/dashboard/permanent_failures.spec.ts` or similar).
- [x] Ensure the tests use relative paths for navigation (e.g., `./dag`).
- [x] Run the tests using `xvfb-run -a pnpm test:e2e tests/e2e/dashboard/permanent_failures.spec.ts` to ensure they pass.
- [x] Verify that the E2E tests adequately cover the filtering logic and UI aesthetics (red border, brightness) for permanently failed nodes.
