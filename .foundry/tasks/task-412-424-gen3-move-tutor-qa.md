---
id: task-412-424-gen3-move-tutor-qa
type: TASK
title: Gen 3 Move Tutor Extractor QA Verification
status: READY
owner_persona: qa
created_at: '2026-08-12'
updated_at: '2026-08-17'
depends_on:
  - task-412-423-gen3-move-tutor-extractor
jules_session_id: null
pr_number: null
parent: story-406-412-gen3-move-tutor-parsing-core
tags:
  - qa
  - gen3
  - save-parsing
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Task: Gen 3 Move Tutor Extractor QA Verification

## Objective
Verify the correctness of the Gen 3 one-time Move Tutor extraction implementation and ensure strict adherence to ADR 010 and Section 13 of `.foundry/docs/schema.md`.

## Context
As per the Intelligent Verification Protocol, a QA task is needed due to the strictness of the bitwise operations and relative memory offset handling. We must ensure no regressions and full compliance with architecture rules.

## Requirements
1. Review the constants module to ensure all flags, byte offsets, and bit positions are correct and match `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md`.
2. Ensure there are no magic numbers used in the parsing logic.
3. Review the extraction functions to confirm they strictly use `DataView` and compute offsets relative to the `SaveBlock1` section offset.
4. Verify that `RangeError` is caught during out-of-bounds `DataView` access and the exact error message "The save file is corrupted or incomplete." is thrown.
5. Review the test suite to ensure comprehensive coverage for both valid and malformed save structures for both Emerald and FireRed/LeafGreen.
6. Verify no architectural rules were broken in the implementation.

### Validation Failed
Detected an architectural violation: magic number `8` is used for bit shifts and module logic instead of the mandated `BITS_PER_BYTE` constant. I have rejected the target implementation task.

## Acceptance Criteria
- [ ] Constants are correct and match specifications.
- [ ] No magic numbers are used in parsing.
- [ ] `DataView` and relative offsets are strictly used.
- [ ] `RangeError` is handled correctly with the specified error message.
- [ ] Unit tests are comprehensive and pass.
