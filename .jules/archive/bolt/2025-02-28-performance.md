# Performance Optimization Journal

- Optimized `CapacitySegmentedBar` to use a manual `for` loop instead of `Array.from({ length }).map()`. This avoids the allocation of an intermediate array and lambda closure overhead on every render (O(N) -> O(1) memory overhead), which is critical since the bar is rendered up to 16 times in the `StorageGrid` for different locations.
- Lifted ratio calculation out of the loop and used `React.memo` to prevent re-renders when parent states change without the primitive `current` or `max` props changing.
