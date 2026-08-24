---
id: task-413-467-gen3-move-tutor-ui-playwright-impl
type: TASK
title: Gen 3 Move Tutor UI Playwright Tests
status: FAILED
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-24'
depends_on:
  - task-413-466-gen3-move-tutor-extraction-vitest-impl
jules_session_id: null
pr_number: null
parent: story-406-413-gen3-move-tutor-parsing-e2e
tags:
  - testing
  - playwright
  - e2e
  - gen3
  - move-tutor
research_references: []
rejection_count: 1
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: FAILED'
notes: ''
---

# Task: Gen 3 Move Tutor UI Playwright Tests

## Objective
Implement Playwright E2E tests for the Gen 3 Move Tutor UI representation.

## Technical Requirements
1. Use `@playwright/test` to navigate the UI with mocked parsed data.
2. Verify that Move Tutor components render correctly when successful data is provided.
3. Test graceful UI handling when extraction fails (e.g., displaying an error message or empty state instead of crashing).

## Acceptance Criteria
- [ ] Playwright E2E tests verify the Move Tutor UI rendering.
- [ ] Playwright tests verify UI graceful failure handling when parsing fails.
