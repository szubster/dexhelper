---
id: research-421-448-gen3-player-location-offsets
type: RESEARCH
title: Determine Gen 3 Player Location Offsets
status: READY
owner_persona: researcher
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-411-421-extract-player-location
tags:
  - gen3
  - ai
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Determine Gen 3 Player Location Offsets

## Context
As part of the Gen 3 AI data extraction (Epic 340-411), we need to extract the player's current location from Gen 3 save files to determine the upcoming trainer. However, we currently lack the exact memory offsets and structures in the knowledge base to read the player's location.

## Objective
Acquire exact save file offsets, memory layouts, and data structures required to parse the player's current location (e.g., Map ID, Map Group, coordinates) in Gen 3 (Ruby/Sapphire/Emerald/FireRed/LeafGreen) save files.

## Scope
- Investigate the save structure to locate where the player's current position/map is stored.
- Determine if `secretBaseId` or another structure is the primary source of location.
- Document the exact relative offsets, sizes, and formats needed by the extraction logic.
- Document how to map this location data to specific trainers or human-readable names.
- Update the relevant knowledge base files in `.foundry/docs/knowledge_base/` with the findings.

## Acceptance Criteria
- [ ] Research complete: Exact memory offsets and data structures for player location are identified.
- [ ] Knowledge base is updated with the findings.
