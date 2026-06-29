---
id: task-130-238-move-jsonl-compaction-impl
type: TASK
title: Implement Move JSONL Compaction
status: READY
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-086-130-move-jsonl-compaction
tags:
  - refactor
  - build
  - db
research_references:
  - adr-049-025-dynamic-pokedata-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Move JSONL Compaction

## Background
We need to apply compaction logic to the move data extracted in `scripts/generate-pokedata.ts` before writing it to `data/db/moves.jsonl`. This compaction pass minimizes payload size by stripping out nulls, undefined values, and defaults as defined by ADR 025.

## Technical Requirements
- Read the documentation in `.foundry/docs/adrs/adr-049-025-dynamic-pokedata-parsing.md` to understand the compaction rules for `moves.jsonl`.
- In `scripts/generate-pokedata.ts`, locate the `compact()` function or where `moves.map(compact)` is called. The current `compact()` function might already omit some defaults.
- Ensure the `compact()` function strips out the following for moves, according to the ADR:
  - `p` (power): Omit if 0 or null.
  - `acc` (accuracy): Omit if 100 or null.
  - Defaults for strings and arrays as already implemented.
- Note that in `scripts/generate-pokedata.ts` the `compact()` function seems to already have comments indicating omission of move power if 0 or null, and move accuracy if 100 or null. Ensure these rules are correctly implemented and accurately reflect ADR 025.
- The `compact()` function is called recursively and already handles generic defaults. Verify that the output shape exactly matches the expectation in ADR 025.
- If there are generation-specific overrides or PP max calculations, make sure only the base `pp` is saved (which may already be happening). The ADR mentions: "The generation logic should only store the base `pp`; the client runtime will calculate the max PP dynamically when needed."

## Acceptance Criteria
- [ ] Compaction logic correctly omits move `p` (power) when 0 or null.
- [ ] Compaction logic correctly omits move `acc` (accuracy) when 100 or null.
- [ ] The generated `moves.jsonl` contains the correct, minimal payload structure.

## Important Note for Coder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers (not strictly applicable here, but standard instruction).
