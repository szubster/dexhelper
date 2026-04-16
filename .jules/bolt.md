## 2026-04-12 - [O(N) Operations inside loop]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the queryTargets loop repeatedly creates new arrays for every missing Pokemon. This causes O(N*M) complexity.
**Action:** Process `allInstances` outside the loop into a Map to achieve O(1) lookups.

## 2024-05-15 - [React.memo in large lists]
**Learning:** Re-evaluating filtered datasets like `finalPokemon` triggers parent grid re-renders. For large lists like Gen 2 (up to 251 items), missing `React.memo` on list item components (`PokedexCard`) forces all children to re-render despite stable props.
**Action:** Use `React.memo` to wrap item components inside list grids to decouple child rendering from parent dataset recalculations.

## 2024-05-18 - [Cache redundant BFS traversals]
**Learning:** In `generateSuggestions`, the assistant evaluates map distances for nearby encounters. Because it loops over missing Pokémon and their encounters independently, `strategy.getMapDistance` (which runs a BFS traversal from the current map to the target map) was called repeatedly for the *same* target map ID.
**Action:** Since the player's current location is constant during a suggestion generation cycle, instantiate a local Map (`distanceCache`) before the loops to cache the BFS distance calculation keyed by `e.aid`. This turns O(N*M) redundant graph searches into O(K) where K is the number of unique target areas.
