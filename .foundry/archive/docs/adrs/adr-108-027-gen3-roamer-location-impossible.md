---
id: adr-108-027-gen3-roamer-location-impossible
type: ADR
title: Impossibility of Gen 3 Roamer Location Extraction
status: COMPLETED
owner_persona: architect
created_at: '2026-06-18'
updated_at: '2026-06-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-072-108-gen3-roamer-location-extraction
tags:
  - gen3
  - roamer
  - save-offsets
research_references:
  - research-108-187-gen3-roamer-location-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Impossibility of Gen 3 Roamer Location Extraction

## Context
As part of integrating the Gen 3 Roamer Location Radar feature, the task required parsing the roamer's current map group and map number from the `.sav` file.

## Decision
Do not attempt to extract `sRoamerLocation` or `sLocationHistory` for Generation 3 roaming Pokémon from the save file.

## Consequences
Research (`research-108-187-gen3-roamer-location-offsets`) revealed that in Generation 3 games, the roamer's location (`sRoamerLocation`) and its map history (`sLocationHistory`) are kept exclusively in dynamically allocated `EWRAM_DATA` during gameplay. When the game saves, these values are **never serialized into the save file**. Instead, they are dynamically re-initialized when the save is loaded, based on random starting maps and the player's current location.

Therefore, it is mathematically impossible to statically extract the active roamer's immediate map coordinates from a Gen 3 `.sav` file, unless the save was taken at the exact moment the roamer was encountered. Any parsing logic for this data would result in a failure.

The UI for tracking the Gen 3 roamer will need to rely on the active roamer flags and IVs, rather than plotting its exact map route.
