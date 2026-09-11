---
id: task-403-535-playwright-e2e-retry-impl-v2
type: TASK
title: Retry Playwright E2E Tests for DV/IV Extraction V2
status: PENDING
owner_persona: coder
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on:
  - research-403-534-investigate-playwright-timeout
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

# Retry Playwright E2E Tests for DV/IV Extraction V2

## Context
As part of `story-112-403-integration-e2e`, we need to write E2E tests using Playwright to verify that the frontend UI correctly handles Gen 2 and Gen 3 save files. This is a second retry, depending on the findings from `research-403-534-investigate-playwright-timeout`.

## Execution Blueprint

1. **Implement Playwright Tests**
   - Apply the findings from the research task to avoid session timeouts.
   - Write E2E test cases simulating a user uploading mock Gen 2 and Gen 3 save files to the application.
   - Assert that the application routes to the correct view and the extracted DVs/IVs/PVs are visible.

## Acceptance Criteria
- [ ] Playwright tests simulating save file uploads are written.
- [ ] Tests assert UI visibility of Gen 2 DVs and Gen 3 IVs/PVs.
- [ ] Tests execute successfully via `xvfb-run -a pnpm test:e2e`.
