# Performance Optimization Journal

- Optimized `ContestConditionStats` to use a manual `for` loop instead of `Array.from({ length }).map()` in the internal `StatBar` component. This eliminates intermediate array allocations and closure creation on every render.
- Extracted the invariant ratio calculation out of the 15-iteration loop.
- Wrapped `StatBar` in `React.memo` to prevent unnecessary re-renders when parent states update without the specific bar's props changing.
