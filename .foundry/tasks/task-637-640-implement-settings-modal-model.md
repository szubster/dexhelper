---
id: task-637-640-implement-settings-modal-model
type: TASK
title: Implement SettingsModalModel COM in E2E Tests
status: READY
owner_persona: coder
created_at: '2026-10-01'
updated_at: '2026-10-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-579-637-settings-modal-model
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

# Task: Implement SettingsModalModel COM in E2E Tests

## Objective
Implement a Playwright Component Object Model (COM) for the Settings Modal in `tests/e2e/models/SettingsModalModel.ts`.

## Scope
- Create `tests/e2e/models/SettingsModalModel.ts`.
- Encapsulate opening, interacting with settings, and asserting states.
- The model should accept a Playwright `Page` object in its constructor.
- Implement an `open()` method that clicks the 'System Settings' button and waits for visibility of 'SYS.CONFIG'.
- Implement a `close()` method that clicks the 'Close settings' button and waits for the modal to be removed.
- Implement interaction methods like `toggleLivingDexMode()`, `setGameVersion(version: string)`, `setBallStyle(style: string)`.
- Implement assertion methods like `assertIsOpen()`, `assertLivingDexModeEnabled()`, `assertGameVersion(version: string)`, `assertBallStyle(style: string)`.
- Use semantic locators (`getByRole`, `getByTestId`, `getByText`).

## Constraints
- Do not refactor existing test files to use the model yet. Just create the model.
- Adhere to the testing style guide.

## Acceptance Criteria
- [ ] Implement the `SettingsModalModel` class as described.
