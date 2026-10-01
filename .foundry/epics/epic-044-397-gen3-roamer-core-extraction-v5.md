---
id: epic-044-397-gen3-roamer-core-extraction-v5
type: EPIC
title: Gen 3 Roamer Core Extraction v5
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-10-01'
depends_on:
  - research-044-396-gen3-roamer-tracker-failure
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
research_references:
  - research-071-138-gen3-roamer-offsets
rejection_count: 1
rejection_reason: ''
notes: Replacement for epic-044-149
locks: []
---

# Gen 3 Roamer Core Extraction v5

## Objective
Extract the core data structure of the roaming legendary from Gen 3 save files, accounting for the new UI direction.

## Description
Parse the `Roamer` struct from the save file (SaveBlock1) to extract the IVs, Personality Value, Species, HP, Level, Status, and Active boolean. This must support Emerald, Ruby/Sapphire, and FireRed/LeafGreen offsets.

## Acceptance Criteria
- [x] Implement robust `DataView` parsing for the Gen 3 `Roamer` struct across all Gen 3 game versions.
- [x] Extract and expose the `active` boolean to determine if the roamer is currently available in the game world.
- [x] Write unit tests verifying extraction against known good save fixtures for each game version.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification to ensure proper system-wide rendering.
- [x] Story Owner: Break down this Epic into executable Stories.

- [x] story-397-358-gen3-roamer-dataview-parsing
- [x] story-397-359-gen3-roamer-unit-tests
- [x] story-397-360-gen3-roamer-integration-e2e
