---
id: task-121-328-gen3-tv-block-parser-retry7-qa
type: TASK
title: QA - Implement Gen 3 TV Block DataView Parser (Retry 7)
status: READY
owner_persona: qa
created_at: '2026-07-16'
updated_at: '2026-08-18'
depends_on:
  - task-121-327-gen3-tv-block-parser-retry7-impl
jules_session_id: null
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - feature
  - gen3
  - data-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Task: Verify Gen 3 TV Block DataView Parser (Retry 7)

## Description
This task requires you to verify the implementation of the Gen 3 TV Block DataView parser performed in `task-121-327-gen3-tv-block-parser-retry7-impl`.

You must strictly verify that the coder has adhered to **ADR 010** and used the `DataView` API exclusively. You must also verify that **ALL** memory offsets, lengths, bit locations, and shifts have been defined as module-level constants and that no inline magic numbers (e.g. `+ 2`, `+ 4`, `+ 6`) were used in the parsing logic.

Specifically, check for the presence and usage of the following constants based on research:
- `TVGROUP_RECORD_MIX_START = 21`
- `TVGROUP_RECORD_MIX_END = 40`
- `TVSHOW_STRUCT_SIZE = 36`
- `TV_SHOWS_COUNT = 25`
- `TVSHOW_MASS_OUTBREAK = 41`
- `OUTBREAK_MOVES_OFFSET = 0x04`
- `OUTBREAK_SPECIES_OFFSET = 0x0C`
- `OUTBREAK_MAP_NUM_OFFSET = 0x10`
- `OUTBREAK_MAP_GROUP_OFFSET = 0x11`
- `OUTBREAK_PROBABILITY_OFFSET = 0x13`
- `OUTBREAK_LEVEL_OFFSET = 0x14`
- `OUTBREAK_DAYS_BEFORE_OFFSET = 0x16`
- `OUTBREAK_LANGUAGE_OFFSET = 0x18`

Ensure that the coder uses the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets.

Finally, verify that the `RangeError` caught includes the exact text `"The save file is corrupted or incomplete."`.

## Acceptance Criteria
- [ ] Verified that the TV block extraction logic strictly utilizes `DataView`.
- [ ] Verified that no inline magic numbers were used, and all offsets/lengths are reusable constants at the module level.
- [ ] Verified that relative offsets from the resolved section offset are used, instead of absolute offsets.
- [ ] Verified that out-of-bounds reads gracefully throw a caught `RangeError` with the exact message text `"The save file is corrupted or incomplete."`.
- [ ] Verified that existing interfaces were not broken.

## Important Protocols (For QA)
- **Transient Failure:** If you experience a transient failure requiring retry or if the Coder's implementation is incorrect, you MUST update the YAML frontmatter to `status: FAILED` with a detailed `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Protocol:** If you submit an empty PR for a completed QA task, you MUST check off all Acceptance Criteria checkboxes before submitting.
