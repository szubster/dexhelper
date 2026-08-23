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

## Acceptance Criteria
- [ ] At least one real-world or properly emulated Gen 2 save file containing active roamers is located or the exact steps to reliably generate one using a tool like PKHeX are documented.
- [ ] A recommendation is provided on how to integrate this fixture into the E2E test suite.
