---
id: task-411-440-tm-hm-integration-e2e-impl
type: TASK
title: Implementation of TM/HM Integration E2E Tests
status: READY
owner_persona: coder
created_at: '2026-08-18'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-401-411-tm-hm-integration-e2e
tags:
  - e2e
  - integration
  - testing
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Implementation of TM/HM Integration E2E Tests

## Description
Write end-to-end (E2E) tests using Playwright to verify the TM/HM integration across Generation 1, Generation 2, and Generation 3 save files.

## Technical Contract
1.  **Testing Framework:** Use `@playwright/test` for E2E testing. Do NOT use `@testing-library/react` or `@testing-library/*`.
2.  **Scope:** Ensure the tests cover extraction of TM/HM inventory, parsing of event flags, and generation of the final inventory view for Gen 1, Gen 2, and Gen 3.
3.  **Correctness:** Verify that the extracted values match expected test fixtures or known values for the provided save files.

## Acceptance Criteria
- [ ] Implement Playwright E2E tests for Gen 1 TM/HM extraction.
- [ ] Implement Playwright E2E tests for Gen 2 TM/HM extraction.
- [ ] Implement Playwright E2E tests for Gen 3 TM/HM extraction.
- [ ] Ensure all tests pass successfully in the CI environment (using `xvfb-run`).
