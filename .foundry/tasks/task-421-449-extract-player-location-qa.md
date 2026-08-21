---
id: task-421-449-extract-player-location-qa
type: TASK
title: QA Gen 3 Player Location Extraction
status: PENDING
owner_persona: qa
created_at: '2026-08-20'
updated_at: '2026-08-21'
depends_on:
  - task-421-447-extract-player-location-impl
jules_session_id: null
pr_number: null
parent: story-411-421-extract-player-location
tags:
  - gen3
  - ai
  - save-engine
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 Player Location Extraction

## Context
As part of the Gen 3 AI data extraction, an implementation has been made to extract the player's current map location and map it to the nearest upcoming trainer. This task is to verify that implementation.

## Technical Contract
1.  **Verification:** Verify that the logic accurately parses the location block from Gen 3 save data.
2.  **Mapping Check:** Verify that the mapping to the nearest upcoming major trainer is correct based on the location.
3.  **Compliance:** Ensure the implementation strictly followed the **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`.
4.  **Test Coverage:** Ensure the coder wrote adequate unit tests and that they pass.

## Acceptance Criteria
- [ ] Verification confirms the player location data is accurately parsed.
- [ ] Verification confirms the location maps correctly to the next major trainer.
- [ ] Verification confirms Section 13 guidelines are strictly followed.
- [ ] Verification confirms unit tests are adequate and pass.

### QA Failure
The implementation task `task-421-447-extract-player-location-impl` was rejected because it violates Section 13 ("Save File Parsing & Extraction Guidelines") of `.foundry/docs/schema.md`.
Specifically:
1. It uses inline magic numbers (e.g., `8` in `mapGroup << 8`) instead of module-level constants.
2. It lacks a `try/catch` block for `RangeError` when accessing the `DataView`, and instead relies on manual bounds checking which is explicitly forbidden by Section 13 (it requires throwing a specific error message).
