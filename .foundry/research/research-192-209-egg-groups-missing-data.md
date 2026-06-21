---
id: research-192-209-egg-groups-missing-data
type: RESEARCH
title: Investigate Missing Egg Groups Data for Breeding Algorithm
status: READY
owner_persona: researcher
created_at: '2026-06-18'
updated_at: '2026-06-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-084-192-breeding-pair-algorithm-impl
tags:
  - backend
  - data
  - breeding
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Missing Egg Groups Data for Breeding Algorithm

## Context
While implementing `task-084-192-breeding-pair-algorithm-impl`, it was discovered that `PokemonMetadata` inside `src/db/schema.ts` does not include `egg_groups`.
In addition, there isn't a known utility to compute Gen 2 Pokemon gender based on Attack DV and Gender Ratio.

## Objectives
- [x] Determine how to add Egg Groups to the DB schema (and update `scripts/generate-pokedata.ts`).
- [x] Determine how to calculate gender using DVs and Gender Ratio (`gr`).
- [x] Outline the necessary changes to supply this data to the Breeding Algorithm.


## Findings

### 1. DB Schema & ETL Updates for Egg Groups
To store egg groups compactly, we can define an `EGG_GROUP_MAP` enum in `src/db/schema.ts`:
```typescript
export const EGG_GROUP_MAP: Record<string, number> = {
  monster: 1, water1: 2, bug: 3, flying: 4, ground: 5, fairy: 6, plant: 7, humanshape: 8,
  water3: 9, mineral: 10, indeterminate: 11, water2: 12, ditto: 13, dragon: 14, 'no-eggs': 15,
};
```
Then, update `PokemonMetadata` to include `eg?: number[]`.
In `scripts/generate-pokedata.ts`, we need to parse the `egg_groups` array from the `pokemon-species` API response:
```typescript
const eggGroups = sData.egg_groups.map((eg: any) => EGG_GROUP_MAP[eg.name]).filter(Boolean);
if (eggGroups.length > 0) {
    pokemonData.eg = eggGroups;
}
```
This ensures the egg group data is properly extracted, transformed, and loaded into the optimized DB.

### 2. Calculating Gender from Gen 2 DVs
In PokeAPI, `gender_rate` represents the chance of a Pokémon being female in eighths (e.g., `1` = 1/8 Female, `4` = 1/2 Female). `0` means 100% Male, `8` means 100% Female, and `-1` means Genderless.
In Gen 2, gender is determined directly by comparing the Attack DV (0-15) to a threshold. The threshold is exactly `gender_rate * 2`.
If `Attack DV < threshold`, the Pokémon is Female. Otherwise, it is Male.

```typescript
function getGen2Gender(attackDV: number, genderRate: number): 'Male' | 'Female' | 'Genderless' {
    if (genderRate === -1) return 'Genderless';
    if (genderRate === 0) return 'Male';
    if (genderRate === 8) return 'Female';
    const femaleThreshold = genderRate * 2;
    return attackDV < femaleThreshold ? 'Female' : 'Male';
}
```

### 3. Supplying Data to the Breeding Algorithm
To integrate this into the Breeding Algorithm:
1. Ensure both parents have their `PokemonMetadata` loaded to access `eg` (Egg Groups) and `gr` (Gender Rate).
2. Calculate the gender of both parents using their Attack DVs (from their stats/save data) and the `getGen2Gender` utility.
3. Check compatibility:
   - If either Pokémon has the 'no-eggs' (15) egg group, they are incompatible.
   - If either is Ditto (13), they are compatible with any non-'no-eggs' Pokémon. (Note: Two Dittos cannot breed with each other in Gen 2).
   - If not Ditto, the two Pokémon must share at least one egg group (array intersection of `eg` > 0).
   - If they share an egg group, they must be opposite genders (one 'Male' and one 'Female').
