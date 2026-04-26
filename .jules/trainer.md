## 2024-03-31 - Assistant Evolution Item Suggestion
**Learning:** The item evolution check was verifying if an evolution stone existed in `saveData.inventory`, but was not checking its `quantity`. This could cause false "Ready to Evolve" suggestions if the save parser left 0-quantity items in the inventory array.
**Action:** Always check `quantity > 0` when verifying player items in `saveData.inventory`.
## 2024-04-22 - Assistant Trade Evolution Held Item Support
**Learning:** The Trade evolution logic (`EVO_TRIGGER.TRADE`) was missing support for checking if a required `held` item was in the player's inventory, which is crucial for Gen 2 evolutions like Onix to Steelix.
**Action:** Always check the `detail.held` property for Trade evolutions and verify the player has it in their `saveData.inventory`.

- Learned: Gen 1 saves track completed in-game NPC trades using a bitfield at `0x29e6` (with `eventFlagsOffset - 16` logic in `saveParser`), exposing `npcTradeFlags` in the parsed state. It's crucial to mask this against the specific `tradeIndex` found in static data to prevent suggesting trades the user has already completed.

## 2024-05-15 - Assistant Daycare Support
**Learning:** The suggestion engine was ignoring Pokémon stored in the Daycare (`saveData.daycare`) when checking if a player owned a pre-evolution.
**Action:** Include `saveData.daycare` in `allInstances` and `ownedSet` (for Living Dex mode) so the assistant can suggest evolving Daycare Pokémon.
