---
id: task-333-346-gen3-roamer-extraction-tests-impl
type: TASK
title: Implement Gen 3 Roamer Core Extraction Unit Tests
status: PENDING
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-149-333-gen3-roamer-unit-tests
tags:
  - gen3
  - roamer
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Roamer Core Extraction Unit Tests

## Objective
Write unit tests verifying extraction against known good save fixtures for each game version.

## Description
Develop unit tests to verify that the core parsing logic for the Gen 3 Roamer structure in SaveBlock1 correctly extracts the data using known good save fixtures for Ruby/Sapphire, Emerald, and FireRed/LeafGreen.

Since the `parseGen3Roamer` function has already been implemented, write comprehensive tests validating it.
Make sure to reuse `parseGen3Roamer` in `src/engine/saveParser/parsers/gen3.ts` without modifying the implementation file, unless required.

If you don't have access to fixtures containing valid Gen3 roaming pokemon save data, you can dynamically construct ArrayBuffer views representing the memory structure according to the constants (e.g. `ROAMER_IVS_OFFSET`, `ROAMER_PV_OFFSET`, etc.) defined in `src/engine/saveParser/parsers/gen3.ts`, and pass these ArrayBuffer views into `parseGen3Roamer`.

## Technical Constraints & Error Handling
1. **Reusable Constants:** All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers (ADR 028).
2. **Relative Offsets (A/B Flash Memory):** The implementation must calculate relative memory offsets using the resolved section offset (e.g., `section1Offset`) instead of hardcoded absolute offsets to properly support A/B bank flash memory.
3. **Save File Corruption Checks:** The parser must catch `RangeError` from out-of-bounds `DataView` reads and throw a new Error with the exact message: `"The save file is corrupted or incomplete."`

## Acceptance Criteria
- [ ] Implement unit tests in `src/engine/saveParser/parsers/gen3.test.ts` for `parseGen3Roamer` logic.
- [ ] Test extraction works for Ruby/Sapphire.
- [ ] Test extraction works for Emerald.
- [ ] Test extraction works for FireRed/LeafGreen.
- [ ] Implement and test `RangeError` catching that throws the "corrupted or incomplete" message.
- [ ] **Coder Self-Verification**: The coder is designated to self-verify this task's acceptance criteria before submission.
