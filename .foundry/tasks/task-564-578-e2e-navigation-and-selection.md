---
id: task-564-578-e2e-navigation-and-selection
type: TASK
title: Write E2E Test for Wild Item Navigation and Selection
status: ACTIVE
owner_persona: coder
created_at: '2026-09-15T06:49:02Z'
updated_at: '2026-09-18'
depends_on: []
jules_session_id: '1486075875547078323'
pr_number: null
parent: story-556-564-e2e-tests-end-to-end-flow
tags:
  - e2e
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Write E2E Test for Wild Item Navigation and Selection

## Context
This task implements the first half of the complete E2E flow for the Wild Held Item Hunting Assistant: navigating to the assistant and verifying the selection of an item, as well as the displayed routes and recommended Pokémon.

## Requirements
- Create a new Playwright test file (e.g. `tests/e2e/wild_item_assistant.spec.ts`) or add to an existing one.
- The test must start from the main dashboard (which implies a clearStorage initialization).
- The test must navigate to the Wild Held Item Hunting Assistant (using `isMobile` fixture conditionally for sidebar vs bottom nav).
- The test must select a target item (e.g., "Leftovers" or "Lucky Egg" - some Gen 2+ item).
- The test must verify that the recommended routes and target Pokémon holding the item are correctly displayed on the UI.
- Ensure proper use of `clearStorage(page)`, `initializeWithSave(page, ...)` and `waitForSync(page)` from `test-utils.ts` where applicable.
- Make sure to use strict mode `locator.or()` for any ambiguous locators if needed.

## Acceptance Criteria
- [ ] Implement Playwright E2E test for navigating to the Wild Held Item Assistant.
- [ ] Implement E2E assertion to select a target item.
- [ ] Implement E2E assertions to verify displayed routes and recommended Pokémon.
