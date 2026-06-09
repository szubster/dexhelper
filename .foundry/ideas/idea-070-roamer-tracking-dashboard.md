---
id: idea-070-roamer-tracking-dashboard
type: IDEA
title: Roaming Pokémon Tracking Dashboard
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-08'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: '14871046946683743025'
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

*Note: It is highly likely that the underlying engine logic for tracking roamers already exists in DexHelper in some form. If so, this idea focuses on improving the visibility of that existing data through dedicated UI enhancements.*

## Proposal
Leverage DexHelper's ability to parse save files to extract the exact current map locations of these roaming Pokémon. We can introduce a "Roamer Radar" feature in the interactive map or as a dedicated widget.
- **Save State Extraction / Verification:** Verify if the engine currently extracts the memory offsets that track the current route/map of active roaming Pokémon. If not, implement the parsing. If it does exist, ensure the data is exposed to the frontend.
- **Dynamic Map Integration:** Highlight the exact route on the DexHelper map where the roaming Pokémon currently resides.
- **Status Indicators:** Display whether the roamer is active, caught, or defeated, based on event flags in the save file.

## Value Proposition
This feature eliminates one of the most frustrating and time-consuming mechanics in retro Pokémon games. By turning the opaque mechanic of roaming legendaries into a targeted hunt, DexHelper provides immense value to players striving to complete their Pokédex, further cementing the app as an essential, proactive companion tool.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to evaluate if the roamer tracking logic currently exists in the codebase and define the required UI implementation details.
