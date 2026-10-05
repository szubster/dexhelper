---
id: idea-533-gen3-daycare-iv-inheritance-calculator
type: IDEA
title: Gen 3 Daycare IV & Egg Inheritance Calculator
status: READY
owner_persona: product_manager
created_at: '2026-09-30'
updated_at: '2026-09-30'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: null
tags:
  - dexhelper
  - gen3
  - breeding
  - ivs
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Daycare IV & Egg Inheritance Calculator

## Problem Statement
In Generation 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen), breeding Pokémon for competitive IVs or specific stats is notoriously complex and opaque. When two Pokémon are deposited in the Daycare on Route 117 (or Four Island), the offspring inherits exactly 3 Individual Values (IVs) randomly chosen from either parent, while the remaining 3 IVs are generated purely at random (0-31).

Currently, players who import a `.sav` file into DexHelper can see the IVs of their Daycare Pokémon or PC Box Pokémon, but there is no utility that simulates or calculates:
1. Which exact IV stats (HP, Atk, Def, SpA, SpDef, Spe) can be passed down from the two deposited parents.
2. The exact probability distribution of offspring IVs and stat ranges (e.g. chance of inheriting 31 Atk and 31 Spe simultaneously).
3. Recommended breeding pairs from the user's PC Box / Daycare to maximize target IV distributions.

## Proposed Solution
Architect a dedicated **Gen 3 Daycare IV & Egg Inheritance Calculator** tab/utility in DexHelper:

1. **Active Daycare Detection**: Automatically read the deposited parent Pokémon from the save file's Daycare memory block (`SaveBlock1` Daycare structure) and pre-populate their IVs, Nature, and held items (e.g. Everstone for 50% Nature pass-down in Emerald).
2. **Inheritance Combinatorics Engine**: Simulate all 120 possible parent IV selection permutations (selecting 3 stats out of 6, and picking mother vs father for each) to compute exact probability charts for resulting offspring IVs.
3. **PC Box Pair Recommendation**: Allow users to select a target Pokémon species and desired minimum IVs, then scan all compatible breeding group pairs across the user's PC Boxes to highlight optimal parent combinations.

## Acceptance Criteria
- [ ] Draft PRD for the Gen 3 Daycare IV & Egg Inheritance Calculator.
- [ ] Define Daycare save memory parsing specs for Gen 3 parent IV extraction.
- [ ] Specify combinatorics model and UI representation for IV inheritance probabilities.
