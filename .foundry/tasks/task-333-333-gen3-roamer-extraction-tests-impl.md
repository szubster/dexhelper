---
id: task-333-333-gen3-roamer-extraction-tests-impl
type: TASK
title: Implement Gen 3 Roamer Core Extraction Unit Tests
status: CANCELLED
owner_persona: coder
created_at: '2026-07-19'
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
rejection_count: 1
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

## Acceptance Criteria
- [x] Implement unit tests in `src/engine/saveParser/parsers/gen3.test.ts` for `parseGen3Roamer` logic.
- [x] Test extraction works for Ruby/Sapphire.
- [x] Test extraction works for Emerald.
- [x] Test extraction works for FireRed/LeafGreen.
- [x] All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers (ADR 028).
- [x] The Coder must use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
