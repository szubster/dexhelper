## 2026-04-07 - [Dead Code React Hooks]
**Learning:** React functional components can accumulate dead code within hooks (like `useMemo`) that continues to execute and allocate memory during the render cycle, even if the variables are no longer returned or used in the JSX. In `PokedexGrid.tsx`, unused `useMemo` hooks were iterating over potentially large arrays (`saveData?.partyDetails` and `saveData?.pcDetails`), filtering and mapping them, and instantiating `Set` objects, all completely pointlessly on render.
**Action:** Always verify that expensive hooks (`useMemo`, `useCallback`) are actually still contributing to the component's output or state. Removing dead code from the render path is a zero-risk performance win.

## 2024-05-18 - [React Query for API Caching]
**Learning:** The initial manual Promise cache deduplicated identical requests successfully but circumvented robust cache expiration and hydration tracking features that TanStack query already possesses. Service workers operate on the network layer and do not prevent redundant JS execution and queuing inside the browser before hitting the worker.
**Action:** Always extract the React `QueryClient` into a separate singleton module (`queryClient.ts`) so that it can be imported and shared by pure functions and non-React files without relying on hooks. Use `queryClient.fetchQuery` to seamlessly leverage its out-of-the-box deduplication and configurable cache timers globally.

## 2026-04-10 - [Optimize Array Filtering and Input State]
**Learning:** Chained array  operations and synchronous search term updates cause expensive UI repaints and main-thread blocking when rendering large lists (like the 151 items in `PokedexGrid`). Furthermore, string operations inside array callbacks (like `.toLowerCase()`) allocate new strings redundantly for every item evaluated.
**Action:** Always combine chained  operations into a single pass to reduce O(N) iterations. Hoist invariant computations (like converting a search term to lowercase) outside of the loop. Crucially, decouple rapid search typing from the expensive list re-render using `React.useDeferredValue`.

## 2026-04-10 - [Optimize Array Filtering and Input State]
**Learning:** Chained array `.filter()` operations and synchronous search term updates cause expensive UI repaints and main-thread blocking when rendering large lists (like the 151 items in `PokedexGrid`). Furthermore, string operations inside array callbacks (like `.toLowerCase()`) allocate new strings redundantly for every item evaluated.
**Action:** Always combine chained `.filter()` operations into a single pass to reduce O(N) iterations. Hoist invariant computations (like converting a search term to lowercase) outside of the loop. Crucially, decouple rapid search typing from the expensive list re-render using `React.useDeferredValue`.
