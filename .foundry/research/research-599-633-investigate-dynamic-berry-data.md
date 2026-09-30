---
id: research-599-633-investigate-dynamic-berry-data
type: RESEARCH
title: Investigate Discrepancy Between Dynamic Gen 3 Berry Data and Static Pipeline
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-29'
updated_at: '2026-09-30'
depends_on: []
jules_session_id: '11977090110561169550'
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
- [ ] Investigate the architectural intent for Gen 3 Berry Patch data serialization.
- [ ] Determine if `BERRY_TREE_LOCATIONS` or other static metadata should be added to the generation pipeline.
- [ ] Provide a clear recommendation on how to handle the data serialization requirement.
