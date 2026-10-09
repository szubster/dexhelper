---
id: task-567-587-shoal-cave-e2e-qa
type: TASK
title: QA Playwright E2E Tests for Shoal Cave Dashboard
status: PENDING
owner_persona: qa
created_at: '2026-09-16T22:50:17Z'
updated_at: '2026-09-18'
depends_on:
  - task-567-586-shoal-cave-e2e-coder
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

# Task: QA Playwright E2E Tests for Shoal Cave Dashboard

## Context
QA the end-to-end tests for the Shoal Cave UI Dashboard. Verify the Playwright E2E tests authored by the coder test the dashboard correctly against the constraints and verify the display of the current tide, countdown, item counts, and crafting readiness indicator.

## Constraints
- Run `pnpm lint` and `pnpm test`.
- Run the E2E tests specifically using `xvfb-run -a pnpm test:e2e tests/e2e/shoal-cave-dashboard.spec.ts`.

## Acceptance Criteria
- [ ] Review the Playwright E2E test file (e.g., `tests/e2e/shoal-cave-dashboard.spec.ts`) for correctness and coverage.
- [ ] Verify tests pass in both desktop and mobile contexts.
- [ ] Verify there are no regressions via `pnpm lint` and `pnpm test`.
