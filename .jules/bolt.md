## 2026-04-12 - [O(N) Operations inside loop]
**Learning:** In suggestionEngine.ts, filtering `allInstances` inside the queryTargets loop repeatedly creates new arrays for every missing Pokemon. This causes O(N*M) complexity.
**Action:** Process `allInstances` outside the loop into a Map to achieve O(1) lookups.

## 2024-05-15 - [React.memo in large lists]
**Learning:** Re-evaluating filtered datasets like `finalPokemon` triggers parent grid re-renders. For large lists like Gen 2 (up to 251 items), missing `React.memo` on list item components (`PokedexCard`) forces all children to re-render despite stable props.
**Action:** Use `React.memo` to wrap item components inside list grids to decouple child rendering from parent dataset recalculations.

## 2024-05-18 - [Optimizing Map Distance Calculations]
**Learning:** In suggestionEngine.ts, `strategy.getMapDistance` is called multiple times for the same target location inside a nested loop over queryTargets and their possible encounters. Recomputing distance to the same target `aid` repeatedly causes unnecessary performance overhead.
**Action:** Pre-calculate or cache `getMapDistance` results using a `Map` so each location's distance from the current map is calculated at most once per execution.
