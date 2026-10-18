---
id: task-620-687-gen1-static-encounters-e2e-coder
type: TASK
title: Implement Gen 1 Static Encounters E2E Tests
status: READY
owner_persona: coder
created_at: '2026-10-14'
updated_at: '2026-10-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-136-620-gen1-static-encounters-e2e
tags:
  - e2e
  - integration
  - gen1
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Gen 1 Static Encounters E2E Tests

## Objective
Implement E2E tests for Gen 1 Static Encounters to ensure event flags are correctly parsed and displayed in the checklist UI.

## Context
This task addresses the Orchestrator Safeguard requirement to verify that the Gen 1 Static Encounters parsing and UI logic integrate correctly end-to-end.

## Acceptance Criteria
- [x] Write Playwright E2E tests to verify Gen 1 Static Encounters are parsed correctly.
- [x] Verify that the parsed encounters are correctly displayed in the checklist UI.
- [x] Ensure tests use appropriate fixtures for save files and mock data if necessary.
- [x] Tests must use relative paths for navigation (`./dashboard`, not `/dashboard`).
- [x] Tests must adhere to all Playwright best practices (e.g. no `.catch()` for assertions).
