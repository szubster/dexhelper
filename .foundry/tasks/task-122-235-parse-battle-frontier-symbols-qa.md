---
id: task-122-235-parse-battle-frontier-symbols-qa
type: TASK
title: Gen 3 Parse Battle Frontier Symbols QA
status: PENDING
owner_persona: qa
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on:
  - task-122-234-parse-battle-frontier-symbols-impl
jules_session_id: null
pr_number: null
parent: story-078-122-gen3-parse-battle-frontier-symbols
tags:
  - feature
  - gen3
  - endgame
  - save-engine
research_references:
  - research-046-140-gen3-battle-frontier
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Parse Battle Frontier Symbols QA

## Context
Verify the implementation in `task-122-234-parse-battle-frontier-symbols-impl` properly extracts Silver and Gold symbol flags for the Battle Frontier from a Gen 3 `SaveBlock1` data view.

## Requirements
1. **Verify Offsets & Masks**: Ensure all 7 facilities have both Silver and Gold extraction using the correct offsets (`0x1388`, `0x1389`, `0x138A`) and precise bit masks matching `research-046-140-gen3-battle-frontier`.
2. **Verify Constants Usage**: Ensure no magic inline numbers are used for offsets and bits. They must be declared as module-level constants.
3. **Verify Bitwise Handling**: Ensure parsing follows ADR 026 and explicit bitwise operations are used correctly (`>>` and `&`).
4. **Verify Boundary Tests**: Ensure `DataView` limits and out-of-bounds `RangeError` cases are explicitly handled and unit tests are written to verify they correctly propagate "Corrupted Save File" validation errors.
5. **Run all tests**: Run the unit test suite and verify everything passes correctly.

## Acceptance Criteria
- [ ] Offsets and bits are correctly defined as module-level constants.
- [ ] Bitwise logic extracts correctly from `DataView` according to ADR 026.
- [ ] `RangeError` fallback tests pass and propagate as expected.
- [ ] Implementation tests run successfully.

## Reminders
- If you encounter a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task (e.g. if the logic already exists), you MUST check off all Acceptance Criteria checkboxes before submitting.