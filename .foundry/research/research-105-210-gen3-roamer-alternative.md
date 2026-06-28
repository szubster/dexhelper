---
id: research-105-210-gen3-roamer-alternative
type: RESEARCH
title: Gen 3 Roamer Parsing Alternative Approach
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-22'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: '5967880181226580222'
pr_number: null
parent: story-067-105-gen3-roamer-parser-implementation
tags:
  - gen3
  - roamer
  - save-offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Parsing Alternative Approach

## Objective
Investigate an alternative parsing approach for tracking the Gen 3 roaming Pokémon (Latios/Latias in RS/E or Legendary Beast in FRLG), given that extracting dynamic map locations from the save file is impossible as established in `adr-108-027-gen3-roamer-location-impossible`.

## Description
Determine what data can realistically be extracted from the save file to track the roamer's state.

## Acceptance Criteria
- [x] Investigate alternative data fields. Based on prior research (`gen3_roamer_offsets.md`), we know the `Roamer` struct contains:
- IVs
- Personality
- Species ID
- HP and Level
- Status and Contest Stats
- Active boolean flag

Formulate a new parsing data schema that provides value to the user (e.g., indicating the roamer has been released and is active on the map, its stats if caught/encountered, etc.) without relying on map location mapping.
