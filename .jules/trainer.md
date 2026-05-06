## 2024-03-31 - Assistant Evolution Item Suggestion
**Learning:** The item evolution check was verifying if an evolution stone existed in `saveData.inventory`, but was not checking its `quantity`. This could cause false "Ready to Evolve" suggestions if the save parser left 0-quantity items in the inventory array.
**Action:** Always check `quantity > 0` when verifying player items in `saveData.inventory`.
## 2024-04-22 - Assistant Trade Evolution Held Item Support
**Learning:** The Trade evolution logic (`EVO_TRIGGER.TRADE`) was missing support for checking if a required `held` item was in the player's inventory, which is crucial for Gen 2 evolutions like Onix to Steelix.
**Action:** Always check the `detail.held` property for Trade evolutions and verify the player has it in their `saveData.inventory`.

- Learned: Gen 1 saves track completed in-game NPC trades using a bitfield at `0x29e6` (with `eventFlagsOffset - 16` logic in `saveParser`), exposing `npcTradeFlags` in the parsed state. It's crucial to mask this against the specific `tradeIndex` found in static data to prevent suggesting trades the user has already completed.

### Evolution Recommendation Logic Improvement

- **Algorithm Limitation**: The `suggestionEngine` previously only checked the *first* evolution detail (`p.det?.[0]`) when evaluating evolution paths. This failed to handle Pokémon with multiple valid evolution details for the same target species (e.g., when a species has multiple valid evolution stones or items).
- **Solution**: The engine now iterates through the entire `p.det` array. For each evolution detail found, it independently evaluates the trigger (e.g., level up, item usage) and generates a corresponding suggestion. To ensure suggestions remain distinct, item IDs are now appended to the suggestion's `id` string (e.g., `evo-item-${targetId}-${item}`).
## 2024-04-29 - Tyrogue Relative Physical Stats Evolution
**Learning:** Tyrogue evolves at level 20 into Hitmonlee, Hitmonchan, or Hitmontop depending on its Relative Physical Stats (`rps`). The `rps` is calculated as Atk > Def (1), Atk < Def (-1), or Atk = Def (0). We do not have access to PC boxed Pokémon's exact stats, but adding general instructions about these requirements significantly improves assistant suggestion quality.
**Action:** Extract `detail.rps` when iterating over `p.det` during evolution suggestion generation. Map `rps` values to human-readable strings (e.g., `, Atk > Def`) and append them to the specific level requirement string.
## 2024-05-15 - Assistant Happiness Evolution Suggestion
**Learning:** For happiness-based evolutions (`min_h`), the assistant previously only displayed a generic "Level up with high happiness to evolve" message without showing the actual friendship progress. The save data `PokemonInstance` actually provides the `friendship` stat.
**Action:** Always check if `bestInstance.friendship` is defined for `min_h` evolutions. If it is >= `min_h`, update the priority to 90 and dynamically tell the user it is "Ready to Evolve!". Otherwise, display the current vs required friendship `(current/required)` to give the user a clear progression indicator.
## 2024-05-18 - Assistant Daycare Egg Suggestion
**Learning:** The Gen 2 Daycare breeding logic previously suggested "Leave your Pokémon at the Daycare to get an Egg!" even if the required Pokémon was already in the daycare, or if an egg was already waiting. We can extract `daycare` and `daycareHasEgg` from the parsed `SaveData`.
**Action:** When evaluating `EVO_TRIGGER.BREED` (or general breeding recommendations), always check if `saveData.daycare` contains the needed species. If it does, and `saveData.daycareHasEgg` is true, suggest picking up the egg with a higher priority (95). If it is in the daycare but no egg is ready, tell the user to wait.
## 2026-05-06 - Trade Evolution Held Item Equipped Support
**Learning:** For Trade evolutions requiring a held item, the item could already be equipped on the Pokemon instead of being in the bag. The assistant was incorrectly suggesting to find the item if it was only equipped and not in the bag.
**Action:** Modified `EVO_TRIGGER.TRADE` logic to search `evolvableInstances` and `ownedInstances` for the specific item and dynamically update the suggestion if the pre-evolution is already holding it.
