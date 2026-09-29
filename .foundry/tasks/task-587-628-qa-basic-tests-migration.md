---
id: task-587-628-qa-basic-tests-migration
type: TASK
title: QA Basic Tests Migration
status: ACTIVE
owner_persona: qa
created_at: '2026-09-25'
updated_at: '2026-09-29'
depends_on:
  - task-587-627-migrate-basic-tests-to-fixtures
jules_session_id: '3388233862601467251'
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

# Task: QA Basic Tests Migration

## Objective
Verify the migration of basic E2E tests to the new Playwright fixtures.

## Scope
- Review the migrated tests to ensure they correctly use `loadSave` from `tests/e2e/fixtures/index.ts`.
- Execute the migrated tests to confirm they pass without regressions.

## Acceptance Criteria
- [ ] Code review confirms correct fixture usage.
- [ ] Tests pass via `pnpm test:e2e`.
