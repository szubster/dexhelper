---
id: idea-111-safari-zone-tracker
type: IDEA
title: Gen 1 & Gen 3 Safari Zone Tracking Dashboard
status: PENDING
owner_persona: product_manager
created_at: '2026-07-11'
updated_at: '2026-07-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - ui
  - safari-zone
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 1 & Gen 3 Safari Zone Tracking Dashboard

## The Problem
The Safari Zone is a staple mechanic in Generation 1 (Kanto) and Generation 3 (Hoenn, Emerald expansion). It features rare, version-exclusive Pokémon with notoriously low catch rates (e.g., Chansey, Kangaskhan, Tauros, Heracross) spread across multiple distinct "Areas" within the zone.

Because the encounter tables and spawn rates are completely hidden from the player, and because players are restricted by time (steps) and resources (Safari Balls), hunting for specific rare Pokémon becomes incredibly frustrating. Players often run out of time searching in the wrong area, completely unaware that a specific Pokémon doesn't even spawn there.

## Proposed Solution
Introduce a dedicated "Safari Zone Tracking Dashboard" in DexHelper. By parsing the user's specific game version and current save state (to determine unlock progression, such as the Johto/Hoenn expansions in Emerald), we can provide a live, actionable map of the Safari Zone.

### Key Features:
1. **Target Identification:** Users select the rare Safari Zone Pokémon they are hunting from a dropdown list.
2. **Area Highlighting:** The dashboard highlights the specific Area(s) within the Safari Zone where that Pokémon spawns in their specific game version, removing all guesswork.
3. **Completion Status:** The dashboard cross-references the Safari Zone encounter tables with the player's current Pokédex and PC Boxes to instantly highlight which rare Safari encounters they have completely missed or not yet caught, generating an actionable "bounty board".

## Value Proposition
Targeting specific, constrained sub-mechanics (like the Safari Zone) aligns perfectly with DexHelper's vision as a premium companion app. It eliminates the need for players to constantly tab out to external wikis to check encounter tables. By crossing static game data (spawn locations) with dynamic save data (owned Pokémon), we provide an instant, actionable to-do list that removes the friction from one of the most notoriously tedious mechanics in the retro games.
## Acceptance Criteria
- [ ] prd-111-113-safari-zone-tracker
