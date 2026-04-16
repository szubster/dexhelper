## 2026-04-12 - [O(N) Operations inside loop]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the queryTargets loop repeatedly creates new arrays for every missing Pokemon. This causes O(N*M) complexity.
**Action:** Process `allInstances` outside the loop into a Map to achieve O(1) lookups.

## 2024-05-15 - [React.memo in large lists]
**Learning:** Re-evaluating filtered datasets like `finalPokemon` triggers parent grid re-renders. For large lists like Gen 2 (up to 251 items), missing `React.memo` on list item components (`PokedexCard`) forces all children to re-render despite stable props.
**Action:** Use `React.memo` to wrap item components inside list grids to decouple child rendering from parent dataset recalculations.
## 2025-05-18 - Fix N+1 Query by Leveraging In-Memory Map
**Learning:** When addressing N+1 query issues with local IndexedDB stores, utilizing batched queries (`Promise.all` over DB fetches) is better, but leveraging data already returned in memory from previous overarching `getAll` calls reduces redundant DB reads to entirely synchronous operations with 0.03ms overhead vs 7ms.
**Action:** Always inspect the schema and return shapes of existing `getAll` or collection queries to determine if the needed associated IDs/Counts are already populated before making separate fetch requests.
