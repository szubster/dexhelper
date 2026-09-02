---
id: task-411-506-tm-hm-integration-e2e-impl
type: TASK
title: Implementation of TM/HM Integration E2E Tests (Retry)
status: READY
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on:
  - research-411-505-investigate-e2e-timeout
jules_session_id: null
pr_number: null
parent: story-401-411-tm-hm-integration-e2e
tags:
  - e2e
  - integration
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implementation of TM/HM Integration E2E Tests (Retry)

## Description
Write end-to-end (E2E) tests using Playwright to verify the TM/HM integration across Generation 1, Generation 2, and Generation 3 save files. Take into account any findings from the research phase regarding timeouts or other blockers.

## Technical Contract
1.  **Testing Framework:** Use `@playwright/test` for E2E testing. Do NOT use `@testing-library/react` or `@testing-library/*`.
2.  **Scope:** Ensure the tests cover extraction of TM/HM inventory, parsing of event flags, and generation of the final inventory view for Gen 1, Gen 2, and Gen 3.
3.  **Correctness:** Verify that the extracted values match expected test fixtures or known values for the provided save files.
4.  **Research Integration:** Incorporate fixes for the issues discovered during the research phase that caused previous timeouts.

## Acceptance Criteria
- [x] Implement Playwright E2E tests for Gen 1 TM/HM extraction.
- [x] Implement Playwright E2E tests for Gen 2 TM/HM extraction.
- [x] Implement Playwright E2E tests for Gen 3 TM/HM extraction.
- [x] Ensure all tests pass successfully in the CI environment (using `xvfb-run`).
