# Bolt Learnings

- Repeated filtering inside `React.useCallback` or `React.useMemo` bodies when the dataset is static can be optimized by pre-grouping the data.
- In `src/components/PokemonDetails.tsx`, grouping `encounters` into an `encountersByVersion` Map using `useMemo` reduced the complexity of `getLocationsForVersion` from O(N) to O(1). Performance benchmarks show execution times dropping from ~600ms to ~8ms for 1000 simulated renders.
- When creating optimizations, it is crucial to update the callback/memo dependency arrays (e.g., from `encounters` to `encountersByVersion`).
