---
id: epic-044-072-gen3-roamer-location-radar
type: EPIC
title: Gen 3 Roamer Location Radar
status: CANCELLED
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: '18072430624236273510'
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - map
research_references: []
rejection_count: 0
rejection_reason: 'Roamer locations are stored in EWRAM and are not serialized into the .sav file, making extraction and mapping impossible (per adr-108-027).'
notes: ''
---

# Gen 3 Roamer Location Radar

## Objective
Extract the roamer's current location index and integrate it with the Route Radar.

## Description
Determine the current map group and map number of the roaming Pokémon from the save file (noting that it's stored outside the primary 20-byte roamer struct in EWRAM or save state tracking). Map this location index to the UI's Route Radar so players can see where the roamer is located.

## Acceptance Criteria
- [ ] Parse the roamer's current location index from the save file.
- [ ] Map the location index to the correct route or area in the application.
- [ ] Integrate this location data with the Route Radar map display.
- [x] Story Owner: Break down this Epic into executable Stories.
- [x] .foundry/stories/story-072-108-gen3-roamer-location-extraction.md
- [ ] .foundry/stories/story-072-109-gen3-roamer-location-mapping.md
- [ ] .foundry/stories/story-072-110-gen3-roamer-route-radar-ui.md

### Auditor Rejection
**CANCELLED:** This Epic has been permanently cancelled. As established in ADR 108-027, the Gen 3 roamer's active map coordinates are stored in dynamically initialized EWRAM and are never serialized into the `.sav` file. Therefore, statically extracting the map route for the Route Radar is mathematically impossible.
