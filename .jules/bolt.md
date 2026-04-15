## 2026-04-12 - [O(N) Operations inside loop]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the queryTargets loop repeatedly creates new arrays for every missing Pokemon. This causes O(N*M) complexity.
**Action:** Process `allInstances` outside the loop into a Map to achieve O(1) lookups.

## 2024-05-15 - [React.memo in large lists]
**Learning:** Re-evaluating filtered datasets like `finalPokemon` triggers parent grid re-renders. For large lists like Gen 2 (up to 251 items), missing `React.memo` on list item components (`PokedexCard`) forces all children to re-render despite stable props.
**Action:** Use `React.memo` to wrap item components inside list grids to decouple child rendering from parent dataset recalculations.

## 2024-05-18 - [Optimizing Concurrent API Calls with local memoization]
**Learning:** In suggestionEngine.ts, mapping concurrent fetches directly inside a large loop via `Promise.all` created significant scheduling overhead. It fetched identical API chains (like the Bulbasaur/Ivysaur/Venusaur evolution chain) repeatedly because there was no shared cache during the Promise loop generation.
**Action:** Implemented a local `Map<string, Promise<any>>` to wrap and cache the outgoing fetch promises. This locally deduplicates concurrent network requests, eliminating redundant fetch executions during parallel data loading.
