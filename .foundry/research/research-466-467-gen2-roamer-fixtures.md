---
id: research-466-467-gen2-roamer-fixtures
type: RESEARCH
title: Investigate Real-World Gen 2 Roamer Save Fixtures
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-22'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: '3176136743482522530'
pr_number: null
parent: task-442-466-gen2-roamer-e2e-fixture-impl
tags:
  - roamer
  - gen2
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Real-World Gen 2 Roamer Save Fixtures

## Objective
Find or extract real-world `.sav` file fixtures for Gen 2 games (Gold, Silver, Crystal) that contain active roaming legendaries (Raikou, Entei, Suicune).

## Description
During PR review of the fabricated Gen 2 roamer fixtures (comment ID: 5385381368), it was noted that manually editing bytes at specific offsets just replicates our assumptions and does not test real-world scenarios. We need actual save files generated from emulators or real hardware where the player has released the legendary beasts from the Burned Tower, but has not yet caught all of them, so that the roamer structs are naturally populated by the game engine.

The researcher should:
1. Search online repositories, speedrunning communities, or save-sharing forums for Gen 2 save files with active roamers.
2. If none are found, investigate the fastest path to generate these using an emulator and PKHeX (or another 3rd party tool) to correctly trigger the event flags and populate the data naturally, rather than manually hex-editing the struct.
3. Provide instructions or links to acquire these saves.

## Findings

Since online repositories of exact save states matching these criteria are rare, the fastest and most reliable path to generate real-world Gen 2 roamer save files is using an emulator and PKHeX:

1.  **Preparation**: Use PKHeX to open a fresh Gen 2 save file or an existing playthrough save (e.g., a `.sav` file from BGB or mGBA).
2.  **Event Flags**: In PKHeX, navigate to the Event Flags section. Ensure the flag for releasing the legendary beasts from the Burned Tower is set.
3.  **Roamer Status**: Ensure the individual caught/fainted flags for Raikou, Entei, and Suicune are unset (they must be active).
4.  **Save Export**: Export the edited `.sav` file.
5.  **Natural Population**: Load the `.sav` file into an accurate emulator (like BGB). Walk around in the grass or transition between routes. This forces the game engine to naturally populate the roamer structs (map coordinates, levels, and active status) in the SRAM using its own RNG, rather than relying on manually hex-edited assumptions.
6.  **Final Snapshot**: Save the game natively within the emulator. This produces a true "real-world" fixture.

## E2E Integration Recommendation

1.  Save the generated fixture(s) to the `tests/fixtures/` directory (e.g., `tests/fixtures/crystal-roamers.sav`).
2.  In the Playwright E2E tests (e.g., `tests/e2e/roamer.spec.ts`), load these specific files via the application's file upload interface.
3.  Assert that the application correctly parses and displays the roamers, matching the expected engine-generated data rather than fabricated memory structures.

## Acceptance Criteria
- [x] At least one real-world or properly emulated Gen 2 save file containing active roamers is located or the exact steps to reliably generate one using a tool like PKHeX are documented.
- [x] A recommendation is provided on how to integrate this fixture into the E2E test suite.
