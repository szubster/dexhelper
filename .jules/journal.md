# Learned from Bulk IDB Fetching Optimizations

- **Context**: Optimized N+1 IndexedDB `store.get()` fetching inside `Promise.all` with a threshold-based fallback to `store.getAll()`.
- **Lesson**: Do not hardcode magic numbers for optimization thresholds (like `50` or `100`). The optimal threshold depends heavily on data scale, record sizes, browser implementation details, and user device capabilities, which can shift. Hardcoding thresholds makes the optimization fragile.
- **Action Required for future**: Use dynamic or configurable thresholds, or rely on built-in IDB bulk retrieval methods (`getAllKeys` etc) appropriately. Avoid inserting magic numbers into production code.
