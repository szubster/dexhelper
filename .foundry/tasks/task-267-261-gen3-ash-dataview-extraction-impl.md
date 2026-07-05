---
id: task-267-261-gen3-ash-dataview-extraction-impl
type: TASK
title: Implement Gen 3 Volcanic Ash Count DataView Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: '222727710770471921'
pr_number: null
parent: story-113-267-gen3-ash-dataview-extraction
tags:
  - gen3
  - ash
  - parsing
research_references:
  - .foundry/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Volcanic Ash Count DataView Extraction

## Context
Based on research findings, the Volcanic Ash gather count is stored as game variable `0x4048`.
- It's a `u16` located at byte offset `0x90` within the `SaveBlock1` vars array.
- Emerald Absolute Offset: `0x142C`
- Ruby/Sapphire Absolute Offset: `0x13D0`

## Requirements
1. Extract the Volcanic Ash gather count using the `DataView` API.
2. When parsing, you must properly catch `RangeError` exceptions to safely handle out-of-bounds reads.
3. All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [ ] Implement the extraction logic for Gen 3 Volcanic Ash count.
- [ ] Define reusable constants for all memory offsets (`0x142C`, `0x13D0`).
- [ ] Properly catch `RangeError` to handle out-of-bounds reads.
- [ ] Write unit tests for the extraction logic.

## Persona Instructions
- **Coder**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Coder**: If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Coder**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
