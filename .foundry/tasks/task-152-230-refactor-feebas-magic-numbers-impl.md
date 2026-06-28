---
id: task-152-230-refactor-feebas-magic-numbers-impl
type: TASK
title: Refactor Feebas Magic Numbers
status: READY
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-058-152-refactor-feebas-magic-numbers
tags:
  - gen3
  - backend
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Feebas Magic Numbers

## Objective
Refactor `src/engine/gen3/feebas.ts` to replace all inline magic numbers with explicitly defined and reusable constants to comply with memory and save file parsing rules.

## Context
The algorithm in `calculateFeebasTiles` still contains inline magic numbers for shifts, lengths, and multipliers (e.g., `1103515245`, `12345`, `16`, `447`, `6`, `4`). The architectural rule forbids these from being inline.

## Implementation Details
1. Open `src/engine/gen3/feebas.ts`.
2. Extract the following values into module-level exported constants:
   - PRNG multiplier (`1103515245`) and addend (`12345`).
   - Bit shift (`16`).
   - Total spots (`447`), valid spots (`6`), and inaccessible boundary (`4`).
3. Replace the magic numbers in the `calculateFeebasTiles` function with the new constants.
4. Verify the changes by running all relevant tests.

## Coder & QA Constraints
- **Self-Verification**: This task is simple/low-risk. The `coder` is expected to self-verify the changes and document the outcome in their journal.
- **Transient Failures**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Magic Number Rules**: When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [ ] PRNG multiplier (`1103515245`) and addend (`12345`) are extracted into descriptive constants.
- [ ] Bit shift (`16`) is extracted into a constant.
- [ ] Lengths and boundaries (`447` total spots, `6` valid spots, `4` inaccessible boundary) are extracted into constants.
- [ ] All new constants are exported at the module level.
- [ ] The `calculateFeebasTiles` function is updated to use the new constants instead of inline magic numbers.
- [ ] Tests pass (self-verified by coder).
