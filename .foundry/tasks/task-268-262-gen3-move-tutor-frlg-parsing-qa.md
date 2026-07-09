---
id: task-268-262-gen3-move-tutor-frlg-parsing-qa
type: TASK
title: Verify Gen 3 FRLG Move Tutor Flags Parsing
status: READY
owner_persona: qa
created_at: '2026-07-04'
updated_at: '2026-07-09'
depends_on:
  - task-268-261-gen3-move-tutor-frlg-parsing-impl
jules_session_id: null
pr_number: null
parent: story-119-268-gen3-move-tutor-frlg-parsing
tags:
  - gen3
  - save-parsing
  - move-tutor
  - frlg
research_references:
  - research-055-247-gen3-move-tutor-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Verify Gen 3 FRLG Move Tutor Flags Parsing

## Objective
Verify the implementation of FireRed and LeafGreen Move Tutor flags extraction.

## Rules
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify that the coder used DataView API to extract data.
- [ ] Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level.
- [ ] Verify that `RangeError` is properly caught for out-of-bounds reads.
- [ ] Verify that unit tests pass and cover the Move Tutor extraction for FRLG.
