## 2026-04-12 - [O(N) Operations inside loop]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the queryTargets loop repeatedly creates new arrays for every missing Pokemon. This causes O(N*M) complexity.
**Action:** Process `allInstances` outside the loop into a Map to achieve O(1) lookups.

## 2024-05-15 - [React.memo in large lists]
**Learning:** Re-evaluating filtered datasets like `finalPokemon` triggers parent grid re-renders. For large lists like Gen 2 (up to 251 items), missing `React.memo` on list item components (`PokedexCard`) forces all children to re-render despite stable props.
**Action:** Use `React.memo` to wrap item components inside list grids to decouple child rendering from parent dataset recalculations.
## 2024-05-15 - Optimize IndexedDB Multiple Gets
**Learning:** Using `Promise.all` with individual `db.get` calls opens a new transaction for each call. For stores with manageable sizes (e.g., <2000 items), performing a single `db.getAll()` and then filtering the results in memory is significantly faster than launching hundreds of separate transaction queries.
**Action:** When fetching multiple items by ID from an IndexedDB store, analyze the store size. If the store is small, prefer loading everything with `db.getAll()` into memory, then filtering by `Set.has(id)` over `Promise.all` + `db.get`.
