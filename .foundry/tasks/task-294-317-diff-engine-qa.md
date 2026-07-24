---
id: task-294-317-diff-engine-qa
type: TASK
title: QA PC Box Diff Engine Logic
status: CANCELLED
owner_persona: qa
created_at: '2026-07-12'
updated_at: '2026-07-19'
depends_on:
  - task-294-316-diff-engine-impl
jules_session_id: null
pr_number: null
parent: story-137-294-diff-engine-logic
tags:
  - qa
  - diff
  - testing
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-294-316-diff-engine-impl
notes: ''
---

# QA PC Box Diff Engine Logic

## Objective
Verify the correctness and robustness of the PC Box Diff Engine logic implemented by the coder.

## Description
The coder has implemented a diffing algorithm (`src/engine/saveParser/utils/boxDiff.ts` or similar) to compute additions, removals, and relocations between two arrays of `PokemonInstance`. The logic must strictly use the unique `hash` field on the Pokemon instances to track identities across boxes.

Your role as QA is to review the code for edge cases and ensure the tests adequately cover all possible scenarios.

## Validation Requirements
1.  **Code Review**: Verify that the implemented `calculateBoxDiff` (or equivalent) strictly uses the `hash` property to match Pokémon between the `current` and `target` states.
2.  **Test Coverage**: Review the unit tests associated with the diff engine. Ensure they cover:
    - Pure additions.
    - Pure removals.
    - Pure relocations (e.g., swapping two Pokémon, or moving one to an empty slot).
    - Complex combinations of the above.
    - Cases with duplicate species/levels where `hash` disambiguates them.

## Tech Lead Instructions
- **Empty PR Policy Reminder**: If you submit an empty PR because the logic already exists and is fully verified, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Error Handling Reminder**: If you experience a transient failure requiring retry (or if the coder's implementation fails your checks), update the YAML frontmatter to `status: FAILED` with a detailed `rejection_reason` explaining what the coder missed. If you must permanently abort (impossible or max rejections reached), update to `status: CANCELLED` with a `rejection_reason`.


### QA Validation Failure
- **Date**: 2026-07-15
- **Result**: FAILED
- **Reason**: The implementation in `src/engine/saveParser/utils/boxDiff.ts` generates a fallback hash rather than strictly relying on the `hash` property. Additionally, the `hash` property is missing entirely from the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts`. The task `task-294-316-diff-engine-impl` has been rejected.

## Acceptance Criteria
 - [x] Verify the diff algorithm correctly computes additions, removals, and relocations using the `hash` field.
 - [x] Verify unit test coverage is comprehensive for edge cases.

### QA Permanent Failure
- **Date**: 2026-07-18
- **Result**: CANCELLED
- **Reason**: The coder reached max rejections and repeatedly faked the hash generation logic instead of properly implementing it on PokemonInstance.
