---
id: task-155-234-refactor-pokerus-bitwise-impl
type: TASK
title: Refactor Pokerus Bitwise Extraction Implementation
status: READY
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-061-155-refactor-pokerus-bitwise
tags:
  - refactor
  - save-engine
  - pokerus
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Pokerus Bitwise Extraction Implementation

## Description
Refactor the inline bitwise logic for Pokerus state extraction from `src/engine/saveParser/parsers/gen2.ts` into a standardized shared helper function `parsePokerus(rawPokerus: number)` in `src/engine/saveParser/parsers/common.ts`, in accordance with ADR 026. Update the parsing logic to use this helper.

As per ADR 026:
1. Parsers MUST use explicit bitwise shifting (`>>`) and masking (`&`) to isolate multi-value bitfields into discrete properties rather than evaluating the entire byte.
2. Cured State Enforcement: Any bitwise data structure representing a "condition" that degrades or changes over time (like Pokerus or Contest conditions) MUST explicitly define and test its boundary states.

## Acceptance Criteria
- [ ] Create `parsePokerus` in `common.ts` using constants for shifts and masks
- [ ] Refactor `gen2.ts` to use `parsePokerus`

### Important Constraints
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.
