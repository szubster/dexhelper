## 2026-04-12 - [O(N) Operations inside loop]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the queryTargets loop repeatedly creates new arrays for every missing Pokemon. This causes O(N*M) complexity.
**Action:** Process `allInstances` outside the loop into a Map to achieve O(1) lookups.

## 2024-05-15 - [React.memo in large lists]
**Learning:** Re-evaluating filtered datasets like `finalPokemon` triggers parent grid re-renders. For large lists like Gen 2 (up to 251 items), missing `React.memo` on list item components (`PokedexCard`) forces all children to re-render despite stable props.
**Action:** Use `React.memo` to wrap item components inside list grids to decouple child rendering from parent dataset recalculations.
## 2024-05-15 - Optimize getPokemons in PokeDB
**Learning:** Fetching data via IndexedDB in a loop can cause N+1 query and multiple transaction overhead if `db.get` is used individually, as each creates a separate transaction.
**Action:** Use a single `readonly` transaction with `tx.objectStore(STORE).get(id)` and `Promise.all` to batch read operations significantly, avoiding transaction overhead while preventing fetching the entire database via `getAll`.
## 2024-05-24 - Prevent N+1 queries in LocationSuggestions
**Learning:** IDB queries using `pokeDB.getInverseIndex` inside `.map` over filtered elements can trigger N+1 synchronous database overhead in React useEffects on every keystroke, causing severe UI blocking despite `await`.
**Action:** When working with objects returned by `pokeDB.getLocations()`, access the pre-computed `pids` array directly (`l.pids?.length`) rather than firing off individual IndexedDB queries for `pokeDB.getInverseIndex(l.id)`. This removes Promises entirely from the render iteration.
## 2026-04-19 - [Debounce IDB Queries in LocationSuggestions]
**Learning:** `pokeDB.getLocations()` fetches all map locations from IDB on every keystroke when searching. This causes main thread blocking while typing quickly due to repeated unnecessary `getAll` and `filter` operations.
**Action:** Introduced a 150ms debounce with `setTimeout` to batch IDB query execution, minimizing lag and keeping keystrokes responsive.
