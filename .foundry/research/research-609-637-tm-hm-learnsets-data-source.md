---
id: research-609-637-tm-hm-learnsets-data-source
type: RESEARCH
title: Determine Data Source for TM/HM Learnsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-29'
updated_at: '2026-09-30'
depends_on: []
jules_session_id: '9516464439336129355'
pr_number: null
parent: task-560-609-tm-hm-compatibility-matching-impl-retry
tags:
  - feature
  - logic
  - investigation
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Determine Data Source for TM/HM Learnsets

## Overview
Investigate how to determine if a specific Pokemon species can learn a TM/HM move in the application's data models.

## Acceptance Criteria
- [x] Determine where and how the TM/HM learnsets are stored in `PokeDB` or other data models.
- [x] Propose a solution for how `getCompatiblePokemonForTMHM` should perform the learnset check for each `PokemonInstance`.

## Research Findings
**Data Source for TM/HM Learnsets:**
The PokeAPI data pipeline script (`scripts/generate-pokedata.ts`) originally only extracted and stored egg moves (`move_learn_method.name === 'egg'`) for precomputing shortest breeding chains. It did not store the TM/HM learnsets (`move_learn_method.name === 'machine'`) in the final `pokemon.jsonl` database payload to save space. We modified `generate-pokedata.ts` to track `machine` move learn methods during extraction into a `tmLearners` map. We then updated the `PokemonMetadata` schema in `src/db/schema.ts` to include an optional `tm?: number[]` array that contains all the TM/HM move IDs a specific Pokémon can learn.

**Proposed Solution for `getCompatiblePokemonForTMHM`:**
1. `getCompatiblePokemonForTMHM` receives the target TM/HM object (e.g., from `pokeDB.getItem()`).
2. It resolves the underlying `moveId` associated with that TM/HM item (using the item's metadata or `GEN3_TM_HM_MOVE_MAP`).
3. It maps the provided `PokemonInstance` objects to their corresponding `PokemonMetadata` via `pokeDB.getPokemon(speciesId)`.
4. It checks if the underlying `moveId` is present in the `tm` array of the corresponding `PokemonMetadata`.
5. It also checks `pokemon.knownMoves` as a fallback.
6. Returns the list of Pokémon instances where either the `tm` array includes the move ID, or they already know the move.
