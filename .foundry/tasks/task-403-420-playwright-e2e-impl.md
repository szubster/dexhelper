---
id: task-403-420-playwright-e2e-impl
type: TASK
title: Implement Playwright E2E Tests for DV/IV Extraction
status: FAILED
owner_persona: coder
created_at: '2026-08-11'
updated_at: '2026-08-24'
depends_on:
  - task-403-418-gen2-dv-integration-impl
  - task-403-419-gen3-iv-pv-integration-impl
jules_session_id: null
pr_number: null
parent: story-112-403-integration-e2e
tags:
  - dexhelper
  - e2e
  - testing
  - playwright
research_references: []
rejection_count: 1
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: FAILED'
notes: ''
---

# Implement Playwright E2E Tests for DV/IV Extraction

## Context
As part of `story-112-403-integration-e2e`, we need to write E2E tests using Playwright to verify that the frontend UI correctly handles Gen 2 and Gen 3 save files and appropriately renders the newly extracted DVs, IVs, and PVs in the view hierarchy.

## Execution Blueprint

1. **Implement Playwright Tests**
   - Write E2E test cases simulating a user uploading mock Gen 2 and Gen 3 save files to the application.
   - Assert that the application routes to the correct view and the extracted DVs (for Gen 2) and IVs/PVs (for Gen 3) are visible and formatted correctly on the UI.
   - Ensure these tests run correctly within the CI suite framework.

## Acceptance Criteria
- [ ] Playwright tests simulating save file uploads are written.
- [ ] Tests assert UI visibility of Gen 2 DVs and Gen 3 IVs/PVs.
- [ ] Tests execute successfully via `xvfb-run pnpm test:e2e`.
