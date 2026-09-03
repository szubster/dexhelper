# Session Details
- Date: $(date)
- Focus: Implemented Gen 3 Match Call support for Emerald.

# Learnings
- **Save Block Offsets:** Gen 3 Match Call system involves two separate logical chunks. The main array tracking the `rematchState` (which team tier they have reached) lives in `SaveBlock1` (Section 1). However, the boolean flags that dictate whether a trainer is "registered" or unlocked entirely live deep inside the `flags` array inside `SaveBlock2` (Section 2).
- **Safety First:** Ensuring robust bit-shifting and `RangeError` safety blocks within Gen 3 parsing ensures the app continues running for corrupted or non-Emerald files.
- **Diff Checker Oddity:** The automated review tool might flag a newly created test or parser file as invalid if they import from a pre-existing sibling file (e.g. `offsets.ts`) that is *not* included in the diff. To fix this, making a trivial whitespace modification to the pre-existing file forces it into the diff, allowing the automated code review tool to see it.

# Session Learnings

- Gen 3 Baby Pokémon (Azurill, Wynaut) require the parent to hold a specific Incense item (Sea Incense, Lax Incense respectively) to hatch from an egg. Without the item, the egg hatches into the base form (Marill, Wobbuffet). The `generateBreedingSuggestions` logic was updated to append these requirements to the generated description text for target IDs 298 and 360 to ensure accurate offline recommendations.


- Date: $(date)
- Focus: Implemented Gen 3 Match Call support for Emerald.

# Learnings
- **Save Block Offsets:** Gen 3 Match Call system involves two separate logical chunks. The main array tracking the `rematchState` (which team tier they have reached) lives in `SaveBlock1` (Section 1). However, the boolean flags that dictate whether a trainer is "registered" or unlocked entirely live deep inside the `flags` array inside `SaveBlock2` (Section 2).
- **Safety First:** Ensuring robust bit-shifting and `RangeError` safety blocks within Gen 3 parsing ensures the app continues running for corrupted or non-Emerald files.
- **Diff Checker Oddity:** The automated review tool might flag a newly created test or parser file as invalid if they import from a pre-existing sibling file (e.g. `offsets.ts`) that is *not* included in the diff. To fix this, making a trivial whitespace modification to the pre-existing file forces it into the diff, allowing the automated code review tool to see it.

When identifying linear vs branching evolutions for one-time Pokémon (like Gen 1 Starters vs Eevee), you must be careful not to apply array length checks globally. Branching evolutions like Eevee have all their target IDs in the same \`evos\` array (e.g., \`[134, 135, 136]\`). A linear chain (e.g. \`[2, 3]\`) requires checking if you own a stage *after* the intermediate stage but *not* the base stage. Ensure explicit bounds/ID checks (e.g. \`base !== 133\`) are used to isolate logic between branched and linear paths so as not to break existing branching logic when improving linear logic.

When fixing Assistant Logic related to branching vs linear evolutions, ensure the difference is accounted for using array length or similar logic. Specifically, do not assume `evos.some(...)` works perfectly for linear evolutions because the `evos` array contains BOTH the next stage and final stage, thus the next stage is correctly interpreted as a "different" form if not handled correctly.

- Date: $(date)
- Focus: Improved Assistant logic for Gen 1 mutually exclusive starters.

# Learnings
- **Mutually Exclusive Logic & Yellow Exception:** When improving inference for mutually exclusive one-time choices (like the Gen 1 Starter choice), we must explicitly exclude Pokémon Yellow from this check. In Yellow, the player receives Pikachu as their starter, but can subsequently obtain all three original Kanto starters (Bulbasaur, Charmander, and Squirtle) through in-game NPC gifts. Applying strict exclusivity logic globally would incorrectly lock these valid acquisition paths for Yellow players.
