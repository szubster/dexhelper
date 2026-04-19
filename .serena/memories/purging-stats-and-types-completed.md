# Purge of Pokémon Stats and Types

Completed the systematic removal of stats (DVs/Hidden Power) and types from the application to simplify the data model as requested.

## Changes:
- **Parser Cleanup**: Removed DV extraction logic from Gen 1 and Gen 2 parsers in `src/engine/saveParser/parsers/`.
- **Data Model**: Deprecated `dvs` field from `PokemonInstance` and updated `PokemonMetadata` schema.
- **UI Components**: Removed `PokemonStats.tsx` and all references to types/stats in `PokemonDetails` and `PokemonCaughtDetails`.
- **Test Infrastructure**:
    - Implemented `clearStorage` in `tests/e2e/test-utils.ts` to solve state pollution between tests.
    - Updated `save_management.spec.ts` to use manual storage clearing.
    - Refactored `src/engine/assistant/__tests__/test-coverage.test.ts` to remove stat-dependent evolution assertions (e.g., Hitmonlee/Hitmonchan logic).
    - Fixed `src/db/__tests__/PokeDB.test.ts` to properly mock `fetch` and reflect the lean data model.

## Stability:
- All 128 unit tests passing.
- All 37 Playwright E2E tests passing.
- Type-check passing.
