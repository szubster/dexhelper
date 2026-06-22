# Gen 2 Breeding Mechanics

## Gender and Attack DVs
In Pokémon Gold, Silver, and Crystal (Gen 2), a Pokémon's gender is intrinsically linked to its Attack Determinant Value (DV, ranging from 0-15).

PokeAPI provides a `gender_rate` value for each Pokémon species, which represents the chance of the Pokémon being female in eighths (e.g., `1` means 1/8 Female, `4` means 1/2 Female).
- `0` means 100% Male
- `8` means 100% Female
- `-1` means Genderless

The female Attack DV threshold in Gen 2 is simply `gender_rate * 2`. A Pokémon is female if its Attack DV is strictly less than this threshold.

### Formula
```typescript
function getGen2Gender(attackDV: number, genderRate: number): 'Male' | 'Female' | 'Genderless' {
    if (genderRate === -1) return 'Genderless';
    if (genderRate === 0) return 'Male';
    if (genderRate === 8) return 'Female';
    const femaleThreshold = genderRate * 2;
    return attackDV < femaleThreshold ? 'Female' : 'Male';
}
```

This mechanical constraint means that female Pokémon of species with a low female ratio (like Starters, which have `gender_rate = 1`) can never have a high Attack DV.

## Egg Groups
When determining if two Pokémon can breed:
- If either Pokémon has the 'no-eggs' (15) egg group, they are incompatible.
- If either is Ditto (13), they are compatible with any non-'no-eggs' Pokémon. (Note: Two Dittos cannot breed with each other).
- If neither is Ditto, the two Pokémon must share at least one egg group and must be of opposite genders.
