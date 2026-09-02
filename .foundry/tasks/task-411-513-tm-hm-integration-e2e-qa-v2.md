---
id: task-411-513-tm-hm-integration-e2e-qa-v2
type: TASK
title: QA of TM/HM Integration E2E Tests V2
status: READY
owner_persona: qa
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on:
  - task-411-512-tm-hm-integration-e2e-impl-v2
jules_session_id: '10876183630864121021'
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
---

# QA of TM/HM Integration E2E Tests V2

## Description
Review and verify the implementation of the TM/HM integration end-to-end tests to ensure they adequately cover the required functionality and follow project standards.

## Verification Requirements
1.  Verify that tests exist for Gen 1, Gen 2, and Gen 3 TM/HM integration.
2.  Run the tests locally (`killall Xvfb || true && xvfb-run -a pnpm exec playwright test`) and ensure they pass.
3.  Verify that `@playwright/test` is used and NOT `@testing-library/react` or `@testing-library/*`.
4.  Confirm that the tests validate extraction, event flags, and inventory generation.

## Acceptance Criteria
- [ ] Verify test coverage for Gen 1, Gen 2, and Gen 3.
- [ ] Verify test suite runs successfully.
- [ ] Verify adherence to testing library constraints.
