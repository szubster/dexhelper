---
id: task-403-674-playwright-e2e-retry-impl-v4
type: TASK
title: Retry Playwright E2E Tests for DV/IV Extraction V4
status: PENDING
owner_persona: coder
created_at: '2026-10-08'
updated_at: '2026-10-08'
depends_on:
  - research-403-673-investigate-e2e-timeout-v4
jules_session_id: null
pr_number: null
parent: story-112-403-integration-e2e
tags:
  - dexhelper
  - e2e
  - testing
  - playwright
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Retry Playwright E2E Tests for DV/IV Extraction V4

## Context
As part of `story-112-403-integration-e2e`, we need to write E2E tests using Playwright to verify that the frontend UI correctly handles Gen 2 and Gen 3 save files. This is a fourth retry, depending on the findings from `research-403-673-investigate-e2e-timeout-v4`.

## Execution Blueprint
1. **Implement Playwright Tests**
   - Apply the findings from the research task to correctly avoid session timeouts.
   - Write E2E test cases simulating a user uploading mock Gen 2 and Gen 3 save files to the application.
   - Assert that the application routes to the correct view and the extracted DVs/IVs/PVs are visible.

## Acceptance Criteria
- [ ] Playwright tests simulating save file uploads are written.
- [ ] Tests assert UI visibility of Gen 2 DVs and Gen 3 IVs/PVs.
- [ ] Tests execute successfully by targeting only the specific test files (e.g., `xvfb-run -a pnpm test:e2e tests/e2e/core_data_extraction.spec.ts`), bypassing full suite execution locally.
