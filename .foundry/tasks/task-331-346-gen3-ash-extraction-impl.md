---
id: task-331-346-gen3-ash-extraction-impl
type: TASK
title: 'Task: Implement Gen 3 Volcanic Ash Relative Offset Extraction (Revised)'
status: READY
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-268-331-gen3-ash-dataview-extraction-relative
tags:
  - gen3
  - ash
  - save-parsing
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Volcanic Ash Relative Offset Extraction

## Objective
Implement extraction of the Volcanic Ash count from Gen 3 save files using dynamic relative offsets calculated from the `section1Offset`. This is a revised task enforcing architectural rules.

## Architectural Constraints
- **DataView API:** You MUST utilize the `DataView` API for extraction (ADR 010). Do not use buffer arrays directly.
- **Dynamic Offsets:** You MUST NOT use hardcoded absolute offsets (like `0x142C` or `0x13D0`) because of the Gen 3 A/B bank rotation system.
- **Relative Calculation:** The extraction logic must consult the offsets to determine the correct offset relative to the dynamically resolved `section1Offset` for each game version. You MUST calculate relative memory offsets using the resolved `section1Offset`.
  - In `SaveBlock1`, the `vars` array offset is `0x139C` for Emerald and `0x1340` for Ruby/Sapphire.
  - The byte offset for the Ash variable within the `vars` array is `0x90` (from `(0x4048 - 0x4000) * 2`).
- **Module-Level Constants:** All memory offsets, lengths, bit locations, and shifts MUST be explicitly defined as reusable constants at the module level (e.g., `GEN3_EMERALD_VARS_OFFSET = 0x139C`, `GEN3_RS_VARS_OFFSET = 0x1340`, `GEN3_ASH_VAR_RELATIVE_OFFSET = 0x90`). The use of inline magic numbers is strictly forbidden.
- **Bounds Checking:** When parsing save files with the `DataView` API, you MUST catch `RangeError` from out-of-bounds `DataView` reads and throw a new error with the exact message `'The save file is corrupted or incomplete.'` to ensure safe handling of out-of-bounds reads.
- **Testing:** Include unit tests to verify extraction for Emerald and Ruby/Sapphire formats.

## Acceptance Criteria
- [ ] Define reusable constants for vars offsets and the ash variable offset at the module level in the appropriate file (e.g., `src/engine/saveParser/parsers/gen3.ts`).
- [ ] Implement Volcanic Ash extraction logic using the `DataView` API.
- [ ] Extract the Volcanic Ash value using the dynamic `section1Offset` to compute relative memory offsets.
- [ ] Implement `try...catch` for `RangeError` from `DataView` reads, throwing `'The save file is corrupted or incomplete.'`
- [ ] Write unit tests to cover both Emerald and Ruby/Sapphire Volcanic Ash extraction.
- [ ] Self-verify the implementation and document results in the `coder` persona journal (`.foundry/journals/coder.md`). No separate QA task is required as the logic is relatively straightforward.
