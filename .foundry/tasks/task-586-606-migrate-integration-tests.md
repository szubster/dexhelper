---
id: task-586-606-migrate-integration-tests
type: TASK
jules_session_id: null
title: Migrate Integration Tests
status: READY
owner_persona: coder
created_at: '2026-09-21'
updated_at: '2026-09-21'
depends_on: ['task-586-605-implement-save-state-fixtures']
pr_number: null
parent: story-578-586-create-playwright-fixtures-definition
priority: 60
tags: ['testing', 'e2e', 'playwright', 'DX']
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Migrate Integration Tests

## Objective
Migrate `tests/e2e/fixtures_integration.spec.ts` to use custom fixtures.

## Scope
- Import `test` and `expect` from `tests/e2e/fixtures/index.ts` in `tests/e2e/fixtures_integration.spec.ts`.
- Refactor test cases to use the `loadSave` fixture.

## Acceptance Criteria
- [ ] Tests use the custom fixtures.
- [ ] `pnpm test:e2e tests/e2e/fixtures_integration.spec.ts` passes.