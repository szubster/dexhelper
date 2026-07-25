---
id: task-322-332-gen2-dv-extraction-qa
type: TASK
title: QA Gen 2 DV Data Extraction
status: PENDING
owner_persona: qa
created_at: '2026-07-25'
updated_at: '2026-07-25'
depends_on:
  - task-322-331-gen2-dv-extraction-impl
jules_session_id: null
pr_number: null
parent: story-324-322-gen2-dv-extraction
tags:
  - dexhelper
  - generation-2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 2 DV Data Extraction

## 1. Objective
Verify that the DV extraction implementation correctly retrieves Attack, Defense, Speed, and Special DVs from Gen 2 save files, and strictly adheres to architectural constraints.

## 2. Requirements & Context
- Review the PR from `task-322-331-gen2-dv-extraction-impl`.
- Ensure extraction properly computes DVs.
- **Strict Verification Rules:**
  - Verify that ALL memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. There must be ZERO inline magic numbers for memory operations.
  - Verify that `RangeError` from out-of-bounds `DataView` reads is correctly caught, and an error with the exact message "The save file is corrupted or incomplete." is thrown.

## Acceptance Criteria
- [ ] Ensure DV extraction correctly outputs Attack, Defense, Speed, and Special values.
- [ ] Confirm no inline magic numbers exist; all memory offsets/shifts must be module-level constants.
- [ ] Confirm the implementation catches `RangeError` and throws "The save file is corrupted or incomplete.".
- [ ] Run test suite successfully.
