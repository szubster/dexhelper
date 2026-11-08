---
id: task-620-688-gen1-static-encounters-e2e-qa
type: TASK
title: QA Gen 1 Static Encounters E2E Tests
status: READY
owner_persona: qa
created_at: '2026-10-14'
updated_at: '2026-10-31'
depends_on:
  - task-620-687-gen1-static-encounters-e2e-coder
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

# Task: QA Gen 1 Static Encounters E2E Tests

## Objective
Verify the E2E tests implemented for Gen 1 Static Encounters.

## Context
This task ensures that the E2E tests created by the coder are robust, correct, and adequately cover the integration between parsing and the UI.

## Acceptance Criteria
- [ ] Review and verify the E2E tests for Gen 1 Static Encounters.
- [ ] Ensure tests pass correctly on GitHub CI or locally via `xvfb-run -a pnpm test:e2e`.
- [ ] Confirm no `.catch()` is used for assertions and that Playwright best practices are followed.
