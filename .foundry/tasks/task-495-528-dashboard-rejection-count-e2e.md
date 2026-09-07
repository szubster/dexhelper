---
id: task-495-528-dashboard-rejection-count-e2e
type: TASK
title: Update E2E test for Dashboard UI Rejection Count Refactor
status: READY
owner_persona: coder
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-344-495-dashboard-rejection-count-e2e
tags:
  - refactor
  - dashboard
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update E2E test for Dashboard UI Rejection Count Refactor

## Objective
Update the `tests/e2e/dashboard/permanent_failures.spec.ts` test file to correctly mock and test the UI now that it uses `DagContext` instead of a direct import of `MAX_REJECTION_THRESHOLD`. We should still test that the component correctly hides or shows failed nodes depending on their rejection threshold, but we should supply or inject this threshold during the test instead of depending on it matching a global constant. We also need to avoid importing `MAX_REJECTION_THRESHOLD` from `src/utils/constants.ts` directly.

## Requirements
1. Remove the direct import of `MAX_REJECTION_THRESHOLD` from `tests/e2e/dashboard/permanent_failures.spec.ts`.
2. Ensure the mock uses a local constant (e.g. `3`) inside the mock data to simulate permanent failures, rather than relying on the imported constant.
3. Verify that the dashboard accurately applies this threshold by asserting that nodes are still correctly filtered and highlighted.
4. The test should still verify all the original behavior for filtering and highlighting nodes.

## Acceptance Criteria
- [ ] Coder: Requirements are implemented.
