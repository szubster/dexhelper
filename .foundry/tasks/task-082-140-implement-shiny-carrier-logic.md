---
id: task-082-140-implement-shiny-carrier-logic
type: TASK
title: Implement Gen 2 Shiny Carrier Logic
status: PENDING
owner_persona: coder
created_at: '2026-05-23'
updated_at: '2026-05-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-044-082-dv-shiny-gene-logic
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Shiny Carrier Logic

## Objective
Implement a utility function `isShinyCarrier` in `src/engine/saveParser/parsers/common.ts` to identify Pokémon that carry the "Shiny Gene" based on their Gen 2 DVs. Also, add the `isShinyCarrier` property to the `PokemonInstance` interface and populate it when parsing Gen 1 and Gen 2 Pokémon.

## Context
In Gen 2, Shininess is determined by a Pokémon's DVs. While a Pokémon is Shiny only if its Defense, Speed, and Special DVs are exactly 10, and its Attack DV is 2, 3, 6, 7, 10, 11, 14, or 15, a Pokémon is considered a "Shiny Carrier" (capable of passing down the Shiny Gene at a higher rate when breeding) if it has a Defense DV of 10 and a Special DV of 2 or 10.

## Acceptance Criteria
- [ ] Implement `isShinyCarrier` function in `src/engine/saveParser/parsers/common.ts` taking DVs as input.
- [ ] Update the `PokemonInstance` interface to include an `isShinyCarrier?: boolean;` property.
- [ ] Update `src/engine/saveParser/parsers/gen1.ts` to calculate and set `isShinyCarrier` when parsing Pokémon.
- [ ] Update `src/engine/saveParser/parsers/gen2.ts` to calculate and set `isShinyCarrier` when parsing Pokémon.
- [ ] Add unit tests for `isShinyCarrier` in `src/engine/saveParser/parsers/common.test.ts`.
