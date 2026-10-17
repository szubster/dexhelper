---
id: task-673-688-migrate-settings-tests-qa
type: TASK
title: Migrate Settings E2E Tests to COM Pattern QA
status: PENDING
owner_persona: qa
created_at: '2026-10-13'
updated_at: '2026-10-13'
depends_on:
  - task-673-687-migrate-settings-tests-impl
jules_session_id: null
pr_number: null
parent: story-580-673-migrate-settings-e2e-tests
tags:
  - testing
  - e2e
  - playwright
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Task: Migrate Settings E2E Tests to COM Pattern QA

## Objective
Verify the implementation of the `SettingsModalModel` COM migration.

## Scope
- Review `tests/e2e/settings.spec.ts` and `tests/e2e/settings_advanced.spec.ts` to ensure raw locators were removed.
- Run E2E tests to ensure they pass consistently.

## Acceptance Criteria
- [ ] Code properly utilizes `SettingsModalModel`.
- [ ] E2E tests pass consistently.
