---
id: task-353-406-lift-rejection-constant-e2e-retry-qa
type: TASK
title: QA Retry E2E Test for Permanent Failure Dashboard
status: ACTIVE
owner_persona: qa
created_at: '2026-08-06'
updated_at: '2026-08-17'
depends_on:
  - task-353-405-lift-rejection-constant-e2e-retry-impl
jules_session_id: '9708619538333401112'
pr_number: null
parent: story-343-353-lift-rejection-constant-e2e
tags:
  - e2e
  - testing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Retry E2E Test for Permanent Failure Dashboard

## Objective
Verify the retry implementation of the E2E test for the Permanent Failure Dashboard.

## Acceptance Criteria
- [x] Verify the Playwright test file at `tests/e2e/dashboard/permanent_failures.spec.ts` exists.
- [x] Run the E2E tests and ensure the new test passes.
- [x] Verify that the test correctly asserts the behaviour of the "Permanent failures only" filter.
