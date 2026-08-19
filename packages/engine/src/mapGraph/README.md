# Map Graph Architecture

The `mapGraph` module provides O(1) runtime distance calculations between the player's current map and the spawn locations of target Pokémon.

## Why pre-compute paths?

The Assistant recommendation engine frequently evaluates hundreds of potential encounters simultaneously to determine optimal catch routes based on the player's current location. If it were to run a graph traversal algorithm like Breadth-First Search (BFS) or Dijkstra's at runtime for every suggestion, it would lock the React UI thread and severely degrade performance, especially on slower devices.

To guarantee O(1) synchronous lookup performance:
1.  **Build-Time Computation:** The `scripts/generate-pokedata.ts` ETL pipeline runs the Floyd-Warshall algorithm to compute the All-Pairs Shortest Path across all outdoor map hubs.
2.  **Distance Lookup:** This pre-computed distance matrix is baked into the IndexedDB database within each `UnifiedLocation` object's `dist` property.

## Resolving Indoor Maps
The Floyd-Warshall distance matrix is only computed between major outdoor hubs (e.g., Pallet Town, Route 1, Viridian City) to save space. If a player saves their game inside a building (like the Viridian City Pokémon Center), they are on an "indoor" map.

To determine the distance to a target from an indoor location, the engine recursively traverses the `prnt` property (parent map ID) until it "steps outside" to an outdoor map, and then performs the O(1) lookup.

## Generation-Specific Map IDs

*   **Generation 1:** Map IDs are sequential numbers (0 to ~255).
*   **Generation 2:** Game Boy memory arrays for Johto are segmented into Map Groups. Therefore, Gen 2 map IDs must be resolved using a bit-shifted composite key: `(group << 8) | id`. This ensures unique map graph IDs across regions.
