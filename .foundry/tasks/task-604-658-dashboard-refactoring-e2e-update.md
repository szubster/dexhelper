---
id: task-604-658-dashboard-refactoring-e2e-update
type: TASK
title: Update E2E Tests for Dashboard Refactoring (Retry)
status: READY
owner_persona: coder
created_at: '2026-10-03T23:00:51.000Z'
updated_at: '2026-10-03T23:00:51.000Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-519-604-dashboard-refactoring-e2e-v2
tags:
  - testing
  - e2e
  - playwright
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
confidence_score: 100
---

# Task: Update E2E Tests for Dashboard Refactoring (Retry)

## Context
As part of the Tailwind v4 migration, complex dashboard layouts and specialized trackers (e.g., `PokerusBadge.tsx`, data visualizations/radars) were refactored to use semantic `@utility` classes. E2E tests need to be updated to ensure they consistently pass with the newly refactored components and that no visual regressions occur in the tactical hardware aesthetic.

## Objectives
- Update Playwright E2E tests for dashboard and tracker components to reflect structural or styling class changes if needed.
- Ensure E2E tests target the actual rendered React components (avoiding hardcoded HTML injection).
- Fix any broken tests due to the refactoring.

## Acceptance Criteria
- [x] E2E tests for dashboard layouts and tracker components pass locally.
- [x] Visual regression snapshots are updated using `--update-snapshots` if necessary.
- [x] All tests follow Playwright best practices (relative paths, strict mode `.or()`, `isMobile` context handling).
