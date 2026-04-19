# Migration & Project Status Summary (April 2026)

## 1. Current State of Migration
The project has successfully completed its core "Lean Data" and "Offline-First" migration milestones.

### Accomplishments:
- **Lean Data Model**: Removed static Pokémon types from the main bundle, purged `pokenode-ts`, `jsdom`, and `tsx`. `pokedata.json` is significantly optimized.
- **PokeDB Engine**: Replaced the REST-based engine with a local-first IndexedDB system (PokeDB) using numeric IDs. Supports complex recursive evolution chains (e.g., Eevee, Tyrogue).
- **UI Performance ("Bolt")**: Implemented `useMemo` optimizations in `PokedexGrid` and `StorageGrid`, removing O(N) operations and enabling smooth 150+ item rendering.
- **Environment Stability**: Stabilized `Lefthook` and `Biome` configurations to prevent pathing leaks during linting.

## 2. Active Phase: Assistant & Infrastructure Refinement
We are currently in the process of hardening the assistant engine and enhancing infrastructure.

### Current Tasks:
- **Assistant Strategy Refactor**: PR #204 (`fix/assistant-strategies`) is active, moving towards a more robust strategy pattern for NPC trades and gift Pokémon detection.
- **Gen 1 ROM Mapping**: Updating `assistantData.ts` with comprehensive MAP_TO_AID and event flag mappings for Generation 1 (Red/Blue/Yellow).
- **Query Layer**: PR #203 is introducing `@tanstack/react-query` to manage PokeDB state transitions and async data fetching more predictably.
- **A11y Enhancement**: PR #202 is focusing on accessibility and focus management.

## 3. Known Problems & Technical Debt
- **Gen 2 Gaps**: Integration for Generation 2 is lagging. Event flags and map offsets for GSC are not yet fully mapped in `assistantData.ts`.
- **Numeric ID Mapping**: The transition to purely numeric IDs requires careful mapping of constants in `schema.ts` to ensure human-readable strings in the UI are always accurate.
- **PWA Verification**: While offline-first logic is implemented, the full PWA experience needs deeper verification via browser testing.

## 4. Next Phase
- **Generation 2 Completion**: Fully map event flags and trades for Gold/Silver/Crystal.
- **Advanced Assistant Suggestions**: Leverage the new TanStack Query layer to provide real-time suggestions based on current inventory and game progress flags.
- **Visual Regression Suite**: Implement Argos CI snapshots for FullHD, 1440p, and Mobile Pixel 9 to prevent visual regressions during UI updates.
