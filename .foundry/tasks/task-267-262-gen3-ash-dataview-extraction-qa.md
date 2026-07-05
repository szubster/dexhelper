---
id: task-267-262-gen3-ash-dataview-extraction-qa
type: TASK
title: QA Gen 3 Volcanic Ash Count DataView Extraction
status: READY
owner_persona: qa
created_at: '2026-07-04'
updated_at: '2026-07-04'
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
  - .foundry/research/research-054-243-gen3-ash-gathering-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Volcanic Ash Count DataView Extraction

## Context
Based on research findings, the Volcanic Ash gather count is stored as game variable `0x4048`.
- It's a `u16` located at byte offset `0x90` within the `SaveBlock1` vars array.
- Emerald Absolute Offset: `0x142C`
- Ruby/Sapphire Absolute Offset: `0x13D0`

## Requirements
1. Verify the extraction logic properly uses `DataView` API and catches `RangeError` exceptions for out-of-bounds reads.
2. Ensure no magic numbers are used inline; all memory offsets and lengths must be module-level constants.
3. Verify comprehensive test coverage exists and passes.

## Acceptance Criteria
- [ ] Code review the implementation to ensure it meets requirements.
- [ ] Verify test coverage is complete and successful.

## Persona Instructions
- **QA**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **QA**: If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **QA**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.