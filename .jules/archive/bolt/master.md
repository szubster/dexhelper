# Bolt Session Journal

Identified `PokemonCaughtDetails` as a relatively large bundle that can be lazy loaded similar to `PokemonCatchProbability`.
- Replaced static import in `src/components/PokemonDetails.tsx` with a `React.lazy` component wrapped in a suspense boundary.
- Updated `vite.config.ts` chunking function and `.bundlemonrc.json` limits for the new component.

# Performance Optimization Journal

- Optimized `ContestSheenDisplay` to use a manual `for` loop instead of `Array.from({ length }).map()`. This prevents intermediate array allocations and closure creation on every render.
- Extracted invariant calculations out of the 15-iteration loop (`isMaxed`, `colorClass`, etc.).
- Wrapped the component in `React.memo` to prevent unnecessary re-renders when parent states update without `sheen` changing.

# Performance Optimization Journal

- Optimized `ContestConditionStats` to use a manual `for` loop instead of `Array.from({ length }).map()` in the internal `StatBar` component. This eliminates intermediate array allocations and closure creation on every render.
- Extracted the invariant ratio calculation out of the 15-iteration loop.
- Wrapped `StatBar` in `React.memo` to prevent unnecessary re-renders when parent states update without the specific bar's props changing.

# Performance Optimization Journal

- Optimized `CapacitySegmentedBar` to use a manual `for` loop instead of `Array.from({ length }).map()`. This avoids the allocation of an intermediate array and lambda closure overhead on every render (O(N) -> O(1) memory overhead), which is critical since the bar is rendered up to 16 times in the `StorageGrid` for different locations.
- Lifted ratio calculation out of the loop and used `React.memo` to prevent re-renders when parent states change without the primitive `current` or `max` props changing.
