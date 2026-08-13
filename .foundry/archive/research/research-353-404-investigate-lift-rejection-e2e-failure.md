---
id: research-353-404-investigate-lift-rejection-e2e-failure
type: RESEARCH
title: Investigate E2E Test Failure for Permanent Failure Dashboard
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-06'
updated_at: '2026-08-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-343-353-lift-rejection-constant-e2e
tags:
  - e2e
  - debugging
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate E2E Test Failure for Permanent Failure Dashboard

## Objective
Investigate the root cause of the permanent failure (rejection_count: 3) of task-353-393-lift-rejection-constant-e2e-impl. The task was supposed to implement E2E tests for the DAG Dashboard permanent failure filtering based on MAX_REJECTION_THRESHOLD.

## Research Questions
1. Why did the implementation task for the permanent failure E2E test fail repeatedly?
2. Are there any existing testing constraints, E2E framework limitations, or UI architectural decisions that the previous implementation failed to account for?
3. What is the correct approach to writing this test that will successfully pass code review and verification?

## Findings & Deliverables

### Explanation of the Failure
The previous E2E implementation attempts failed because the test relied on the actual, non-deterministic `foundry.json` data generated from the live `.foundry` directory. The test implicitly assumed that a node with `rejection_count >= MAX_REJECTION_THRESHOLD` and `status: FAILED` would always naturally exist in the live repository state to satisfy the assertions. However, in clean environments or different repository states (such as CI), these nodes may not exist or might change, leading to `element not found` timeouts (as Playwright waits for `toBeVisible()` on nodes that are never rendered).

Additionally, the previous test implementation did not account for the fact that the application routes to the DAG dashboard via `./dag`, not the default index or `/dashboard`.

### Recommendations for the Retry Task
To correctly implement the permanent failure E2E test:
1. **Deterministic Mocking**: The test must mock the API response for `**/data/foundry.json` using Playwright's `page.route()`. The mocked payload should explicitly return an array containing at least two deterministic nodes:
   - One node with `status: "FAILED"` and `rejection_count: MAX_REJECTION_THRESHOLD`.
   - One node with `status: "FAILED"` and `rejection_count: 1` (to ensure the filter works correctly).
2. **Dashboard Routing**: The test should navigate to `./dag` directly to access the DAG dashboard.
3. **Wait for Load**: The test must wait for the loading screen (`[ SYSTEM.LOADING_DAG ]`) to disappear to ensure the DAG is fully rendered before asserting UI interactions.
4. **Visual Assertion**: After clicking the "Toggle permanent failures only" button, the test should assert that the remaining visible node has the expected text and explicitly check for the permanent failure styling classes (e.g., `border-red-500` and `brightness-125`) applied by `DagNode.tsx`.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
