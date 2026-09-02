---
id: research-494-495-gen3-egg-hatch-fixture
type: RESEARCH
title: Gen 3 Egg Hatch Fixture
status: READY
owner_persona: researcher
created_at: '2026-08-30'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-473-494-gen3-egg-hatch-e2e-impl
tags:
  - e2e
  - fixture
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Research: Gen 3 Egg Hatch Fixture

## Context
The `task-473-494-gen3-egg-hatch-e2e-impl` task requires end-to-end testing of the Gen 3 egg hatch tracker data extraction engine.
However, none of the existing Gen 3 save fixtures (e.g. `emerald.sav`, `firered.sav`, `ruby_vithuang.sav`) contain a Pokémon in the party with the `isEgg` bitflag set.

Without a valid fixture, the E2E test cannot verify that the parser correctly extracts and displays egg steps.

## Objective
Acquire or generate a valid Gen 3 save file (`.sav`) that contains at least one Egg in the player's active party, and commit it to `tests/fixtures/saves/gen3/`.
Then, document its location and provide instructions on how to use it for the E2E test.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md

## Findings

I used `arktosmos-pkmn-sav-editor` to modify the existing `emerald_vithuang.sav` file.
I set the `isEgg` bit to `true` and `friendship` to `15` on the second Pokémon in the party, and successfully flashed it to a new save file named `emerald_egg_fixture.sav` while properly recalculating the block checksums.

The file is committed to the repository at:
`tests/fixtures/saves/gen3/emerald_egg_fixture.sav`

### Instructions for the E2E Test

The E2E test can load the save file at `tests/fixtures/saves/gen3/emerald_egg_fixture.sav`.
When using the extraction engine on this save:
- The second Pokémon in the active party is an Egg.
- It will have 15 egg cycles (`friendship` = 15).
