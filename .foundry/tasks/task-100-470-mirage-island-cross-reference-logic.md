---
id: task-100-470-mirage-island-cross-reference-logic
type: TASK
title: Cross-reference Mirage Island Random Value Logic Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-24'
depends_on:
  - task-100-469-mirage-island-cross-reference-types
jules_session_id: '3020147494212250064'
pr_number: null
parent: story-061-100-mirage-island-cross-reference
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
rejection_reason: ''
notes: ''
rejection_count: 1
---
# Cross-reference Mirage Island Random Value Logic Implementation

## Context
As defined in Story `story-061-100-mirage-island-cross-reference`, the Gen 3 save parser needs to cross-reference the Mirage Island random value with the PIDs of all Pokémon owned by the player.

## Requirements
Modify `src/engine/saveParser/parsers/gen3.ts` to cross-reference the daily Mirage Island random value against the lower two bytes of the parsed 32-bit PIDs of all party and PC Pokémon.
- Ensure the `mirageIslandValue` is read before or during the processing of party and PC Pokémon.
- Update `parseGen3` to iterate over `partyDetails` and `pcDetails` and set `isMirageIslandKey: ((pokemon.personalityValue & 0xFFFF) === mirageIslandValue)` if `pokemon.personalityValue` is defined.

## Acceptance Criteria
- [ ] Implement logic in `parseGen3` to correctly extract the `mirageIslandValue` in sequence so that it is available when processing `partyDetails` and `pcDetails`.
- [ ] Implement logic in `parseGen3` to set `isMirageIslandKey` for party and PC Pokémon when their PID's lower 16 bits match the `mirageIslandValue`.
