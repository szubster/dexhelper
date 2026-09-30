# Gen 2 Wild Encounter & Held Item Data

## Held Item Drop Rates
In Generation 2 (Crystal/Gold/Silver), when encountering a wild Pokémon, the logic for held items is based on the Pokémon's base data (`wBaseItem1` and `wBaseItem2`).

The effective drop rates are:
- **None**: 75%
- **Item 1 (Common)**: 23%
- **Item 2 (Rare)**: 2%

There is a 25% chance of getting any item. If successful, there is an 8% chance to get Item 2 (8% of 25% = 2%). Otherwise, you get Item 1.

*Reference: pokecrystal engine/battle/core.asm*

## Wild Encounter Slot Probabilities

Gen 2 has two main encounter tables: **Grass** (7 slots) and **Water** (3 slots).

### Grass Encounter Probabilities
The GrassMonProbTable defines 7 slots with the following probabilities:
- **Slot 1 (Index 0)**: 30%
- **Slot 2 (Index 1)**: 30%
- **Slot 3 (Index 2)**: 20%
- **Slot 4 (Index 3)**: 10%
- **Slot 5 (Index 4)**: 5%
- **Slot 6 (Index 5)**: 4%
- **Slot 7 (Index 6)**: 1%

### Water Encounter Probabilities
The WaterMonProbTable defines 3 slots with the following probabilities:
- **Slot 1 (Index 0)**: 60%
- **Slot 2 (Index 1)**: 30%
- **Slot 3 (Index 2)**: 10%

*Reference: pokecrystal data/wild/probabilities.asm*

## Map Encounter Rates
The encounter rates are loaded into memory when loading wild mon data:
- `wMornEncounterRate`
- `wDayEncounterRate`
- `wNiteEncounterRate`
- `wWaterEncounterRate`

Encounter rates are modified by:
- **Music (Pokemon March / Ruins of Alph)**: Doubles the rate
- **Music (Pokemon Lullaby)**: Halves the rate

*Reference: pokecrystal engine/overworld/wildmons.asm*
