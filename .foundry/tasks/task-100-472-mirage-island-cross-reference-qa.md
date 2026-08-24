---
id: task-100-472-mirage-island-cross-reference-qa
type: TASK
title: Cross-reference Mirage Island Random Value QA
status: READY
owner_persona: qa
created_at: '2026-08-23'
updated_at: '2026-08-24'
depends_on:
  - task-100-471-mirage-island-cross-reference-tests
jules_session_id: null
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
# Cross-reference Mirage Island Random Value QA

## Context
As defined in Story `story-061-100-mirage-island-cross-reference`, the Gen 3 save parser needs to cross-reference the Mirage Island random value with the PIDs of all Pokémon owned by the player.

## Requirements
Verify that the `mirageIslandValue` is properly extracted and cross-referenced with both party and PC Pokémon PIDs, setting `isMirageIslandKey` correctly on the `PokemonInstance`.
Verify that unit tests are implemented and pass.

## Acceptance Criteria
- [ ] Verify `isMirageIslandKey` is present and correctly typed on `PokemonInstance` in `common.ts`.
- [ ] Verify `parseGen3` sets `isMirageIslandKey` to `true` for Pokémon whose PID lower 16 bits match `mirageIslandValue`, and `false`/`undefined` otherwise.
- [ ] Verify unit tests effectively cover this extraction and matching logic.
