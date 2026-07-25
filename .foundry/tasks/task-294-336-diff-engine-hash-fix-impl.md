---
id: task-294-336-diff-engine-hash-fix-impl
type: TASK
title: Implement PC Box Diff Engine Hash Fix
status: ACTIVE
owner_persona: coder
created_at: '2026-07-20'
updated_at: '2026-07-25'
depends_on:
  - research-294-335-diff-engine-hash-failure
jules_session_id: '13447290936000811360'
pr_number: null
parent: story-137-294-diff-engine-logic
tags:
  - algorithm
  - diff
  - implementation
  - fix
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement PC Box Diff Engine Hash Fix

## Objective
Fix the diff engine by adding the `hash` property to `PokemonInstance` and updating `calculateBoxDiff` to use it exclusively.

## Description
Previous attempts to implement the PC Box Diff Engine failed because the `PokemonInstance` interface did not contain a `hash` property, and the implemented logic used a fallback hash generator instead of relying strictly on the `hash` property.

This task involves two main changes:
1. Update `src/engine/saveParser/parsers/common.ts` to add the `hash: string;` property to the `PokemonInstance` interface.
2. Update `src/engine/saveParser/utils/boxDiff.ts` to enforce the use of `pokemon.hash` and remove the fallback hash generation logic entirely. The contract requires that `calculateBoxDiff` strictly relies on the unique `hash` field on the Pokemon instances to track identities.

## Tech Lead Instructions
- **Empty PR Policy Reminder**: If you submit an empty PR because the logic already exists, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Error Handling Reminder**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort (impossible or max rejections reached), update to `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [ ] Add the `hash: string;` property to the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts`.
- [ ] Update `calculateBoxDiff` in `src/engine/saveParser/utils/boxDiff.ts` to exclusively use the `hash` property of `PokemonInstance` to track identities.
- [ ] Ensure all unit tests pass.
