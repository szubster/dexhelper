# Gen 3 Pokéblock E2E Investigation

## Root Cause of E2E Failure
The previous attempt to write E2E tests for Gen 3 Pokéblocks (`task-479-576-gen3-pokeblock-e2e-impl`) failed because the UI component for displaying Pokéblocks (`Gen3PokeblocksDashboard.tsx`) was not merged into the `main` branch. A commit (`7175538`) that included both the UI component and the E2E tests existed in a branch, but the branch was permanently rejected and cancelled.

Consequently, running the E2E tests expecting the text "POKÉBLOCKS" to be visible on the dashboard resulted in timeouts, as the code to render that panel did not exist in the current codebase.

## Save File Fixtures
The save files in `tests/fixtures/` must be chosen carefully to ensure Pokéblocks are actually present when expected:
- `emerald.sav`: Does NOT contain any Pokéblocks.
- `ruby-vithuang.sav`: Does NOT contain any Pokéblocks.
- `emerald-vithuang.sav`: Contains 1 Pokéblock.
- `ruby-vithuang-2.sav`: Contains 5 Pokéblocks.

## Action Plan
For the next implementation tasks (e.g. `task-479-609-gen3-pokeblock-e2e-impl-v2`), we must verify that a task for implementing the Gen 3 Pokéblock UI Dashboard exists and is merged *before* the E2E tests are implemented and expected to pass. Currently, the UI is absent. A PM/Planner might need to resurrect or re-draft the UI Epic (`epic-114-328-gen3-pokeblock-dashboard-ui`) first.
