---
id: task-586-604-define-base-test-extension
type: TASK
jules_session_id: '11583508672250716615'
title: Define Base Test Extension
status: ACTIVE
owner_persona: coder
created_at: '2026-09-21'
updated_at: '2026-09-22'
depends_on: []
pr_number: null
parent: story-578-586-create-playwright-fixtures-definition
priority: 60
tags:
  - testing
  - e2e
  - playwright
  - DX
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Define Base Test Extension

## Objective
Create the base Playwright test extension structure.

## Scope
- Create `tests/e2e/fixtures/index.ts`.
- Define the custom Playwright `test` instance using `@playwright/test`.
- Export the extended `test` and `expect`.

## Acceptance Criteria
- [x] File `tests/e2e/fixtures/index.ts` exists.
- [x] `test` instance is exported.
- [x] `expect` is exported.
