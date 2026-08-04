# Performance Optimization Journal

- Optimized `ContestSheenDisplay` to use a manual `for` loop instead of `Array.from({ length }).map()`. This prevents intermediate array allocations and closure creation on every render.
- Extracted invariant calculations out of the 15-iteration loop (`isMaxed`, `colorClass`, etc.).
- Wrapped the component in `React.memo` to prevent unnecessary re-renders when parent states update without `sheen` changing.
