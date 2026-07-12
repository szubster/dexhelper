---
id: task-267-262-gen3-ash-dataview-extraction-qa
type: TASK
title: QA Gen 3 Volcanic Ash Extraction
status: READY
owner_persona: qa
created_at: '2026-07-08'
updated_at: '2026-07-12'
depends_on:
  - task-267-261-gen3-ash-dataview-extraction-impl
jules_session_id: null
pr_number: null
parent: story-113-267-gen3-ash-dataview-extraction
tags:
  - gen3
  - ash
  - parsing
research_references:
  - .foundry/archive/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 1
rejection_reason: ''
notes: ''
---

# QA Gen 3 Volcanic Ash Extraction

## Context
Based on research findings, the Volcanic Ash gather count is stored as game variable `0x4048`.
- It's a `u16` located at byte offset `0x90` within the `SaveBlock1` vars array.
- Emerald Absolute Offset: `0x142C`
- Ruby/Sapphire Absolute Offset: `0x13D0`

The implementation task (`task-267-261-gen3-ash-dataview-extraction-impl`) requires extracting this data. As QA, you need to verify it.

## Acceptance Criteria
- [ ] Verify that the DataView API is used instead of raw `Uint8Array` manipulation (ADR 010).
- [ ] Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level, without inline magic numbers (ADR 028).
- [ ] Verify unit tests correctly extract ash count for both Emerald and Ruby/Sapphire.
- [ ] Verify unit tests correctly trigger and catch `RangeError` exceptions for out-of-bounds reads.

## Developer Instructions
- **Failure conditions:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Completion conditions:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

### QA Validation Failure
Task rejected. The implementation uses absolute memory offsets (`0x13D0` / `0x142C`) instead of calculating relative offsets from the resolved `section1Offset`. This violates the rules for extracting Gen 3 dynamic save blocks and will result in reading from the wrong memory location.
