---
id: task-095-183-gen3-berry-dataview-parsing-retry-impl
type: TASK
title: Implement Gen 3 Berry Tracker DataView Parsing Logic Retry
status: PENDING
owner_persona: coder
created_at: 2026-06-14
updated_at: 2026-06-14
depends_on:
  - research-095-158-gen3-berry-missing-offsets
jules_session_id: null
pr_number: null
parent: story-055-095-gen3-berry-data-parsing
tags:
  - feature
  - gen3
  - berries
  - engine
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Task: Implement Gen 3 Berry Tracker DataView Parsing Logic Retry

## Overview
Implement the extraction logic for Gen 3 berry patches using the native `DataView` API. This is a retry task incorporating research findings on missing explicit fields.

## Constraints & Architecture
- Follow ADR 010: Exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`) instead of raw `Uint8Array` manipulations.
- Implement graceful handling of bounds checking by throwing and explicitly catching `RangeError` within the parser engine. Propagate these as specific validation errors (e.g., "Corrupted Save File").
- Extract `berry ID`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and `watered` stages as defined in the `gen3_berry_patch_offsets.md` document.
- IMPORTANT: `map ID`, `time planted`, and `last watered time` are implicit and should NOT be explicitly extracted, to avoid incorrect calculations as detailed in `.foundry/research-095-158-gen3-berry-missing-offsets.md`.
- Seek to offset `0x169C` in `SaveBlock1` (taking into account the relative offset `0x071C` within Section 1) and iterate 128 times, advancing by 8 bytes per iteration.
- IMPORTANT: If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- IMPORTANT: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `DataView` reading logic for Gen 3 berry patches using offset `0x169C` in `SaveBlock1`.
- [ ] Implement graceful handling of bounds checking by throwing/catching `RangeError`.
- [ ] Extract `berry ID`, `stage`, `stopGrowth`, `minutesUntilNextStage`, `berryYield`, `regrowthCount`, and watering history bitflags.
- [ ] Ensure `map ID`, `time planted`, and `last watered time` are omitted from extraction logic since they are implicit.
