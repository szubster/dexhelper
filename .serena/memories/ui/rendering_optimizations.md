# UI Rendering Optimizations (Bolt)

A log of critical performance improvements made to the Dexhelper interface to ensure smooth interactions with 150+ items in the viewport.

## 1. PokedexGrid "Bolt" Optimizations
- **Redundant Set Removal**: Deleted `shinyPartySet` and `shinyPcSet` which were performing O(N) operations on every render.
- **Species-level Memoization**: The `shinySpeciesIds` set is now calculated once per `saveData` change using `useMemo`, allowing individual cards to perform an O(1) lookup.
- **Filtering Logic**: Moved filter evaluation into a single `useMemo` block that uses pre-calculated `partySet` and `pcSet` to minimize work during search/filter interactions.

## 2. StorageGrid Efficiency
- Avoids re-rendering the entire grid when only a single Pokémon's details change by isolating state subscriptions.
- Uses Tailwind v4 standard tokens to minimize style recalculation overhead.
