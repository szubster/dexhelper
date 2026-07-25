---
id: task-331-333-gen3-ash-extraction-impl
type: TASK
title: 'Task: Implement Gen 3 Volcanic Ash Relative Offset Extraction'
status: ACTIVE
owner_persona: coder
created_at: '2026-07-19'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '15357048488164602211'
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
Implement extraction of the Volcanic Ash count from Gen 3 save files using dynamic relative offsets calculated from the `section1Offset`.

## Architectural Constraints
- **DataView API:** You MUST utilize the `DataView` API for extraction (ADR 010). Do not use buffer arrays directly.
- **Dynamic Offsets:** You MUST NOT use hardcoded absolute offsets (like `0x142C` or `0x13D0`) because of the Gen 3 A/B bank rotation system.
- **Relative Calculation:** The extraction logic must consult the offsets to determine the correct offset relative to the dynamically resolved `section1Offset` for each game version.
  - In `SaveBlock1`, the `vars` array offset is `0x139C` for Emerald and `0x1340` for Ruby/Sapphire.
  - The byte offset for the Ash variable within the `vars` array is `0x90` (from `(0x4048 - 0x4000) * 2`).
- **Module-Level Constants:** All memory offsets and lengths MUST be explicitly defined as reusable constants at the module level (e.g., `GEN3_EMERALD_VARS_OFFSET = 0x139C`, `GEN3_RS_VARS_OFFSET = 0x1340`, `GEN3_ASH_VAR_RELATIVE_OFFSET = 0x90`). The use of inline magic numbers is strictly forbidden (ADR 028).
- **Bounds Checking:** When parsing save files with the `DataView` API, catch `RangeError` and throw a new error with the exact message `'The save file is corrupted or incomplete.'` to ensure safe handling of out-of-bounds reads.
- **Testing:** Include unit tests to verify extraction for Emerald and Ruby/Sapphire formats.

## Acceptance Criteria
- [x] Define reusable constants for vars offsets and the ash variable offset at the module level in `src/engine/saveParser/parsers/gen3.ts`.
- [x] Implement `parseGen3VolcanicAsh(view: DataView, saveBlock1Offset: number, version: GameVersion): number` logic in `src/engine/saveParser/parsers/gen3.ts`.
- [x] Extract the Volcanic Ash value correctly in `parseGen3` using the dynamic `section1Offset`.
- [x] Write unit tests to cover both Emerald and Ruby/Sapphire Volcanic Ash extraction in `src/engine/saveParser/parsers/gen3.test.ts`.
- [x] Add the `coder` persona self-verification results to the private journal `.foundry/journals/coder.md` (no QA task is needed).
