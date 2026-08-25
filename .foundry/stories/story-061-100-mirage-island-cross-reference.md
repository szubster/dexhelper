---
id: story-061-100-mirage-island-cross-reference
type: STORY
title: Cross-reference Mirage Island Random Value
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-08-25'
depends_on:
  - story-061-099-extract-pokemon-pids
jules_session_id: null
pr_number: null
parent: epic-038-061-mirage-island-engine
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
rejection_reason: ''
notes: ''
---
# Cross-reference Mirage Island Random Value

## Context
As defined in Epic `epic-038-061-mirage-island-engine`, the Gen 3 save parser needs to cross-reference the Mirage Island random value with the PIDs of all Pokémon owned by the player.

## Requirements
Cross-reference the 2-byte daily Mirage Island random value against the lower two bytes of the parsed 32-bit PIDs of all party and PC Pokémon.
Identify any "Mirage Island Key" Pokémon and add this information, along with the daily Mirage Island random value itself, to the parsed application data (`SaveData` and `PokemonInstance`).
Ensure robust unit tests are written to verify the extraction and matching logic.

## Acceptance Criteria
- [x] Create/Update TASK nodes to cross-reference the daily value with PIDs.
- [x] Create/Update TASK nodes to include Mirage Island data in the parsed application data (`SaveData` / `PokemonInstance`).
- [x] Create/Update TASK nodes to implement unit tests verifying the logic.
- [x] task-100-469-mirage-island-cross-reference-types
- [x] task-100-470-mirage-island-cross-reference-logic
- [x] task-100-471-mirage-island-cross-reference-tests
- [x] task-100-472-mirage-island-cross-reference-qa
