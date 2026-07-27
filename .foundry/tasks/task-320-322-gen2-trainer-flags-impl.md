---
id: task-320-322-gen2-trainer-flags-impl
type: TASK
title: Gen 2 Trainer Data Extraction Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-15'
updated_at: '2026-07-27'
depends_on: []
jules_session_id: '11307529114770757476'
pr_number: null
parent: story-306-320-gen2-trainer-data-extraction
tags:
  - gen2
  - save-engine
  - extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Trainer Data Extraction Implementation

## Objective
Implement the logic to extract and parse the trainer defeat flags for Generation 2 games (Gold/Silver/Crystal) from Bank 1.

## Requirements
1. **Extraction Target**: Extract the trainer defeat event flags from Bank 1.
    - Note from `gen2_generic_structure.md`: The Event Flags block is 256 bytes in length and is consistently located exactly `0x100` (256) bytes prior to `wCurBox`.
2. **Explicit Bitwise Logic (ADR 026)**: You MUST use explicit bitwise shifting (`>>`) and masking (`&`) to isolate the specific trainer defeat flags rather than evaluating the entire byte. Include appropriate boundary tests as required by ADR 026.
3. **Relative Offsets & Constants (ADR 028)**: All memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. You are strictly forbidden from using inline magic numbers for memory reads.

## Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement Gen 2 trainer flags extraction logic.
- [ ] Ensure ADR 026 compliance (explicit bitwise logic).
- [ ] Ensure ADR 028 compliance (module-level constants, no magic numbers).
