---
id: task-411-507-tm-hm-integration-e2e-qa
type: TASK
title: QA of TM/HM Integration E2E Tests (Retry)
status: READY
owner_persona: qa
created_at: '2026-09-01'
updated_at: '2026-09-05'
depends_on:
  - task-411-506-tm-hm-integration-e2e-impl
jules_session_id: null
pr_number: null
parent: story-401-411-tm-hm-integration-e2e
tags:
  - e2e
  - integration
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA of TM/HM Integration E2E Tests (Retry)

## Description
Review and verify the implementation of the TM/HM integration end-to-end tests to ensure they adequately cover the required functionality, follow project standards, and do not timeout.

## Verification Requirements
1.  Verify that tests exist for Gen 1, Gen 2, and Gen 3 TM/HM integration.
2.  Run the tests locally (`killall Xvfb || true && xvfb-run --auto-servernum pnpm exec playwright test`) and ensure they pass.
3.  Verify that `@playwright/test` is used and NOT `@testing-library/react` or `@testing-library/*`.
4.  Confirm that the tests validate extraction, event flags, and inventory generation.

## Acceptance Criteria
- [x] Verify test coverage for Gen 1, Gen 2, and Gen 3.
- [x] Verify test suite runs successfully.
- [x] Verify adherence to testing library constraints.
