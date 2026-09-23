---
id: task-564-579-e2e-save-upload-success
type: TASK
title: Write E2E Test for Wild Item Save Upload and Success State
status: CANCELLED
owner_persona: coder
created_at: '2026-09-15T06:49:02Z'
updated_at: '2026-09-23'
depends_on:
  - task-564-578-e2e-navigation-and-selection
jules_session_id: '11296657653396369934'
pr_number: null
parent: story-556-564-e2e-tests-end-to-end-flow
tags:
  - e2e
  - playwright
research_references: []
rejection_count: 0
rejection_reason: >-
  [ACKNOWLEDGED] Dependency task-564-578-e2e-navigation-and-selection was
  CANCELLED.
notes: ''
locks: []
---

# Task: Write E2E Test for Wild Item Save Upload and Success State

## Context
This task implements the second half of the complete E2E flow for the Wild Held Item Hunting Assistant: simulating a save upload where the target item has been successfully acquired, and verifying the success state UI.

## Requirements
- Extend the test created in `task-564-578-e2e-navigation-and-selection`.
- Simulate a subsequent save upload (or mock the indexeddb data) representing the state *after* the player has acquired the target item.
- Verify that the UI correctly recognizes the item acquisition (e.g., success message, "Item Acquired!" state, or update to inventory counts).
- Ensure the E2E test is robust and uses proper `waitForSync(page)`.

## Acceptance Criteria
- [ ] Implement Playwright E2E simulation of save upload with acquired item.
- [ ] Implement E2E assertion to verify the success/acquired state UI.
