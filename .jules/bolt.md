## 2024-05-18 - [React Query for API Caching]
**Learning:** The initial manual Promise cache deduplicated identical requests successfully but circumvented robust cache expiration and hydration tracking features that TanStack query already possesses. Service workers operate on the network layer and do not prevent redundant JS execution and queuing inside the browser before hitting the worker.
**Action:** Always extract the React `QueryClient` into a separate singleton module (`queryClient.ts`) so that it can be imported and shared by pure functions and non-React files without relying on hooks. Use `queryClient.fetchQuery` to seamlessly leverage its out-of-the-box deduplication and configurable cache timers globally.

## 2026-04-06 - [React Render Loop Optimizations for StorageGrid]
**Learning:** In the `StorageGrid` component, doing `saveData.partyDetails.concat(saveData.pcDetails).filter(p => p.storageLocation === location)` inside the `.map()` loop (which iterates 14 times) leads to O(N * M) behavior where N is the total number of items in party and pc, and M is the number of boxes.
**Action:** Use `React.useMemo` to construct a grouped `Map` mapping location string to arrays of pokemon details O(N), so inside the loop you just need to do an O(1) `.get(location)`.
