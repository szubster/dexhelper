---
id: task-100-471-mirage-island-cross-reference-tests
type: TASK
title: Cross-reference Mirage Island Random Value Tests
status: PENDING
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on:
  - task-100-470-mirage-island-cross-reference-logic
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
# Cross-reference Mirage Island Random Value Tests

## Context
As defined in Story `story-061-100-mirage-island-cross-reference`, the Gen 3 save parser needs to cross-reference the Mirage Island random value with the PIDs of all Pokémon owned by the player.

## Requirements
Write robust unit tests in `src/engine/saveParser/parsers/gen3.test.ts` to verify the extraction and matching logic implemented in `parseGen3`.

## Acceptance Criteria
- [ ] Add unit tests in `gen3.test.ts` to verify that `isMirageIslandKey` is correctly set to `true` for Pokémon whose PID's lower 16 bits match the `mirageIslandValue`.
- [ ] Add unit tests in `gen3.test.ts` to verify that `isMirageIslandKey` is correctly set to `false` (or `undefined`) for Pokémon whose PID's lower 16 bits do NOT match the `mirageIslandValue`.
