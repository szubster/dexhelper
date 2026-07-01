---
id: task-158-249-gen2-egg-hatch-parsing-impl
type: TASK
title: Implement Gen 2 Egg Hatch Data Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: '14734252185691957192'
pr_number: null
parent: story-106-158-gen2-egg-hatch-parsing
tags:
  - gen2
  - save-parsing
  - breeding
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Egg Hatch Data Extraction

## Objective
Implement the logic to extract the remaining egg cycles for Gen 2 Eggs and calculate the exact remaining steps for the egg to hatch.

## Technical Blueprint

### 1. Update `PokemonInstance` Interface
In `src/engine/saveParser/parsers/common.ts`:
- Add an optional `eggSteps?: number | undefined;` property to the `PokemonInstance` interface.

### 2. Update Gen 2 Parsing Logic
In `src/engine/saveParser/parsers/gen2.ts`, inside the `parseGen2PokemonInstance` function:
- Check if the Pokémon is an Egg by checking if `speciesId === 253`.
- If the Pokémon is an Egg, its `friendship` byte represents the remaining "Egg Cycles".
- Calculate `eggSteps` by multiplying the parsed friendship byte (cycle count) by `256` (the Gen 2 cycle length).
- Add the `eggSteps` property to the returned object.

### 3. Add Unit Tests
In `src/engine/saveParser/saveParser.test.ts` (or the appropriate test file like `gen2.test.ts` depending on where the `parseGen2PokemonInstance` tests reside):
- Add test cases to verify the calculation.
- Mock a `DataView` where the species ID is 253 and the friendship byte is set to a known value. Verify that the returned instance has the correctly calculated `eggSteps`.
- Verify that non-Egg Pokémon (species ID !== 253) do not have `eggSteps` defined.

## Constraints & Contract
- Ensure all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. Do not use inline magic numbers.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] `PokemonInstance` is updated with `eggSteps?: number`.
- [ ] `parseGen2PokemonInstance` calculates `eggSteps` correctly for eggs (species ID 253).
- [ ] Unit tests are written to verify the calculation.
