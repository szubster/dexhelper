---
id: task-267-261-gen3-ash-dataview-extraction-impl
type: TASK
title: Implement Gen 3 Volcanic Ash Extraction
status: CANCELLED
owner_persona: coder
created_at: '2026-07-08'
updated_at: '2026-07-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-113-267-gen3-ash-dataview-extraction
tags:
  - gen3
  - ash
  - parsing
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 3
rejection_reason: >-
  [ACKNOWLEDGED] Developer repeatedly ignored ADR 028 and faked fix for relative
  offsets.
notes: ''
---

# Implement Gen 3 Volcanic Ash Extraction

## Context
Based on research findings, the Volcanic Ash gather count is stored as game variable `0x4048`.
- It's a `u16` located at byte offset `0x90` within the `SaveBlock1` vars array.
- Emerald Absolute Offset: `0x142C`
- Ruby/Sapphire Absolute Offset: `0x13D0`

As per ADR 010, the DataView API MUST be used instead of raw `Uint8Array` manipulation.
As per ADR 028, all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are explicitly forbidden.

## Acceptance Criteria
- [x] Implement Volcanic Ash DataView extraction logic for Gen 3 saves.
- [x] Define module-level constants for offsets (`0x142C`, `0x13D0`) and relative var array offset (`0x90`).
- [x] Write unit tests verifying correct extraction for Ruby/Sapphire and Emerald.
- [x] Write unit tests that trigger and catch `RangeError` exceptions for out-of-bounds reads.

## Developer Instructions
- **Failure conditions:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Completion conditions:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
