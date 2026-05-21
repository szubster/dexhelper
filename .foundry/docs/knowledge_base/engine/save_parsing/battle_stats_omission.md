# Battle Stats Omission in PC Storage (Gen 1 & 2)

## Overview
In Generation 1 and Generation 2 Pokémon games, the save file data structures for Pokémon differ significantly depending on whether the Pokémon is currently in the player's active Party or deposited in a PC Box. This distinction has profound implications for auxiliary tools, such as the Nuzlocke Tracker.

## Data Structures
- **Party Pokémon**: The data structure is larger (44 bytes for Gen 1, 48 bytes for Gen 2) and includes current battle stats, notably the Pokémon's current HP.
- **PC Pokémon**: The data structure is smaller (33 bytes for Gen 1, 32 bytes for Gen 2) and completely omits current battle stats.

## The "Healing" Effect
Because current battle stats are not stored for deposited Pokémon, any Pokémon placed into the PC loses its current HP value. When the Pokémon is subsequently withdrawn from the PC, the game recalculates its stats from base values, Determinant Values (DVs), and Stat Experience (Stat Exp). As a direct result, the Pokémon is fully restored to maximum health (and all status conditions are cleared).

## Impact on Nuzlocke Tracking
It is **impossible** to determine if a deposited Pokémon is "dead" (fainted) by reading a "0 HP" value from the save file. Once a fainted Pokémon is deposited into the PC, the save file effectively considers it fully healed.

Therefore, any logic that attempts to track permanently dead Pokémon (such as a Graveyard feature) **must not** rely on the `currentHP` field. Instead, the logic must rely exclusively on the Pokémon's `storageLocation` (e.g., matching the location against a user-designated "Graveyard" Box string).
