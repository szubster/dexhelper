# Trainer Journal

---

# Learnings
- **Save Block Offsets:** Gen 3 Match Call system involves two separate logical chunks. The main array tracking the `rematchState` (which team tier they have reached) lives in `SaveBlock1` (Section 1). However, the boolean flags that dictate whether a trainer is "registered" or unlocked entirely live deep inside the `flags` array inside `SaveBlock2` (Section 2).
- **Safety First:** Ensuring robust bit-shifting and `RangeError` safety blocks within Gen 3 parsing ensures the app continues running for corrupted or non-Emerald files.
- **Diff Checker Oddity:** The automated review tool might flag a newly created test or parser file as invalid if they import from a pre-existing sibling file (e.g. `offsets.ts`) that is *not* included in the diff. To fix this, making a trivial whitespace modification to the pre-existing file forces it into the diff, allowing the automated code review tool to see it.

---

# Session Learnings

- Gen 3 Baby Pokémon (Azurill, Wynaut) require the parent to hold a specific Incense item (Sea Incense, Lax Incense respectively) to hatch from an egg. Without the item, the egg hatches into the base form (Marill, Wobbuffet). The `generateBreedingSuggestions` logic was updated to append these requirements to the generated description text for target IDs 298 and 360 to ensure accurate offline recommendations.

---

# Learnings

When identifying linear vs branching evolutions for one-time Pokémon (like Gen 1 Starters vs Eevee), you must be careful not to apply array length checks globally. Branching evolutions like Eevee have all their target IDs in the same `evos` array (e.g., `[134, 135, 136]`). A linear chain (e.g. `[2, 3]`) requires checking if you own a stage *after* the intermediate stage but *not* the base stage. Ensure explicit bounds/ID checks (e.g. `base !== 133`) are used to isolate logic between branched and linear paths so as not to break existing branching logic when improving linear logic.

When fixing Assistant Logic related to branching vs linear evolutions, ensure the difference is accounted for using array length or similar logic. Specifically, do not assume `evos.some(...)` works perfectly for linear evolutions because the `evos` array contains BOTH the next stage and final stage, thus the next stage is correctly interpreted as a "different" form if not handled correctly.

---

# Learnings
- **Mutually Exclusive Logic & Yellow Exception:** When improving inference for mutually exclusive one-time choices (like the Gen 1 Starter choice), we must explicitly exclude Pokémon Yellow from this check. In Yellow, the player receives Pikachu as their starter, but can subsequently obtain all three original Kanto starters (Bulbasaur, Charmander, and Squirtle) through in-game NPC gifts. Applying strict exclusivity logic globally would incorrectly lock these valid acquisition paths for Yellow players.

---

# Learnings
- **Recommendation Logic:** In Gen 2/3, if a player needs a version exclusive Pokémon (e.g., Meowth in Gold) and they already possess an evolved form (e.g., Persian), they can breed it. Previously, the `tradeGenerator.ts` would suggest "Must trade for Meowth" because it only checked `hasPhysicalPreEvo`. Now, we explicitly check `hasPhysicalPostEvoToBreed` by traversing the evolution tree forwards (`eto`) to see if the player physically owns an evolved form that can be bred down.
- **Generator Interactions:** Because generators run sequentially and push to the same array without knowing about each other, `tradeGenerator` was creating an `exclusive-52` suggestion while `breedGenerator` was correctly creating a `breed-52` suggestion. Since the deduplication at the end groups by `id`, both were shown to the user (with conflicting advice). Adding a breeding verification directly in the trade logic resolves this.
- **Save File Parsing:** By accessing `p?.eto` from `pokemonMetadata` and traversing it dynamically with a stack, we can safely discover all post-evolution branches without recursive function depth limits.

---

# Learnings
- **Abstraction and Unification:** When porting a feature previously only supporting Gen 2 (like Daycare breeding logic in `generateBreedingSuggestions`) to Gen 3, it's essential to abstract the data structures (`daycareMons`, `daycareHasEgg`) so that the core evaluation logic can be unified without nesting complex `if (isGen2)` vs `if (isGen3)` logic inside hot loops. We achieved this by flattening the daycare evaluation array beforehand using `const daycareMons = gen2Data?.daycare || gen3Data?.gen3Daycare?.mons || [];`.

---

# Learnings
- **Daycare Instance Extraction:** In Gen 2 (`saveData.daycare`) and Gen 3 (`saveData.gen3Daycare?.mons`), Daycare Pokémon are stored separately from `partyDetails` and `pcDetails`. By updating `extractAllInstances` in `src/engine/breeding/inventoryTools.ts` to include Daycare Pokémon, all assistant recommendation generators (evolutions, trades, breeding, OT tracking, and HM/utility tools) automatically account for Pokémon stored in the Daycare.
- **Clear UI Indicators:** When generating evolution suggestions for pre-evolutions stored in the Daycare, appending `(in Daycare)` to the pre-evolution label in suggestion descriptions provides explicit clarity to the user on where their candidate Pokémon is located.

---

# Learnings
- **Evolution Recommendation Priorities:** When evaluating trade evolutions that require held items (e.g., Seadra -> Kingdra with Dragon Scale, Clamperl -> Gorebyss with DeepSeaScale), if the player already possesses the required item in their inventory or equipped on a Pokémon, the recommendation priority should be boosted to `95` (matching Stone/Use Item evolutions). This ensures immediately actionable trade evolutions are prioritized over level-up evolutions (`90`) or missing-item trade evolutions (`45`).


---

# Trainer Session Journal - 2026-10-04

## Trade Evolution Held Item Verification
- **Context:** Trade evolutions requiring held items (such as Seadra -> Kingdra via Dragon Scale, or Clamperl -> Gorebyss via DeepSeaScale) rely on evaluating whether the player has the item in their bag/PC OR if one of their owned Pokémon/pre-evolutions is holding it.
- **Verification & Priority:** When a pre-evolution is already holding the required trade evolution item, `generateEvolutionSuggestions` sets the recommendation priority to `95` (matching stone evolution priority) and generates a tailored description (`Your pre-evolution is already holding the [Item]! Trade it to evolve!`). Unit tests in `src/engine/assistant/generators/__tests__/evolutionGenerator.test.ts` verify this high-priority suggestion flow.

---

# Learnings

- **Gen 3 Feebas -> Milotic Evolution:** In Generation 3, Feebas (#349) evolves into Milotic (#350) by maximizing its Beauty condition using Dry Pokéblocks (crafted from Chesto, Wiki, or Pamtre Berries) and leveling it up once. The `evolutionGenerator.ts` module was updated to handle missing evolution details gracefully (`tr` trigger inference) and provide specific offline advice for Feebas -> Milotic evolution in Gen 3.

---

# Learnings

- **Gen 3 Wurmple Evolution Branch Prediction**: In Generation 3, Wurmple (#265) evolution is non-deterministic at runtime unless calculating its 32-bit personality value (`personalityValue`). Specifically, `(personalityValue >>> 16) % 10 < 5` predicts evolution into Silcoon (#266) / Beautifly (#267), whereas `>= 5` predicts Cascoon (#268) / Dustox (#269).
- **Multi-Instance Branch Evaluation**: When evaluating branch evolutions for species with PID-dependent paths (like Wurmple), if `bestInstance` (e.g. highest level instance) does not match the target evolution branch requested by the user, the assistant logic must search all owned instances for a `targetWurmple` that DOES match the branch before falling back to recommending catching a new instance.