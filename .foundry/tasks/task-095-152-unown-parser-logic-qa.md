---
id: task-095-152-unown-parser-logic-qa
type: TASK
title: QA Unown Form Parser Logic
status: PENDING
owner_persona: qa
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on:
  - .foundry/tasks/task-095-151-unown-parser-logic-impl.md
jules_session_id: null
pr_number: null
parent: story-058-095-unown-parser-logic
tags:
  - feature
  - gen2
  - tracking
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Unown Form Parser Logic

## Context
As defined in the parent Epic and Story, the Coder has implemented logic to extract the Unown form from its DVs for Gen 2 Pokémon. For Unown (`speciesId` 201), the form is determined by extracting the middle 2 bits of its Attack, Defense, Speed, and Special DVs. These 2 bits from each DV are concatenated into an 8-bit integer, and the form is determined by `modulo 28`. The result maps `0-25` to the letters `'A'-'Z'`. If the modulo result is 26 or 27, it maps to `'A'`.

## Requirements
1. Verify the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts` includes `unownForm?: string | undefined;`.
2. Verify the `parseGen2PokemonInstance` function in `src/engine/saveParser/parsers/gen2.ts` correctly calculates the Unown form when `speciesId === 201`.
   - The formula is: extract bits 1 and 2 from each DV (`(dv >> 1) & 0b11`).
   - Combine them: `(atkBits << 6) | (defBits << 4) | (spdBits << 2) | spcBits`.
   - Modulo 28: `value % 28`.
   - Map to letter: `0` to `'A'`, `25` to `'Z'`. If `value % 28` is `26` or `27`, it should be `'A'` (default/fallback behavior in Gen 2).
   - Ensure the `unownForm` property is set on the returned `PokemonInstance`.
3. Do not write tests in this task. Unit tests will be handled in a separate story/task.

## Important Persona Reminders
- **QA**: If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- **QA**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Code review completed.
- [ ] Unown logic correctly maps bits and handles modulo 28 logic correctly.
- [ ] No regressions introduced in parsing other species.
