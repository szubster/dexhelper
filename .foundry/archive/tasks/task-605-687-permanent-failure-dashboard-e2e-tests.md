---
id: task-605-687-permanent-failure-dashboard-e2e-tests
type: TASK
title: Write Playwright E2E Tests for Permanent Failure Dashboard UI
status: COMPLETED
owner_persona: coder
created_at: '2026-10-14'
updated_at: '2026-10-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-047-605-permanent-failure-dashboard-e2e
tags:
  - foundry
  - ui
  - dashboard
  - e2e
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Write Playwright E2E Tests for Permanent Failure Dashboard UI

## Objective
Write Playwright E2E tests to verify the "Permanent Failures" view in the DAG Dashboard correctly filters and displays permanently failed nodes.

## Context
The "Permanent Failures" dashboard feature has been implemented, allowing users to filter and view nodes that have reached their max rejection count and permanently failed. We need to verify this functionality end-to-end using Playwright to ensure the UI correctly fetches data, filters it, and applies the correct styling to failed nodes.

## Acceptance Criteria
- [x] Implement Playwright E2E tests in `tests/e2e/dashboard/permanent_failures.spec.ts` (or similar file) to test the filtering functionality.
- [x] The tests should verify that toggling the filter correctly shows/hides the permanent failures and applies correct classes/styles (e.g. `border-red-500`, `brightness-125`).
- [x] The tests should intercept or mock the `/foundry.json` (or similar) endpoint to provide deterministic test data.
- [x] Ensure all playwright tests pass locally.
