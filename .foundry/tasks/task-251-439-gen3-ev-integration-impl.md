---
id: task-251-439-gen3-ev-integration-impl
type: TASK
title: Task - Gen 3 EV Integration Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-02'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: '3866091753891609991'
pr_number: null
parent: story-116-251-gen3-ev-integration
tags:
  - gen3
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task - Gen 3 EV Integration Implementation

## 1. Objective
Update `parseGen3Party` and `parseGen3PCBoxes` to call `parseGen3EVs` and assign the result to the `evs` property of the `PokemonInstance`.

## 2. Background
The Gen 3 EV parsing logic has been defined in `parseGen3EVs`. It now needs to be called when extracting Party and PC Box Pokémon data.

## 3. Scope
- Update `PokemonInstance` in `src/engine/saveParser/parsers/common.ts` to include `evs?: { hp: number; attack: number; defense: number; speed: number; specialAttack: number; specialDefense: number } | undefined;`.
- Update `parseGen3Party` in `src/engine/saveParser/parsers/gen3.ts` to call `parseGen3EVs(view, growthSubstructureOffset)` and map it to the `evs` property of the party `PokemonInstance`. Ensure `parseGen3EVs` is imported if necessary.
- Update `parseGen3PCBoxes` in `src/engine/saveParser/parsers/gen3.ts` to call `parseGen3EVs(pcBufferView, growthSubstructureOffset)` and map it to the `evs` property of the PC Box `PokemonInstance`. Ensure `parseGen3EVs` is imported if necessary.
- Note: `RangeError` is handled internally by `parseGen3EVs` which throws a generic corruption error.

## 4. Acceptance Criteria
- [ ] `PokemonInstance` interface has `evs` property.
- [ ] `parseGen3Party` extracts EVs using `parseGen3EVs` and assigns it to `PokemonInstance`.
- [ ] `parseGen3PCBoxes` extracts EVs using `parseGen3EVs` and assigns it to `PokemonInstance`.
