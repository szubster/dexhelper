---
id: task-403-486-playwright-e2e-retry-impl
type: TASK
title: Retry Playwright E2E Tests for DV/IV Extraction
status: READY
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on:
  - research-403-485-playwright-e2e-failure
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
---

# Retry Playwright E2E Tests for DV/IV Extraction

## Context
As part of `story-112-403-integration-e2e`, we need to write E2E tests using Playwright to verify that the frontend UI correctly handles Gen 2 and Gen 3 save files and appropriately renders the newly extracted DVs, IVs, and PVs in the view hierarchy. This is a retry of the permanently failed `task-403-420-playwright-e2e-impl`, utilizing the findings from `research-403-485-playwright-e2e-failure`.

## Execution Blueprint

1. **Implement Playwright Tests**
   - Apply the findings from the research task.
   - Write E2E test cases simulating a user uploading mock Gen 2 and Gen 3 save files to the application.
   - Assert that the application routes to the correct view and the extracted DVs (for Gen 2) and IVs/PVs (for Gen 3) are visible and formatted correctly on the UI.
   - Ensure these tests run correctly within the CI suite framework.

## Acceptance Criteria
- [ ] Playwright tests simulating save file uploads are written.
- [ ] Tests assert UI visibility of Gen 2 DVs and Gen 3 IVs/PVs.
- [ ] Tests execute successfully via `xvfb-run -a pnpm test:e2e`.
