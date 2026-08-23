---
id: task-100-469-mirage-island-cross-reference-types
type: TASK
title: Cross-reference Mirage Island Random Value Types Update
status: ACTIVE
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on:
  - story-061-099-extract-pokemon-pids
jules_session_id: '12076000255758411977'
pr_number: null
parent: story-061-100-mirage-island-cross-reference
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
rejection_reason: ''
notes: ''
---
# Cross-reference Mirage Island Random Value Types Update

## Context
As defined in Story `story-061-100-mirage-island-cross-reference`, the Gen 3 save parser needs to cross-reference the Mirage Island random value with the PIDs of all Pokémon owned by the player.

## Requirements
Update `src/engine/saveParser/parsers/common.ts` to add `isMirageIslandKey?: boolean;` to the `PokemonInstance` interface.

## Acceptance Criteria
- [x] Add `isMirageIslandKey?: boolean;` to `PokemonInstance` interface in `common.ts`.
