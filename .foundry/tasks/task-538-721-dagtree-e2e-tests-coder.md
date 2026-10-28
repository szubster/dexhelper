---
id: task-538-721-dagtree-e2e-tests-coder
type: TASK
title: "Implement DagTree E2E Tests"
status: READY
owner_persona: coder
created_at: '2026-10-24'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-530-538-dagtree-e2e-verification
tags:
  - e2e
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement DagTree E2E Tests

## Objective
Write Playwright E2E tests to verify the integration and functionality of the new lightweight `DagTree` UI component.

## Scope
1. Update existing DAG UI E2E tests to target the new `DagTree` structure (`<ul>`/`<li>`).
2. Add interactions for expand/collapse toggles and "Expand All"/"Collapse All" buttons.
3. Validate that DAG visualization correctly matches the backend Foundry state.
4. Ensure tests are placed in the appropriate `tests/e2e/` directory.

## Acceptance Criteria
- [x] Update Playwright E2E locators to correctly target the new `DagTree` UI component.
- [x] Implement tests verifying all DAG expand/collapse user interactions.
- [x] Implement tests verifying the DAG state accurately reflects the Foundry state.
