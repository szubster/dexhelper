## 2024-05-15 - [React.memo in large lists]
**Learning:** Re-evaluating filtered datasets like `finalPokemon` triggers parent grid re-renders. For large lists like Gen 2 (up to 251 items), missing `React.memo` on list item components (`PokedexCard`) forces all children to re-render despite stable props.
**Action:** Use `React.memo` to wrap item components inside list grids to decouple child rendering from parent dataset recalculations.

## 2024-05-19 - ⚡ Bolt: Use cached pokemonList in AssistantPanel
**Learning:** When data is prefetched and cached at the root route level via `queryClient.ensureQueryData` (e.g., `pokemonListQueryOptions`), child components like `AssistantPanel` shouldn't re-fetch it independently via `useQuery` or `pokeDB` calls. This causes redundant IndexedDB access, duplicative cache memory allocation, and blocks the main thread with unnecessary array mapping.
**Action:** Replace `useQuery` with `useSuspenseQuery` utilizing the exact same pre-defined `queryOptions` object from `pokemonQueries.ts`. `useSuspenseQuery` safely eliminates the need for manual `undefined` checks since the data presence is guaranteed by the route loader.

## 2026-04-21 - ⚡ Bolt: Debounce LocationSuggestions IndexedDB queries
**What:** Debounced IndexedDB query inside LocationSuggestions component by adding a 250ms `setTimeout` to delay `pokeDB.getLocations()` fetch based on user typing.
**Why:** Typing into the search bar rapidly changes `searchTerm`, which triggered the `useEffect` and fired continuous `pokeDB.getLocations()` requests without a debounce, causing main thread to block and resulting in UI freezes.
**Expected Impact:** Improved responsiveness during rapid keystrokes as the redundant IDB queries are skipped before 250ms have elapsed.

## 2026-04-26 - [N+1 IndexedDB query overhead in loops and iterations]
**Learning:** Querying IndexedDB individually inside loops (e.g. mapping over arrays or deeply nested iterations) creates a new transaction for each query. This causes massive N+1 overhead and blocks the main thread, especially on rapid keystrokes or complex rendering flows.
**Action:** Always batch IDB reads into a single `readonly` transaction using `Promise.all` over `tx.objectStore(STORE).get(id)`, or use pre-computed arrays rather than firing off individual queries in a loop. For `getInverseIndex`, use batched methods like `getInverseIndexBulk` to prevent main thread blocking.

## 2026-04-26 - [O(N) Operations inside nested loops]
**Learning:** Repeatedly executing O(N) array operations (`Array.prototype.find`, `Array.prototype.includes`, chained `.filter().map()`) inside nested loops for lookups and filtering introduces O(N*M) or O(n²) complexity, causing severe performance degradation during data generation or rendering (e.g. in suggestionEngine).
**Action:** Extract the target array into a `Map` or `Set` outside the loop to enable O(1) lookups, or consolidate chained iterations into a single `for` loop to avoid intermediate array allocations.
