# E2E Session Persistence via Native IndexedDB

We've improved E2E test performance and reliability by shifting from a 'blank' local storage initialization to a 'native' IndexedDB persistence strategy.

## Key Changes
- **Native Hydration**: Instead of using standard `Object.assign` which might fail for complex types (like `Uint8Array` or `Set`) in the store, we now rely on the application's actual hydration logic combined with side-loading the state into IndexedDB.
- **Playwright Setup project**: Added a `setup` project in `playwright.config.ts` that runs once (`tests/e2e/setup.spec.ts`). It uploads a save file (Blue version) and waits for the Pokedex to sync.
- **storageState**: The resulting browser state (IndexedDB + LocalStorage) is saved to `playwright/.auth/user.json` and reused by all subsequent E2E tests via the `storageState` config.
- **Type Safety**: Refactored `src/db/PokeDB.ts` and `src/db/schema.ts` to use `idb`'s `DBSchema` generic, providing full compile-time safety for all IndexedDB operations.

## Benefits
- Reduced E2E suite runtime by avoiding redundant save-file uploads in every test.
- Correct handling of complex store types (Set, Map, TypedArrays) through native browser serialization.
- Enhanced developer experience with strong typing for PokeData queries.
