---
id: adr-599-638-dynamic-data-hydration
type: ADR
title: 'ADR 028: Runtime Hydration for Parsed Save Data vs Static Pipeline'
status: ACTIVE
owner_persona: architect
created_at: '2026-09-30'
updated_at: '2026-10-01'
depends_on: []
jules_session_id: '12770362291583337954'
pr_number: null
parent: research-599-633-investigate-dynamic-berry-data
tags:
  - architecture
  - gen3
  - state-management
research_references:
  - .foundry/research/research-599-633-investigate-dynamic-berry-data.md
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 028: Runtime Hydration for Parsed Save Data vs Static Pipeline

## Status
Accepted

## Context
During the Gen 3 berry tracking implementation (`story-513-537-gen3-berry-serialization-and-api`), instructions mistakenly conflated parsed save file data (dynamic, user-specific, mutable) with PokeAPI/ROM base data (static, universal, immutable).
The initial instruction dictated serializing the parsed Gen 3 berry patch states into `msgpackr` via `scripts/generate-pokedata.ts`. This contradicts the architecture of `pokedata-core.msgpack`, which is an offline, build-time generated static asset.

## Decision
1. We formalize a strict boundary:
   * **Static Data:** (Base stats, location definitions like `BERRY_TREE_LOCATIONS`, item names) are processed by `scripts/generate-pokedata.ts` at build-time.
   * **Dynamic Save Data:** (Growth stages, inventory counts, game time) is parsed entirely at runtime when a user imports a `.sav` file (`src/engine/saveParser/...`).
2. Parsed dynamic save data (like `Gen3BerryTree` states) must **never** use the static data pipeline for serialization. It must be stored in the application runtime state manager (e.g. Zustand) or a dedicated runtime IndexedDB wrapper for save files, separated entirely from `pokedata-core`.

## Consequences
- Prevents architectural bloat of static asset generation scripts.
- Ensures user save data remains safely client-side and ephemeral to the current session (or browser storage).
- The conflicting task (`task-537-599-gen3-berry-pipeline-integration`) will be CANCELLED and `story-513-537-gen3-berry-serialization-and-api` will be refactored to rely on runtime state integration.
