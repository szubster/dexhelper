---
id: task-320-323-gen2-trainer-flags-qa
type: TASK
title: Gen 2 Trainer Data Extraction QA
status: ACTIVE
owner_persona: qa
created_at: '2026-07-15'
updated_at: '2026-07-29'
depends_on:
  - task-320-322-gen2-trainer-flags-impl
jules_session_id: '4828026640105975745'
pr_number: null
parent: story-306-320-gen2-trainer-data-extraction
tags:
  - gen2
  - save-engine
  - extraction
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Trainer Data Extraction QA

## Objective
Verify the implementation of the Gen 2 trainer defeat flags extraction logic.

## Requirements
1. Verify that the Coder correctly implemented the extraction of trainer defeat event flags from Bank 1 for Gen 2 (GS/Crystal).
2. **ADR 026 Verification**: Confirm that explicit bitwise logic (shifting and masking) was used with appropriate boundary testing.
3. **ADR 028 Verification**: Confirm that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Ensure there are no inline magic numbers.

## Instructions
- If the Coder's implementation is incomplete or violates the architecture rules, reject the task.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify Gen 2 trainer flags extraction logic works as intended.
- [ ] Confirm ADR 026 compliance.
- [ ] Confirm ADR 028 compliance.
