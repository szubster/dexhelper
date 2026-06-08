---
id: idea-070-roamer-tracking-dashboard
type: IDEA
title: Roaming Pokémon Tracking Dashboard
status: PENDING
owner_persona: product_manager
created_at: '2026-06-08'
updated_at: '2026-06-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - ux
  - map
  - exploration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Roaming Pokémon Tracking Dashboard

## Context
In Generations 2 and 3, certain legendary Pokémon (such as Entei, Raikou, Suicune in Gen 2, and Latios/Latias in Gen 3) are designated as "roaming." Instead of being found in static locations, they move dynamically across the game's routes whenever the player changes locations. Hunting them is notoriously tedious, as players must repeatedly check the Pokédex (if they have even seen the Pokémon) or rely on blind luck to encounter them in the wild.

## Proposal
Leverage DexHelper's ability to parse save files to extract the exact current map locations of these roaming Pokémon. We can introduce a "Roamer Radar" feature in the interactive map or as a dedicated widget.
- **Save State Extraction:** Parse the save file for the specific memory offsets that track the current route/map of active roaming Pokémon.
- **Dynamic Map Integration:** Highlight the exact route on the DexHelper map where the roaming Pokémon currently resides.
- **Status Indicators:** Display whether the roamer is active, caught, or defeated, based on event flags in the save file.

## Value Proposition
This feature eliminates one of the most frustrating and time-consuming mechanics in retro Pokémon games. By turning the opaque mechanic of roaming legendaries into a targeted hunt, DexHelper provides immense value to players striving to complete their Pokédex, further cementing the app as an essential, proactive companion tool.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to define the data requirements (save file offsets for Gen 2 and Gen 3 roamers) and UI implementation details.
