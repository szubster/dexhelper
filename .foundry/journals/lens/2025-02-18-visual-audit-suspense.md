# Lens Journal — React 19 Suspense & Cross-Gen Save State Switching

## React 19 Lazy Loading Suspense Boundaries
In React 19, lazy-loaded route components (such as `DagWrapper` on `/dag`) throw an unhandled `use()` hook suspension warning (`This library called use() to suspend in a previous render but did not call use() when it finished`) if they suspend without an explicit `<Suspense>` boundary wrapping the component inside the route definition.
* **Resolution**: Replace `lazyRouteComponent` with `React.lazy()` and wrap lazy components in `<Suspense fallback={...}>`.

## Cross-Generation Save State Switching in Playwright
When running E2E visual tests that iterate through multiple save files (`yellow.sav`, `crystal.sav`, `emerald.sav`) within a test suite, `initializeWithSave` checks if `TRNR` text is already visible on the page. If a save state is already active, `initializeWithSave` skips overwriting IndexedDB.
* **Resolution**: Always invoke `clearStorage(page)` before calling `initializeWithSave` when switching save states.
* **Test Timeout Prevention**: Split multi-save assertion sequences into discrete `test()` blocks so that each save state initialization gets a fresh timeout budget.
