---
id: task-333-346-gen3-roamer-extraction-tests-impl
type: TASK
title: Implement Gen 3 Roamer Core Extraction Unit Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: '1729946980013165128'
pr_number: null
parent: story-149-333-gen3-roamer-unit-tests
tags:
  - gen3
  - roamer
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Replacement for cancelled task-333-333
---
# Implement Gen 3 Roamer Core Extraction Unit Tests
## Objective
Write unit tests verifying extraction against known good save fixtures for each game version.
## Description
Develop unit tests to verify that the core parsing logic for the Gen 3 Roamer structure in SaveBlock1 correctly extracts the data.
If you don't have access to fixtures, dynamically construct ArrayBuffer views representing the memory structure according to the constants defined in `src/engine/saveParser/parsers/gen3.ts`, and pass these ArrayBuffer views into `parseGen3Roamer`.
Since this is a simple low-risk test implementation task, the Coder will self-verify. Document the verification in the coder's journal.
## Acceptance Criteria
- [x] Implement unit tests in `src/engine/saveParser/parsers/gen3.test.ts` for `parseGen3Roamer` logic.
- [x] Test extraction works for Ruby/Sapphire.
- [x] Test extraction works for Emerald.
- [x] Test extraction works for FireRed/LeafGreen.
- [x] Ensure `parseGen3Roamer` logic itself catches `RangeError` from out-of-bounds `DataView` reads and throws a new error with the exact message 'The save file is corrupted or incomplete.' (if not already handled).
- [x] Ensure all memory offsets, lengths, bit locations, and shifts in the source code are explicitly defined as reusable constants at the module level, strictly avoiding inline magic numbers.
- [x] Ensure the source uses the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
- [x] The coder must run `pnpm test` to verify the tests pass successfully.
