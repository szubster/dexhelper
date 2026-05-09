🎯 **What:**
The tests for `gen2Exclusives.ts` were missing coverage for several scenarios, including already owned Pokémon, non-exclusive Pokémon in Crystal, and unknown version strings.

📊 **Coverage:**
The following scenarios are now tested:
- Not locking non-exclusive Pokémon in Crystal.
- Not locking an exclusive Pokémon if it is already in the `ownedSet`.
- Handling unknown versions (e.g., 'unknown', 'ruby') gracefully.

✨ **Result:**
100% statements, branches, and functions coverage is now achieved for `src/engine/exclusives/gen2Exclusives.ts`.
