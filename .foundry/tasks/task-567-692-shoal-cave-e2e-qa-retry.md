---
id: task-567-692-shoal-cave-e2e-qa-retry
type: TASK
title: Retry QA Playwright E2E Tests for Shoal Cave Dashboard
status: READY
owner_persona: qa
created_at: '2026-10-16T12:54:07.509Z'
updated_at: '2026-10-16'
depends_on:
  - task-567-691-shoal-cave-e2e-coder-retry
jules_session_id: null
pr_number: null
parent: story-412-567-shoal-cave-e2e-verification
tags:
  - e2e
  - integration
  - gen3
  - shoal-cave
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Retry QA Playwright E2E Tests for Shoal Cave Dashboard

## Context
QA the end-to-end tests for the Shoal Cave UI Dashboard, validating the retry implementation. Verify the Playwright E2E tests authored by the coder test the dashboard correctly against the constraints and verify the display of the current tide, countdown, item counts, and crafting readiness indicator.

## Constraints
- Run `pnpm lint` and `pnpm test`.
- Run the E2E tests specifically using `xvfb-run -a pnpm test:e2e tests/e2e/shoal-cave-dashboard.spec.ts`.

## Acceptance Criteria
- [ ] Review the Playwright E2E test file for correctness and coverage.
- [ ] Verify tests pass in both desktop and mobile contexts.
- [ ] Verify there are no regressions via `pnpm lint` and `pnpm test`.
