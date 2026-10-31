---
id: story-580-673-migrate-settings-e2e-tests
type: STORY
title: Migrate Settings E2E Tests to COM Pattern
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-09'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: '1991600177036886989'
pr_number: null
parent: epic-566-580-e2e-test-migration
tags:
  - testing
  - e2e
  - playwright
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Story: Migrate Settings E2E Tests to COM Pattern

## Objective
Refactor existing Settings-related E2E tests (`tests/e2e/settings.spec.ts` and `tests/e2e/settings_advanced.spec.ts`) to utilize the `SettingsModalModel` COM.

## Scope
- Replace raw DOM locators in the tests with COM interactions.
- Utilize custom fixtures where applicable.
- Ensure the refactored tests pass consistently.

## Acceptance Criteria
- [x] Settings tests are refactored to use `SettingsModalModel`.
- [x] Tests use semantic locators via the COM.
- [x] Tech Lead: Break down into Tasks.
- [x] task-673-687-migrate-settings-tests-impl
- [x] task-673-688-migrate-settings-tests-qa
