---
id: task-495-529-qa-dashboard-rejection-count-e2e
type: TASK
title: QA Verification for Dashboard UI Rejection Count Refactor E2E
status: PENDING
owner_persona: qa
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on:
  - task-495-528-dashboard-rejection-count-e2e
jules_session_id: null
pr_number: null
parent: story-344-495-dashboard-rejection-count-e2e
tags:
  - refactor
  - dashboard
  - e2e
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verification for Dashboard UI Rejection Count Refactor E2E

## Objective
Verify that the `tests/e2e/dashboard/permanent_failures.spec.ts` test correctly tests the UI and passes in CI without depending on the hardcoded `MAX_REJECTION_THRESHOLD`.

## Requirements
1. Verify that `MAX_REJECTION_THRESHOLD` is not imported from `src/utils/constants.ts` in `tests/e2e/dashboard/permanent_failures.spec.ts`.
2. Run `xvfb-run -a pnpm test:e2e tests/e2e/dashboard/permanent_failures.spec.ts` to ensure the updated test passes.
3. Review the code to ensure the test correctly sets up the mocked threshold and evaluates the UI against that threshold.

## Acceptance Criteria
- [ ] QA: Requirements are verified.
