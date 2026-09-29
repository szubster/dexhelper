# Gen 3 Wild Encounter & Held Item Data Structures

## Overview
This document tracks the memory structures, layout, and probabilities for wild encounters and wild held items in Generation 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

## Wild Encounter Layout (gWildMonHeaders)
Wild encounters in Gen 3 are structured into Map Headers (`gWildMonHeaders`). Each Map Header points to four distinct wild encounter tables based on the interaction type.

Each interaction type has its own set of encounter slots and probabilities.

### Interaction Types & Slot Probabilities

1. **Land Mons (Grass / Cave / etc.)**
   * Total Slots: 12
   * Probabilities (out of 100%): 20%, 20%, 10%, 10%, 10%, 10%, 5%, 5%, 4%, 4%, 1%, 1%

2. **Water Mons (Surfing)**
   * Total Slots: 5
   * Probabilities (out of 100%): 60%, 30%, 5%, 4%, 1%

3. **Rock Smash Mons**
   * Total Slots: 5
   * Probabilities (out of 100%): 60%, 30%, 5%, 4%, 1%

4. **Fishing Mons**
   * Total Slots: 10
   * Probabilities (out of 100%): 70%, 30%, 60%, 20%, 20%, 40%, 40%, 15%, 4%, 1%
   * *Note:* Fishing slots are grouped by rod type (Old Rod: slots 0-1, Good Rod: slots 2-4, Super Rod: slots 5-9).

## Wild Held Item Mechanics
When a wild Pokémon is generated, its potential to hold an item is determined by two fields defined in its `SpeciesInfo` structure:
* `itemCommon` (Offset `0x0C` in `SpeciesInfo`)
* `itemRare` (Offset `0x0E` in `SpeciesInfo`)

Both fields are 16-bit integers (`u16`).

### Base Probabilities
* **No Item:** 50% chance
* **Common Item (`itemCommon`):** 45% chance (actually evaluated as `rnd >= 45 && rnd < 95`, meaning 50% chance out of the remaining 55%)
* **Rare Item (`itemRare`):** 5% chance (evaluated as `rnd >= 95`)
* *Note: If `itemCommon` and `itemRare` are identical (and not `ITEM_NONE`), the Pokémon has a 100% chance to hold that item.*

### Compound Eyes Ability Effect
If the lead Pokémon in the player's party has the ability **Compound Eyes** (and is not an Egg), the probabilities are heavily modified in favor of the player:
* **No Item:** 20% chance
* **Common Item (`itemCommon`):** 60% chance (evaluated as `rnd >= 20 && rnd < 80`)
* **Rare Item (`itemRare`):** 20% chance (evaluated as `rnd >= 80`)

## Held Item Data Structure (PokemonSubstruct0)
When a Pokémon is caught or interacted with, its held item is stored within the **Growth (G)** substructure (Substruct0) of the encrypted 48-byte Data block.

* **Species:** `u16` (Bytes 0-1)
* **Held Item:** `u16` (Bytes 2-3)
* **Experience:** `u32` (Bytes 4-7)
* **PP Bonuses:** `u8` (Byte 8)
* **Friendship:** `u8` (Byte 9)
* **Filler:** `u16` (Bytes 10-11)

To extract the held item, the Growth (G) substructure must be located using the `PV % 24` permutation map and decrypted.
