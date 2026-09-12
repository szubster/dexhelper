---
id: research-429-531-investigate-gen-specific-bundle-timeout
type: RESEARCH
title: Investigate Gen-Specific Bundle Task Timeout
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-06'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: '13161043573130961102'
pr_number: null
parent: story-400-429-gen-specific-extensions
tags: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Research: Investigate Gen-Specific Bundle Task Timeout

## Context
The task task-429-473-generate-gen-specific-bundles failed due to a session timeout. We need to investigate why this task took so long and if there are architectural blockers.

## Acceptance Criteria
- [x] Identify root cause of timeout.
- [x] Recommend solution.

## Findings

### Root Cause of Timeout
The timeout was caused by the overall complexity of the task `task-429-473-generate-gen-specific-bundles`. The Coder agents were likely overwhelmed by the extensive changes required across both `scripts/generate-pokedata.ts` and `vite-plugins/pokedata-plugin.ts`. Without a granular breakdown of exactly how to split the massive dataset and rebuild the Vite pipelines concurrently within a single session, the agents exceeded the bash execution time limit trying to refactor these critical path files.

### Recommended Solution
The task should be broken down and approached with explicit, step-by-step instructions:

1. **Split the Data Generation (`scripts/generate-pokedata.ts`):**
   - The generator should create multiple generation-specific JSONL outputs for encounters and locations rather than a single `encounters.jsonl` and `locations.jsonl`.
   - **Encounters:** Filter the `encounters` based on the version ID (`v`). Gen 1 is `v <= 3`, Gen 2 is `4 <= v <= 6`, and Gen 3 is `7 <= v <= 11`. Output them to `encounters-gen1.jsonl`, `encounters-gen2.jsonl`, etc.
   - **Locations:** The ROM map IDs dictate the generation. Generally, Gen 1 IDs are `< 256`, Gen 3 IDs follow `(gameId >> 16) === 3`, and the rest are Gen 2. Write them to `locations-gen1.jsonl`, etc.

2. **Update the Vite Plugin (`vite-plugins/pokedata-plugin.ts`):**
   - The plugin's `generateData()` function must read these newly split JSONL files (e.g. `locations-gen1.jsonl`).
   - Create separate hashes and buffers via `msgpackr` for each bundle:
     - `pokedata-core.msgpack` (pokemon, items, moves, berries)
     - `pokedata-gen1.msgpack` (encounters-gen1, locations-gen1)
     - `pokedata-gen2.msgpack` (encounters-gen2, locations-gen2)
     - `pokedata-gen3.msgpack` (encounters-gen3, locations-gen3, matchCalls)
   - Emit each file inside `generateBundle()`, and correctly route URLs in `configureServer` middleware.
