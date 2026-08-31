---
id: task-423-470-gen3-ai-data-e2e-extraction-tests-impl
type: TASK
title: Write Playwright E2E Tests for Gen 3 AI Data Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-31'
depends_on:
  - task-423-469-gen3-ai-data-e2e-fixtures-impl
jules_session_id: '9069885854250470953'
pr_number: null
parent: story-411-423-gen3-ai-data-extraction-e2e
tags:
  - gen3
  - ai
  - save-engine
  - e2e
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Write Playwright E2E Tests for Gen 3 AI Data Extraction

## Objective
Write E2E tests for player, location, trainer, and opponent extraction.

## Core Technical Requirements
Write Playwright E2E test cases simulating uploading the Gen 3 mock fixture. Assert that the player's active team, location, nearest trainer, and opponent data are correctly extracted and rendered on the UI according to the system specifications.

## Acceptance Criteria
- [x] Playwright E2E tests are written for player, location, trainer, and opponent extraction.
- [x] Tests simulate save file upload and assert correct UI rendering of the extracted data.
- [x] Tests execute successfully via `xvfb-run pnpm test:e2e`.
