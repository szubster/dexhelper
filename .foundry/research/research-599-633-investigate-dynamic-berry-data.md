---
id: research-599-633-investigate-dynamic-berry-data
type: RESEARCH
title: Investigate Discrepancy Between Dynamic Gen 3 Berry Data and Static Pipeline
status: PENDING
owner_persona: researcher
created_at: '2026-09-29'
updated_at: '2026-10-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-537-599-gen3-berry-pipeline-integration
rejection_count: 0
rejection_reason: ''
locks: []
---

# Investigate Discrepancy Between Dynamic Gen 3 Berry Data and Static Pipeline

## Context
During the implementation of `task-537-599-gen3-berry-pipeline-integration`, it was discovered that Gen 3 Berry Patches data (e.g. `growthStage`, `minutesUntilNextStage`) is inherently dynamic and parsed directly from the save file (`src/engine/saveParser/gen3/berry/parser.ts`), rather than being part of the static data sourced from PokeAPI which `generate-pokedata.ts` processes.

The task instructions requested integrating the "parsed Gen 3 berry patch data into the PokeData storage generation pipeline" and serializing it using `msgpackr`. However, since `pokedata-core.msgpack` is a static asset distributed with the application, integrating dynamic save file data directly into it presents an architectural contradiction.

## Objective
Investigate the original intent behind this requirement. Determine whether:
1. Static mappings (such as `BERRY_TREE_LOCATIONS`) are what should be added to the static PokeData generation pipeline.
2. The dynamic parsed save data should indeed be serialized with `msgpackr` using a different runtime cache or persistence mechanism outside of the static PokeData payload.
3. The original task instructions simply confused dynamic save data with static game data, and a new plan or task definition is required.

## Acceptance Criteria
- [ ] adr-599-638-dynamic-data-hydration
- [x] Investigate the architectural intent for Gen 3 Berry Patch data serialization.
- [x] Determine if `BERRY_TREE_LOCATIONS` or other static metadata should be added to the generation pipeline.
- [x] Provide a clear recommendation on how to handle the data serialization requirement.

## Findings & Recommendations

### 1. Architectural Intent and Contradiction
The original task (`task-537-599-gen3-berry-pipeline-integration`) instructed developers to integrate parsed Gen 3 berry patch data into the `PokeData` storage generation pipeline (`scripts/generate-pokedata.ts`) and serialize it via `msgpackr`. This is an architectural contradiction.
*   **Static vs. Dynamic Data:** The `PokeData` generation pipeline is an offline ETL process executed at build-time. It transforms static data from PokeAPI and ROM configurations into a read-only payload (`pokedata-core.msgpack`).
*   **Save File Data:** The parsed Gen 3 berry data (e.g., `growthStage`, `minutesUntilNextStage`) is highly dynamic and inherently user-specific. It is generated at runtime when a user uploads a `.sav` file. It fundamentally cannot, and should not, be baked into the static, read-only `PokeData` application bundle.

### 2. Static Metadata (`BERRY_TREE_LOCATIONS`)
`BERRY_TREE_LOCATIONS` is a static mapping array that associates sequential berry tree indexes (0-88) with human-readable map locations (e.g., 'Route 102').
While it is technically static, it does not come from PokeAPI; it is specific to Gen 3 decompiled ROM structures. Moving this into the `PokeData` generation pipeline is not necessary unless the goal is to heavily optimize the core JS bundle size. It is perfectly acceptable for it to remain a hardcoded constant in `src/engine/gen3/berryPatches/berryLocations.ts`.

### 3. Recommendations for Handling Serialization
1.  **Cancel `task-537-599-gen3-berry-pipeline-integration`:** The task relies on a fundamentally flawed premise. Dynamic runtime data must not be integrated into the static build-time `generate-pokedata.ts` pipeline.
2.  **Runtime State Integration:** The parsed Gen 3 berry patch data returned by `parseGen3BerryTrees` should be stored and managed exclusively within the runtime application state (e.g., a Zustand store, React Context, or a runtime IndexedDB save cache) upon save file load, completely bypassing `msgpackr` serialization and the static data pipeline.
3.  **Adjust the Parent Story:** The parent `story-513-537-gen3-berry-serialization-and-api` should be updated to drop the "serialization" requirement using `msgpackr`, and instead focus solely on hydrating the dynamically parsed save data into the runtime API/UI layers.
