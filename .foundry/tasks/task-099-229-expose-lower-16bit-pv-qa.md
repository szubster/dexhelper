---
id: task-099-229-expose-lower-16bit-pv-qa
type: TASK
title: QA - Expose lower 16-bits of PV
status: PENDING
owner_persona: qa
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on:
  - task-099-228-expose-lower-16bit-pv-impl
jules_session_id: null
pr_number: null
parent: story-062-099-gen3-expose-lower-16bit-pv
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Expose lower 16-bits of PV

## Context
The Coder has implemented the logic to pre-calculate and expose the lower 16 bits of the 32-bit Personality Value (PV).

## Requirements
1. **Validation**: Validate that the lower 16-bits of the PV are correctly calculated and exposed according to the specifications in the implementation task.
2. **Testing**: Write or update tests in `src/engine/saveParser/parsers/gen3.test.ts` to verify the functionality of extracting the lower 16-bits of the PV.
3. **Resilience Contract**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
4. **Completion Contract**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Validate logic correctly exposes lower 16-bits of PV.
- [ ] Write/update tests to verify functionality.
- [ ] Run `pnpm test` to ensure tests pass.