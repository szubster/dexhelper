---
id: research-108-187-gen3-roamer-location-offsets
type: RESEARCH
title: Investigate Gen 3 Roamer Location Save Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-15'
updated_at: '2026-06-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-108-161-gen3-roamer-location-impl
tags:
  - gen3
  - roamer
  - save-offsets
  - research
research_references:
  - research-071-138-gen3-roamer-offsets
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Location Save Offsets

## Objective
Discover the exact memory offsets for the roamer's map group and map number for Gen 3 save files.

## Context
During the implementation of `task-108-161-gen3-roamer-location-impl`, it was discovered that the previous research (`research-071-138-gen3-roamer-offsets`) identified that the roamer's current map group and map number are not stored within the primary 20-byte struct, but kept in separate variables loaded into EWRAM (`sRoamerLocation`). However, the exact byte offsets or structure for extracting these values via DataView were not provided.

## Acceptance Criteria
- [x] Determine the exact memory offset and structure for the roamer's map group and map number for Gen 3 saves.

## Findings

### sRoamerLocation and sLocationHistory

Upon deeper investigation of the Gen 3 game decompilation repositories (`pret/pokeemerald`, `pret/pokeruby`, `pret/pokefirered`), it has been determined that the roamer's current map location (`sRoamerLocation`) and its location history (`sLocationHistory`) are **not stored within the `.sav` file at all.**

These variables are defined as `EWRAM_DATA`:

```c
EWRAM_DATA static u8 sLocationHistory[3][2] = {0};
EWRAM_DATA static u8 sRoamerLocation[2] = {0};
```

When the game boots or a save is loaded, these variables are re-initialized dynamically.

- In `InitRoamer()`, the roamer is placed randomly into a valid starting map from `sRoamerLocations` array.
- The `sLocationHistory` is updated dynamically as the player moves around, reading from the player's current location (`gSaveBlock1Ptr->location.mapGroup` / `gSaveBlock1Ptr->location.mapNum`).
- `sRoamerLocation` is updated when the player encounters a map transition, relying on a random probability check and constraints matching the current map against the roamer's internal map array logic.

### Conclusion

Because the exact map location and location history of the roamer are strictly `EWRAM` state and are **never serialized into the save file**, it is mathematically impossible to extract the exact current route of a roaming Pokémon directly from a static Gen 3 `.sav` file, unless the player explicitly saved their game on the exact route while the roamer was active. Any companion app parsing the save file can only confirm the roamer's internal IVs, HP, status, and whether it is `active`, but not its immediate coordinates in the Game Boy's memory.
