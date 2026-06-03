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

## 2026-05-08 - Assistant Evolve Fallback
**Learning:** The evolution suggestion logic completely ignored standard level-up evolutions if they lacked both `min_l` (minimum level) and `min_h` (minimum happiness) in the offline data, causing Pokémon like Espeon/Umbreon (which only had `time` defined) to have no suggestions.
**Action:** Added a fallback suggestion in the `EVO_TRIGGER.LEVEL_UP` block to recommend a generic level-up (incorporating Time of Day if present) when neither `min_l` nor `min_h` exist.
## 2026-05-06 - Trade Evolution Held Item Equipped Support
**Learning:** For Trade evolutions requiring a held item, the item could already be equipped on the Pokemon instead of being in the bag. The assistant was incorrectly suggesting to find the item if it was only equipped and not in the bag.
**Action:** Modified `EVO_TRIGGER.TRADE` logic to search `evolvableInstances` and `ownedInstances` for the specific item and dynamically update the suggestion if the pre-evolution is already holding it.
## 2024-05-19 - Assistant Recursive Evolution Suggestion
**Learning:** For multi-stage evolutions (e.g., Charmander -> Charmeleon -> Charizard), if a player had a missing target of the stage 2 evolution (Charizard), owned the dex entry for stage 1 (Charmeleon), but physically only possessed the base stage (Charmander), the assistant would fail to suggest any evolution because it only looked at the immediate parent (`p.efrm[0]`).
**Action:** Modified `generateEvolutionAndBreedingSuggestions` in `suggestionEngine.ts` to iterate backwards through the entire `p.efrm` ancestor array. It now finds the *closest* ancestor the player physically possesses and correctly determines the *immediate next stage* in the evolutionary line as the target for the suggestion (e.g., suggesting to evolve Charmander -> Charmeleon to progress towards Charizard).
## 2026-05-12 - Assistant Recursive Unobtainable Pre-Evolution
**Learning:** The suggestion engine correctly checked if a user physically possessed a pre-evolution before warning them that a Pokemon was a "Version Exclusive" (requiring a trade). However, it only checked the immediate parent (`p.efrm.some`), meaning if the user owned a `Charmander` but was missing a `Charizard`, it might incorrectly suggest trading for `Charizard` instead of recognizing it can be evolved up the line.
**Action:** Changed the `hasPhysicalPreEvo` check to iterate through all ancestors in the `p.efrm` array to ensure deep pre-evolutions properly suppress version exclusive warnings.
## 2024-05-19 - Assistant Daycare Breeding Partner Requirement
**Learning:** Gen 2 breeding suggestions previously suggested "Leave your #evolutionIdToBreed at the Daycare to get an Egg!" even if the player already had the Pokémon in the Daycare but it was alone, which incorrectly suggested to the user that breeding was in progress or ready. We need to explicitly check if `saveData.daycare.length === 2` to determine if breeding is actually occurring.
**Action:** When evaluating `EVO_TRIGGER.BREED` (or general breeding recommendations), check `isInDaycare`. If true and `length === 1`, suggest "Need Partner" and advise leaving a compatible partner (like Ditto). If false, explicitly advise leaving the target AND a compatible partner.
## 2024-05-20 - Multi-stage Evolution Deduplication
**Learning:** The suggestion engine previously generated redundant suggestions for multi-stage evolutions if multiple subsequent stages were missing (e.g., both Charmeleon and Charizard missing from Pokedex would generate two "Evolve Charmander" suggestions).
**Action:** When iterating over , skip generation if  AND the intermediate  is also present in . This allows the engine to naturally generate a single "Path to" suggestion for the intermediate stage without flooding the UI.
## 2024-05-20 - Intermediate Evolution Suggestion Clarity
**Learning:** For multi-stage evolutions where an intermediate stage is required (e.g. "Path to #Charizard" needing a Charmeleon), the previous title ("Level Up Evolution") and description were misleading, implying the immediate evolution would yield the final target.
**Action:** Dynamically rewrite the title (e.g., `Path to #${targetId}`) and description (e.g., `into #${immediateEvoTargetId} to progress towards #${targetId}`) when  to clarify the intermediate progression step.
## 2024-05-20 - Multi-stage Evolution Deduplication
**Learning:** The suggestion engine previously generated redundant suggestions for multi-stage evolutions if multiple subsequent stages were missing (e.g., both Charmeleon and Charizard missing from Pokedex would generate two "Evolve Charmander" suggestions).
**Action:** When iterating over `immediateEvoTarget.det`, skip generation if `immediateEvoTargetId !== targetId` AND the intermediate `immediateEvoTargetId` is also present in `missingIds`. This allows the engine to naturally generate a single "Path to" suggestion for the intermediate stage without flooding the UI.
## 2024-05-20 - Intermediate Evolution Suggestion Clarity
**Learning:** For multi-stage evolutions where an intermediate stage is required (e.g. "Path to #Charizard" needing a Charmeleon), the previous title ("Level Up Evolution") and description were misleading, implying the immediate evolution would yield the final target.
**Action:** Dynamically rewrite the title (e.g., `Path to #${targetId}`) and description (e.g., `into #${immediateEvoTargetId} to progress towards #${targetId}`) when `immediateEvoTargetId !== targetId` to clarify the intermediate progression step.
## 2024-05-21 - Breeding Intermediate Evolution Suggestion Fix
**Learning:** In Pokémon Gen 2, eggs always hatch into the lowest evolutionary stage. The assistant's `generateBreedingSuggestions` previously suggested breeding intermediate evolutions (like Charizard) to obtain other intermediate evolutions (like Charmeleon), which is mechanically impossible.
**Action:** Update the breeding logic to verify that the target Pokémon is actually a base or baby stage (by checking `p.efrm === undefined || p.efrm.length === 0`) before evaluating its ancestors for breeding suggestions.
## 2024-05-22 - Assistant PC Item Checking
**Learning:** The suggestion engine previously only checked the player's active `inventory` for items (like evolution stones, trade held items, rods, and TMs). However, Gen 1 and Gen 2 games allow players to store up to 50 items in the PC. If a required item was stored in the PC, the assistant would incorrectly suggest the player still needed to find one.
**Action:** Updated both Gen 1 and Gen 2 save parsers to extract `pcItems`. The suggestion engine (`EVO_TRIGGER.USE_ITEM`, `EVO_TRIGGER.TRADE`, etc.) now safely checks `saveData.pcItems` alongside `saveData.inventory` using optional chaining (`?.`) and nullish coalescing (`?? false`).
## 2026-05-20 - Fishing Rod Encounter Prerequisite Check
**Learning:** The suggestion engine was correctly returning fishing encounters (`old-rod`, `good-rod`, `super-rod`), but it was not verifying if the player actually possessed the required fishing rod in their inventory or PC. This resulted in the assistant improperly suggesting a player should fish for a Pokémon even if they hadn't obtained the item yet.
**Action:** Implemented a verification check in `generateCatchSuggestions` (specifically the post-processing filter) to verify the player possesses the corresponding rod (from `genConfig.rodIds`) in their `inventory` or `pcItems` before suggesting encounters tied to fishing methods.
