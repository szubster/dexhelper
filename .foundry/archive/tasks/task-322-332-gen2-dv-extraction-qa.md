---
id: task-322-332-gen2-dv-extraction-qa
type: TASK
title: QA Gen 2 DV Data Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-07-17'
updated_at: '2026-07-20'
depends_on:
  - task-322-331-gen2-dv-extraction-impl
jules_session_id: null
pr_number: null
parent: story-324-322-gen2-dv-extraction
tags:
  - dexhelper
  - generation-2
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 DV Data Extraction

## Objective
Verify the implementation of Gen 2 DV data extraction to ensure correctness and adherence to architectural requirements.

## Instructions
1. Verify that the extraction mechanisms for Gen 2 Pokémon DVs correctly extract the 4 DVs (Attack, Defense, Speed, Special).
2. **Explicit Data Parsing Rules**: Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Inline magic numbers for memory operations are strictly forbidden. Reject the task if magic numbers are used.
3. **DataView API Constraints**: Verify that `RangeError` is properly caught when using the DataView API for out-of-bounds reads and that a new error with the exact message `'The save file is corrupted or incomplete.'` is thrown. Reject the task if this error handling is missing or incorrect.
4. If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a clear `rejection_reason`.
5. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a clear `rejection_reason`.

## Acceptance Criteria
- [x] Verify Gen 2 DV data extraction correctly extracts Attack, Defense, Speed, and Special DVs.
- [x] Verify no magic numbers are used inline for memory offsets, lengths, bit locations, and shifts (must be module-level constants).
- [x] Verify out-of-bounds DataView API reads throw `'The save file is corrupted or incomplete.'`.
