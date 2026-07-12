---
id: task-267-320-gen3-ash-dataview-extraction-retry-impl
type: TASK
title: Implement Gen 3 Volcanic Ash Extraction (Retry)
status: PENDING
owner_persona: coder
created_at: '2026-07-12'
updated_at: '2026-07-12'
jules_session_id: null
depends_on:
  - research-267-297-gen3-ash-dataview-relative-offsets
parent: story-113-267-gen3-ash-dataview-extraction
tags:
  - gen3
  - ash
  - parsing
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Volcanic Ash Extraction (Retry)

## Context
Based on research findings, the Volcanic Ash gather count is stored as game variable `0x4048`.
- It's a `u16` located at byte offset `0x90` within the `SaveBlock1` vars array.
- Emerald Absolute Offset: `0x142C`
- Ruby/Sapphire Absolute Offset: `0x13D0`

The previous implementation failed because it hardcoded these absolute offsets. Gen 3 save files use an A/B bank rotation system for flash memory. To properly support this, we must dynamically resolve the offset based on `section1Offset`.

As per ADR 010, the DataView API MUST be used instead of raw `Uint8Array` manipulation.
As per ADR 028, all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are explicitly forbidden.

## Acceptance Criteria
- [ ] Implement Volcanic Ash DataView extraction logic for Gen 3 saves.
- [ ] Calculate the relative memory offset using the dynamically resolved `section1Offset` (i.e., `section1Offset + 0x90` or equivalent relative mapping) instead of hardcoding `0x142C` or `0x13D0`.
- [ ] Define the necessary relative offsets as reusable module-level constants.
- [ ] Write unit tests verifying correct extraction for Ruby/Sapphire and Emerald using `section1Offset`.
- [ ] Write unit tests that trigger and catch `RangeError` exceptions for out-of-bounds reads.

## Developer Instructions
- **Failure conditions:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Completion conditions:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.