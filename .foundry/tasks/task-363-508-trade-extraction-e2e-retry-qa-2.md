---
id: task-363-508-trade-extraction-e2e-retry-qa-2
type: TASK
title: NPC Trade Extraction Integration & E2E QA (Retry 2)
status: PENDING
owner_persona: qa
created_at: '2026-08-31'
updated_at: '2026-09-01'
depends_on:
  - task-363-507-trade-extraction-e2e-retry-impl-2
jules_session_id: null
pr_number: null
parent: story-349-363-trade-extraction-e2e
tags:
  - feature
  - backend
  - save-parsing
  - e2e
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: NPC Trade Extraction Integration & E2E QA (Retry 2)

## Objective
Verify the implementation of end-to-end tests for the NPC trade flag extraction logic across Gen 2 and Gen 3 save files.

## Context
QA verification for `task-363-507-trade-extraction-e2e-retry-impl-2`.

## Acceptance Criteria
- [ ] Verify the E2E test files for Gen 2 NPC trade flag extraction.
- [ ] Verify the E2E test files for Gen 3 NPC trade flag extraction.
- [ ] Ensure tests verify end-to-end extraction (from save file parsing to resulting flags in `SaveData`).
