---
id: research-113-248-egg-move-precomputation
type: RESEARCH
title: Feasibility of Precomputing Egg Move Paths
status: ACTIVE
owner_persona: researcher
created_at: '2026-07-03'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: '15377415144645135185'
pr_number: null
parent: epic-055-113-egg-move-pathfinding-engine
tags:
  - feature
  - mechanics
  - algorithm
  - optimization
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Feasibility of Precomputing Egg Move Paths

## Overview
Investigate whether some (or all) of the Egg Move pathfinding can be precomputed. This would be similar to other static data in this project, like map distances, and could significantly improve runtime performance.

## Acceptance Criteria
- [x] Research and evaluate the state space of possible breeding chains.
- [x] Determine if full or partial precomputation of Egg Move paths is viable.
- [x] Document findings and propose an architecture for incorporating precomputed data into the pathfinding engine.
- [x] Break this research down into actionable TASKS if necessary, or provide a conclusive report.

## Research Findings

### 1. State Space of Breeding Chains
Up through Generation 3, there are 386 Pokémon. Breeding compatibility is determined by Egg Groups. A Pokémon can only breed with another Pokémon sharing at least one Egg Group (except "No Eggs" and "Ditto" special rules).

Each Pokémon species has a defined set of "Egg Moves" (typically 5-15 moves). The state space we care about is the set of all valid `(Target Species, Egg Move)` combinations.
Given ~386 Pokémon and an average of ~10 Egg Moves each, the total number of combinations is roughly 3,000 to 4,000.

For each `(Target Species, Egg Move)` combination, a breeding chain is a sequence of species starting from a "Source" species that learns the move natively (e.g., via Level-up, TM/HM, or Move Tutor) and ending at the "Target" species. The connections between species in the chain are valid breeding pairs (matching Egg Groups, opposite genders possible).

### 2. Viability of Precomputation
Full precomputation is **highly viable and recommended**.
Since the Egg Groups, learnsets, and breeding mechanics are static per generation, the shortest paths for all `(Target Species, Egg Move)` combinations never change dynamically based on the player's save file.

Performing BFS (Breadth-First Search) or Dijkstra's algorithm dynamically in the browser for thousands of potential egg moves during the `suggestionEngine`'s evaluation loop would be computationally expensive and could block the main UI thread.

By precomputing the shortest paths at build time (e.g., during `scripts/generate-pokedata.ts`), we can store the optimal chain for each target.

### 3. Proposed Architecture
**Build Time (ETL Pipeline):**
- Extend `scripts/generate-pokedata.ts` to include an Egg Move Pathfinding algorithm.
- The algorithm will build a directed graph where nodes are Pokémon species and edges represent valid breeding compatibility (i.e., they share an Egg Group).
- For each `(Target Species, Egg Move)`, perform BFS starting from all species that learn the move natively.
- Find the shortest path (minimum number of breeding steps) to the Target Species.
- Store this precomputed path in the JSONL database (e.g., within `pokemon.jsonl` under the metadata for each species, or as a new `egg_moves.jsonl` database).

**Data Structure (Client Side):**
We can define a new property in the `PokemonMetadata` schema or create a separate dictionary mapping:
```typescript
interface EggMovePath {
  moveId: number;
  chain: number[]; // Array of species IDs representing the shortest breeding chain
}
```

**Runtime (Suggestion Engine):**
- When the `suggestionEngine` needs to recommend obtaining an Egg Move, it simply performs an O(1) lookup to retrieve the precomputed `chain`.
- The engine then checks the player's `saveData` to see if they own the starting species or any intermediate species in the chain, and surfaces the next actionable breeding step.

### 4. Conclusion
Precomputing the Egg Move paths at build time is the optimal approach. It shifts the heavy graph traversal logic out of the client runtime, aligning perfectly with the project's existing static data optimization strategies (ADR 010, ADR 049).

The implementation should proceed by modifying the generation scripts to include the pathfinding logic and updating the client's IndexedDB schema to ingest this new precomputed data. No further `RESEARCH` tasks are needed.