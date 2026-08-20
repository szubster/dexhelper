---
id: research-363-440-investigate-trade-extraction-e2e-failure
type: RESEARCH
title: Investigate NPC Trade Extraction E2E Implementation Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-349-363-trade-extraction-e2e
tags:
  - testing
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate NPC Trade Extraction E2E Implementation Failure

## Objective
Investigate the root cause of the permanent failure of `task-363-415-trade-extraction-e2e-impl` which failed with the reason `[ACKNOWLEDGED] Max rejection count reached`.

## Context
The implementation task failed permanently. Based on the existence of `research-363-416-gen3-save-fixture`, it's highly likely the E2E test implementation failed due to missing, corrupt, or inadequate save file fixtures, or because the E2E implementation was unable to properly mount/inject these fixtures during the test run.

## Findings
The previous E2E implementation failed because the initial detection for Generation 3 save files in `src/engine/saveParser/utils/detection.ts` (`isGen3Save`) is currently a stub that strictly returns `false`. This causes `parseSaveFile` to throw an error when loading Gen 3 saves, rendering the application unable to initialize, thus preventing E2E tests for Gen 3 logic from working.

The required steps to successfully implement the tests are:
1.  **Implement `isGen3Save`**: In `src/engine/saveParser/utils/detection.ts`, implement the actual detection logic instead of the stub. This involves scanning for the known signature `0x08012025` at the offset `0x0ff8` inside the 4KB sections of the save file, ensuring proper `RangeError` handling.
2.  **Implement E2E Tests**: Use the existing Gen 3 fixture `tests/fixtures/emerald.sav` inside the E2E test `tests/e2e/dashboard/gen3_npc_trades.spec.ts` using `initializeWithSave` to mount it and test the UI extraction correctly.

## Acceptance Criteria
- [x] Determine why the previous E2E test implementation failed 3 times.
- [x] Document the required steps, tools, or dependencies needed to successfully implement the E2E tests for NPC trade extraction.
