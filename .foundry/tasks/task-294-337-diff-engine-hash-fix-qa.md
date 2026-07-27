---
id: task-294-337-diff-engine-hash-fix-qa
type: TASK
title: QA PC Box Diff Engine Hash Fix
status: ACTIVE
owner_persona: qa
created_at: '2026-07-20'
updated_at: '2026-07-26'
depends_on:
  - task-294-336-diff-engine-hash-fix-impl
jules_session_id: '11281423417366724467'
pr_number: null
parent: story-137-294-diff-engine-logic
tags:
  - qa
  - diff
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA PC Box Diff Engine Hash Fix

## Objective
Verify the correctness and robustness of the PC Box Diff Engine logic implemented by the coder.

## Description
The coder has implemented a fix to the diffing algorithm (`src/engine/saveParser/utils/boxDiff.ts`) to compute additions, removals, and relocations between two arrays of `PokemonInstance`. The logic must strictly use the newly added unique `hash` field on the Pokemon instances to track identities across boxes.

Your role as QA is to review the code for edge cases and ensure the tests adequately cover all possible scenarios.

## Validation Requirements
1.  **Code Review**: Verify that the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts` has the `hash: string;` property. Verify that the implemented `calculateBoxDiff` strictly uses the `hash` property to match Pokémon between the `current` and `target` states, and no longer contains a fallback hash generation logic.
2.  **Test Coverage**: Review the unit tests associated with the diff engine. Ensure they cover:
    - Pure additions.
    - Pure removals.
    - Pure relocations (e.g., swapping two Pokémon, or moving one to an empty slot).
    - Complex combinations of the above.
    - Cases with duplicate species/levels where `hash` disambiguates them.

## Tech Lead Instructions
- **Empty PR Policy Reminder**: If you submit an empty PR because the logic already exists and is fully verified, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Error Handling Reminder**: If you experience a transient failure requiring retry (or if the coder's implementation fails your checks), update the YAML frontmatter to `status: FAILED` with a detailed `rejection_reason` explaining what the coder missed. If you must permanently abort (impossible or max rejections reached), update to `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [x] Verify the `hash` property is added to `PokemonInstance` in `src/engine/saveParser/parsers/common.ts`.
- [x] Verify the diff algorithm correctly computes additions, removals, and relocations strictly using the `hash` field.
- [x] Verify unit test coverage is comprehensive for edge cases.
