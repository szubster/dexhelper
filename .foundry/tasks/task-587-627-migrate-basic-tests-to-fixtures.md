---
id: task-587-627-migrate-basic-tests-to-fixtures
type: TASK
title: Migrate Basic Tests to Fixtures
status: ACTIVE
owner_persona: coder
created_at: '2026-09-25'
updated_at: '2026-09-28'
depends_on: []
jules_session_id: '15433415338098302767'
pr_number: null
parent: story-578-587-e2e-fixtures-integration-verification
tags:
  - testing
  - e2e
  - playwright
  - integration
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Task: Migrate Basic Tests to Fixtures

## Objective
Migrate basic existing E2E tests to use the newly created Playwright custom fixtures.

## Scope
- Refactor basic E2E tests (e.g., `tests/e2e/settings.spec.ts`, `tests/e2e/version_selection.spec.ts`) to import `test` and `expect` from `tests/e2e/fixtures/index.ts`.
- Replace instances of `initializeWithSave` with the `loadSave` fixture in the refactored tests.
- Ensure all refactored tests still pass correctly.

## Acceptance Criteria
- [x] Basic tests are migrated to use the `loadSave` fixture.
- [x] Tests execute successfully using `pnpm test:e2e <file>`.
