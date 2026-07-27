---
id: epic-044-149-gen3-roamer-core-extraction-v4
type: EPIC
title: Gen 3 Roamer Core Extraction v4
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-08'
updated_at: '2026-07-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
research_references:
  - research-071-138-gen3-roamer-offsets
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---
# Gen 3 Roamer Core Extraction v4

## Objective
Extract the core data structure of the roaming legendary from Gen 3 save files, accounting for the new UI direction.

## Description
Parse the `Roamer` struct from the save file (SaveBlock1) to extract the IVs, Personality Value, Species, HP, Level, Status, and Active boolean. This must support Emerald, Ruby/Sapphire, and FireRed/LeafGreen offsets.

## Acceptance Criteria
- [x] Implement robust `DataView` parsing for the Gen 3 `Roamer` struct across all Gen 3 game versions.
- [x] Extract and expose the `active` boolean to determine if the roamer is currently available in the game world.
- [x] Write unit tests verifying extraction against known good save fixtures for each game version.
- [x] story-149-291-gen3-roamer-core-extraction
- [x] story-149-292-gen3-roamer-active-flag-parsing
- [x] story-149-333-gen3-roamer-unit-tests
- [x] Story Owner: Break down this Epic into executable Stories.
