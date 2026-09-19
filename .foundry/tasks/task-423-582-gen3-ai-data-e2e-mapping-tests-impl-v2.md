---
id: task-423-582-gen3-ai-data-e2e-mapping-tests-impl-v2
type: TASK
title: Write Playwright E2E Tests for Gen 3 AI Script Mapping (V2)
status: PENDING
owner_persona: coder
created_at: '2026-09-15T15:58:39Z'
updated_at: '2026-09-17'
depends_on:
  - research-423-581-investigate-ai-mapping-test-failure
jules_session_id: null
pr_number: null
parent: story-411-423-gen3-ai-data-extraction-e2e
tags:
  - gen3
  - ai
  - save-engine
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write Playwright E2E Tests for Gen 3 AI Script Mapping (V2)

## Objective
Write E2E tests for AI script mapping, incorporating findings from the research investigation.

## Core Technical Requirements
Using the approach formulated in the research node, write Playwright E2E test cases simulating uploading the mock fixture. Assert that the UI correctly displays the mapped AI script and AI level for the extracted opponent.

## Acceptance Criteria
- [ ] Playwright E2E tests are written for AI script mapping.
- [ ] Tests simulate save file upload and assert correct AI script and level rendering on the UI.
- [ ] Tests execute successfully via `xvfb-run pnpm test:e2e`.
