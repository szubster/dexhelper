---
id: task-639-652-settings-modal-model-integration
type: TASK
title: Integrate SettingsModalModel COM in E2E Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-10-02'
updated_at: '2026-10-03'
depends_on: []
jules_session_id: '7671281008100710141'
pr_number: null
parent: story-579-639-e2e-core-components-integration
tags:
  - testing
  - e2e
  - playwright
  - com
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Task: Integrate SettingsModalModel COM in E2E Tests

## Objective
Refactor existing Playwright E2E tests to utilize the `SettingsModalModel`.

## Scope
- Refactor existing E2E tests in `tests/e2e/` (like `settings.spec.ts`, `theme-swapping.spec.ts`) to use `SettingsModalModel`.
- Replace hardcoded DOM locators and interactions related to the settings modal with the COM's methods.

## Acceptance Criteria
- [ ] Implement integration.
