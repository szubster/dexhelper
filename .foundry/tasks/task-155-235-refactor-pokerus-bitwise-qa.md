---
id: task-155-235-refactor-pokerus-bitwise-qa
type: TASK
title: Refactor Pokerus Bitwise Extraction QA
status: PENDING
owner_persona: qa
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on:
  - task-155-234-refactor-pokerus-bitwise-impl
jules_session_id: null
pr_number: null
parent: story-061-155-refactor-pokerus-bitwise
tags:
  - refactor
  - save-engine
  - pokerus
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Pokerus Bitwise Extraction QA

## Description
Verify the implementation of `parsePokerus` in `src/engine/saveParser/parsers/common.ts` against the requirements in ADR 026. This includes comprehensive boundary testing of the bitwise extraction logic.

As per ADR 026:
1. Parsers MUST use explicit bitwise shifting (`>>`) and masking (`&`) to isolate multi-value bitfields into discrete properties rather than evaluating the entire byte.
2. Cured State Enforcement: Any bitwise data structure representing a "condition" that degrades or changes over time (like Pokerus or Contest conditions) MUST explicitly define and test its boundary states (such as the "cured" state where the identity/strain is non-zero but the duration is zero).
3. Comprehensive Boundary Testing: All parsing logic involving bitwise extraction MUST be accompanied by extensive unit tests that explicitly cover:
   - Absolute zero state (uninfected/uninitialized).
   - Boundary states (cured/expired).
   - Max boundary values (e.g., max strain and max days remaining).

## Acceptance Criteria
- [ ] Verify tests in `common.test.ts` for `parsePokerus` cover absolute zero state
- [ ] Verify tests in `common.test.ts` for `parsePokerus` cover cured boundary state
- [ ] Verify tests in `common.test.ts` for `parsePokerus` cover max boundary values
- [ ] Ensure all parsing logic involving bitwise extraction defines constants at module level (no magic numbers)

### Important Constraints
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
