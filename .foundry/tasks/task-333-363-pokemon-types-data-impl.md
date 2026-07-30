---
id: task-333-363-pokemon-types-data-impl
type: TASK
title: Add Pokemon Types to Data Pipeline
status: ACTIVE
owner_persona: coder
created_at: '2026-07-29'
updated_at: '2026-07-30'
depends_on: []
jules_session_id: '6014434938134127873'
pr_number: null
parent: story-136-333-sorting-standard-strategies-retry
tags:
  - data
  - pokemon
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Add Pokemon Types to Data Pipeline

## Context
As discovered in `research-136-330`, the `TypeSorter` could not be implemented because our `PokemonMetadata` schema lacks typing information. We need to expose a Pokemon's primary and secondary types to the client application.

## Requirements
1. **Schema Update (`src/db/schema.ts`)**:
   - Define and export a `POKEMON_TYPE` constant object mapping type names to integer IDs (e.g., `NORMAL: 1`, `FIGHTING: 2`, ..., `FAIRY: 18`).
   - Define a `POKEMON_TYPE_MAP` object mapping string keys to those integers (e.g., `'normal': 1`).
   - Add `types?: number[]` to the `PokemonMetadata` interface. Note: use `types` instead of minified `tps` in accordance with ADR 015 principles.
2. **Data Generation (`scripts/generate-pokedata.ts`)**:
   - Modify the `generate-pokedata.ts` script to extract `types` from PokeAPI's `pData.types`.
   - Map the PokeAPI string types to our integer IDs using `POKEMON_TYPE_MAP`.
   - Ensure the updated metadata is properly pushed into the `pokemon` array.
3. **Database Migration / Defaults (`src/db/PokeDB.ts`)**:
   - Update `DEFAULT_POKEMON_METADATA` if necessary to include an empty array `[]` for `types`.

## Acceptance Criteria
- [x] `POKEMON_TYPE` and `POKEMON_TYPE_MAP` are exported in `schema.ts`.
- [x] `PokemonMetadata` includes the `types?: number[]` property.
- [x] `scripts/generate-pokedata.ts` populates `types` based on `pData.types`.
- [x] Running `pnpm lint` and `pnpm test` passes successfully.
