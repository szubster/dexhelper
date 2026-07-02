---
id: task-242-250-gen3-roamer-dataview-parser-qa
type: TASK
title: Gen 3 Roamer DataView Parsing QA
status: READY
owner_persona: qa
created_at: '2026-06-29'
updated_at: '2026-07-02'
depends_on:
  - task-242-249-gen3-roamer-dataview-parser-impl
jules_session_id: null
pr_number: null
parent: story-101-242-gen3-roamer-parser
tags:
  - gen3
  - roamer
  - dataview
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer DataView Parsing QA

## Objective
Verify the robust parser for the Gen 3 `Roamer` struct that uses the `DataView` API.

## Description
The implementation task `task-242-249-gen3-roamer-dataview-parser-impl` added logic to extract the `Roamer` struct from `SaveBlock1` using version-specific offsets for Emerald, Ruby/Sapphire, and FireRed/LeafGreen. This QA task is responsible for verifying that the extraction logic is correct and robust by adding comprehensive unit tests.

## Architectural Constraints & Rules (CRITICAL)
- **DataView API Verification:** Ensure the implementation exclusively uses the `DataView` API.
- **No Magic Numbers:** Verify that no magic numbers are used in the implementation and all memory offsets, lengths, bit locations, and shifts are defined as reusable constants.
- **Bounds Checking:** Verify the parser correctly catches `RangeError` from `DataView` out-of-bounds reads and propagates them as validation errors.
- **Test Framework:** Unit tests must be written using Vitest.
- **Mock Data:** Tests must run against mock save data blocks representing Emerald, Ruby/Sapphire, and FireRed/LeafGreen `SaveBlock1` data.
- **Empty PRs:** If you determine the artifact already exists and meets all criteria, you must still submit an empty PR. **CRITICAL:** Before submitting an empty PR, you MUST check off all Acceptance Criteria checkboxes. Submitting an empty PR with unchecked boxes violates ADR 007 and ADR 009.
- **Failures:**
  - If you experience a transient failure requiring a retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail the task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [ ] Add unit tests using Vitest verifying the extraction logic against mock save data blocks for Emerald.
- [ ] Add unit tests using Vitest verifying the extraction logic against mock save data blocks for Ruby/Sapphire.
- [ ] Add unit tests using Vitest verifying the extraction logic against mock save data blocks for FireRed/LeafGreen.
- [ ] Add unit tests verifying that out-of-bounds `DataView` reads throw `RangeError` and are caught/handled appropriately.
- [ ] Verify the `active` boolean is extracted correctly from offset `0x13` in all version mock tests.
