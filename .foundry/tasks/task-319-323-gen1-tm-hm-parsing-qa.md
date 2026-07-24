---
id: task-319-323-gen1-tm-hm-parsing-qa
type: TASK
title: Gen 1 TM/HM Save Parsing QA
status: ACTIVE
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-07-24'
depends_on:
  - task-319-322-gen1-tm-hm-parsing-impl
jules_session_id: '2897712216952814014'
pr_number: null
parent: story-306-319-gen1-tm-hm-parsing
tags:
  - qa
  - gen1
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 TM/HM Save Parsing QA

## Context
Verify the implementation of Gen 1 TM/HM save parsing logic. The parsing engine must correctly extract the player's TM and HM inventory, map them to moves, and correctly evaluate event flags for one-time TMs.

## Constraints & Requirements
1. **Review Constants**: Verify that ADR 028 is followed. There should be NO inline magic numbers for memory offsets; all must be module-level constants.
2. **Property Names**: Verify adherence to ADR 015 (full property names in `PokeData`).
3. **Test Coverage**: Ensure thorough unit test coverage for edge cases, such as missing items, duplicate TMs (if possible via glitches), and correctly mapped event flags.
4. **Failure State Handling**: If you experience a transient failure requiring retry or reject the implementation, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
5. **Empty PR Policy**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## QA Results
- Implementation rejected and failed due to violation of ADR 028.
- Inline magic numbers (e.g., 0x27e6, 0x25c9) are directly used in `src/engine/saveParser/parsers/gen1.ts` for extraction. These need to be converted to module-level constants.

## Acceptance Criteria
- [ ] Verify that Gen 1 TM/HM parsing correctly extracts items and quantities.
- [ ] Verify that TM/HMs are correctly mapped to moves.
- [ ] Verify that event flags for one-time TMs are extracted.
- [ ] Verify compliance with ADR 028 (no magic numbers, constants at module level).
- [ ] Run test suite and ensure all tests pass.
