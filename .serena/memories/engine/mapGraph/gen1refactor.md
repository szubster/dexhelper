# Gen 1 Location System Refactor (April 2026)

The Generation 1 location system has been migrated from a hardcoded `GEN1_MAPS` constant to a database-driven approach.

## Implementation Details
- **Data Source**: `pokedata.json` now includes `connections` (adjacent Map IDs) and `gameId` (ROM map ID hex) for all Gen 1 locations.
- **Pathfinding**: `gen1Graph.ts` uses a standard Dijkstra implementation to calculate proximity between the player's current Map ID and target Encounter Areas.
- **Strategy Pattern**: `AssistantStrategy` types were updated to accept the full `GenericLocation` and `SpecificArea` datasets for computation.

## Relevant Files
- `src/engine/mapGraph/gen1Graph.ts`: Core Dijkstra logic.
- `src/engine/assistant/strategies/gen1Strategy.ts`: Gen 1 specific resolution logic.
- `scripts/generate-pokedata.ts`: Data extraction pipeline.
