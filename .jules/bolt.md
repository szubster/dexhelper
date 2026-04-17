## 2026-04-12 - [O(N) Operations inside loop]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the queryTargets loop repeatedly creates new arrays for every missing Pokemon. This causes O(N*M) complexity.
**Action:** Process `allInstances` outside the loop into a Map to achieve O(1) lookups.

## 2024-05-15 - [React.memo in large lists]
**Learning:** Re-evaluating filtered datasets like `finalPokemon` triggers parent grid re-renders. For large lists like Gen 2 (up to 251 items), missing `React.memo` on list item components (`PokedexCard`) forces all children to re-render despite stable props.
**Action:** Use `React.memo` to wrap item components inside list grids to decouple child rendering from parent dataset recalculations.
## 2024-05-15 - Optimize getPokemons in PokeDB
**Learning:** Fetching data via IndexedDB in a loop can cause N+1 query and multiple transaction overhead if `db.get` is used individually, as each creates a separate transaction.
**Action:** Use a single `readonly` transaction with `tx.objectStore(STORE).get(id)` and `Promise.all` to batch read operations significantly, avoiding transaction overhead while preventing fetching the entire database via `getAll`.
