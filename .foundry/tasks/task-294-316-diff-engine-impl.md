---
id: task-294-316-diff-engine-impl
type: TASK
title: Implement PC Box Diff Engine Logic
status: CANCELLED
owner_persona: coder
created_at: '2026-07-12'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-137-294-diff-engine-logic
tags:
  - algorithm
  - diff
  - implementation
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---

# Implement PC Box Diff Engine Logic

## Objective
Implement the diffing algorithm that compares the `current` state of PC boxes and a `target` state of PC boxes, computing the precise differences: additions, removals, and relocations.

## Description
This engine is the core logic that will eventually power the "Move Planner" UI. It takes an array of the user's current `PokemonInstance` list from the parsed save state and compares it against an array of the desired/target `PokemonInstance` state.
The output should be a structured object or list of diffs explaining what needs to happen to transition from `current` to `target`.

## Constraints & Requirements
1. The diff engine must identify Pokémon uniquely to track relocations across boxes. Since DVs/IVs, species, and level might not be globally unique (e.g., catching 10 identical Pidgeys), the diff engine must use a combination of fields (PID/TID/SID if available, or generate a robust hash/identifier based on static stats, moves, DVs) or rely on reference equality if the objects are the same instances. For our use-case, relying on the unique `hash` field already present on the parsed `PokemonInstance` is strictly required.
2. The output should be a typed structure detailing:
   - Entities to **Move**: Currently at `(sourceBox, sourceSlot)`, needs to go to `(targetBox, targetSlot)`.
   - Entities to **Add**: Exists in `target` but not in `current`.
   - Entities to **Remove**: Exists in `current` but not in `target`.
3. The implementation should be placed in `src/engine/saveParser/utils/boxDiff.ts` (or similar appropriate utility file).

## Tech Lead Instructions
- **Empty PR Policy Reminder**: If you submit an empty PR because the logic already exists, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Error Handling Reminder**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort (impossible or max rejections reached), update to `status: CANCELLED` with a `rejection_reason`.
- **Offset Constants Rule**: When writing any save file parsing logic (if applicable here, though this is primarily algorithmic), explicitly require that all memory offsets, lengths, bit locations, and shifts be defined as reusable constants at the module level. Inline magic numbers are forbidden.

## Acceptance Criteria
- [x] Implement the box diffing logic function (e.g., `calculateBoxDiff`).
- [x] Write unit tests verifying additions, removals, and complex relocations.
- [x] Ensure Pokémon are uniquely tracked by their `hash`.
