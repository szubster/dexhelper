---
id: task-333-369-pokemon-types-data-retry-impl
type: TASK
title: Add Pokemon Types to Data Pipeline (Retry)
status: ACTIVE
owner_persona: coder
created_at: '2026-07-30'
updated_at: '2026-07-31'
depends_on:
  - research-333-361-investigate-pokemon-types-failure
jules_session_id: '1478875382022248861'
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - data
  - pokemon
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Add Pokemon Types to Data Pipeline (Retry)

## Context
A retry of `task-333-363`. We need to expose a Pokemon's primary and secondary types to the client application, sorting them by `slot`.

## Requirements
1. **Schema Update (`src/db/schema.ts`)**:
   - Define and export a `POKEMON_TYPE` constant object mapping type names to integer IDs.
   - Define a `POKEMON_TYPE_MAP` object mapping string keys to those integers.
   - Add `types?: number[]` to the `PokemonMetadata` interface. Note: use `types` instead of minified `tps` in accordance with ADR 015 principles.
2. **Data Generation**:
   - Modify the `generate-pokedata.ts` script to extract `types`.
   - Map the string types to our integer IDs using `POKEMON_TYPE_MAP`.
   - **CRITICAL**: Ensure the types are sorted by their `slot` property before storing them.

## Acceptance Criteria
- [x] `POKEMON_TYPE` and `POKEMON_TYPE_MAP` are exported in `schema.ts`.
- [x] `PokemonMetadata` includes the `types?: number[]` property.
- [x] `generate-pokedata.ts` populates `types`, sorted by `slot`.
- [x] Running `pnpm lint` and `pnpm test` passes successfully.
