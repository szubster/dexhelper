---
id: research-108-163-gen3-sroamerlocation-offsets
type: RESEARCH
title: Investigate Gen 3 sRoamerLocation Save Offsets
status: PENDING
owner_persona: researcher
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-108-161-gen3-roamer-location-impl
tags:
  - gen3
  - roamer
  - save-offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 sRoamerLocation Save Offsets

## Objective
Find and document the exact save offsets or methods to extract the map group and map number for the active roaming Pokémon (`sRoamerLocation`) in Gen 3 (Ruby/Sapphire, Emerald, FireRed/LeafGreen).

## Description
The previous research (`research-071-138-gen3-roamer-offsets`) documented the primary 20-byte `struct Roamer`. However, it explicitly states that the roamer's current map group and map number are **not** stored within this struct and are kept in separate variables loaded into EWRAM (`sRoamerLocation` or similar).

The implementation task (`task-108-161-gen3-roamer-location-impl`) requires extracting this map data using `DataView` API. Without the exact memory offsets or an understanding of how to reliably extract this location from the save blocks, the task cannot be completed.

Your goal is to investigate how to locate and extract the active roamer's map group and map index from the Gen 3 save format.

## Acceptance Criteria
- [ ] Determine if the roamer location is deterministically saved to the SRAM/Flash in a specific block, and if so, document the exact offsets across different Gen 3 versions.
- [ ] Document how the location shifts dynamically, and if it's feasible to track based purely on the static `.sav` file.
