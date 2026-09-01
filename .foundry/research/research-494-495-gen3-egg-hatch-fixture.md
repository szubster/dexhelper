---
id: research-494-495-gen3-egg-hatch-fixture
type: RESEARCH
title: Gen 3 Egg Hatch Fixture
status: FAILED
rejection_reason: 'Suspended pending investigation of pkhex ES module compatibility to avoid manual hex editing.'
owner_persona: researcher
created_at: '2026-08-30'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-473-494-gen3-egg-hatch-e2e-impl
tags:
  - e2e
  - fixture
research_references: []
rejection_count: 1
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

- [ ] research-494-505-pkhex-esmodule-wrapper
- [ ] Acquire or generate a valid Gen 3 save file (`.sav`) that contains at least one Egg in the player's active party
- [ ] Commit it to `tests/fixtures/saves/gen3/`
- [ ] Document its location and provide instructions on how to use it for the E2E test
