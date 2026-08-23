---
id: task-423-471-gen3-ai-data-e2e-mapping-tests-impl
type: TASK
title: Write Playwright E2E Tests for Gen 3 AI Script Mapping
status: FAILED
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-23'
depends_on:
  - task-423-470-gen3-ai-data-e2e-extraction-tests-impl
jules_session_id: null
pr_number: null
parent: story-411-423-gen3-ai-data-extraction-e2e
tags:
  - gen3
  - ai
  - save-engine
  - e2e
rejection_count: 0
rejection_reason: ACTIVE node missing or malformed session ID
notes: ''
---

# Write Playwright E2E Tests for Gen 3 AI Script Mapping

## Objective
Write E2E tests for AI script mapping.

## Core Technical Requirements
Write Playwright E2E test cases simulating uploading the mock fixture. Assert that the UI correctly displays the mapped AI script and AI level for the extracted opponent.

## Acceptance Criteria
- [ ] Playwright E2E tests are written for AI script mapping.
- [ ] Tests simulate save file upload and assert correct AI script and level rendering on the UI.
- [ ] Tests execute successfully via `xvfb-run pnpm test:e2e`.
