---
id: idea-488-nuzlocke-tracker-dashboard
type: IDEA
title: Dedicated Nuzlocke Tracker Dashboard
status: PENDING
owner_persona: product_manager
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: '13251298276630983260'
pr_number: null
parent: null
tags:
  - feature
  - nuzlocke
  - gen1
  - gen2
  - gen3
---

# Idea: Dedicated Nuzlocke Tracker Dashboard

## Context
A huge portion of the Pokémon community plays under "Nuzlocke" rules—self-imposed challenges where players can only catch the first Pokémon on each route, and if a Pokémon faints, it's considered dead and must be released or permanently boxed. Currently, players use external websites, spreadsheets, or physical notebooks to track their valid encounters per route, their team's deaths, and upcoming gym leader level caps.

While DexHelper can already read the PC boxes and Party to show the player's Pokémon, it does not explicitly track the metadata required for a Nuzlocke run (e.g., encounter mapping per route, graveyard/dead box tracking, level cap warnings).

## Proposal
Create a dedicated "Nuzlocke Tracker Dashboard" within DexHelper.
- **Route Tracker:** A visual list of all routes in the current game. DexHelper will automatically read the `met_location` data of all caught Pokémon in the save file to automatically check off routes where an encounter has already been obtained, eliminating manual bookkeeping.
- **Graveyard Tracker:** Allow the user to designate a specific PC Box (e.g., "Box 14") as the "Graveyard". DexHelper will style these Pokémon differently (e.g., greyscale) and maintain a "Death Log" of lost team members.
- **Level Cap Warnings:** Based on the player's current badge count (read from the save file), DexHelper will explicitly warn the user if any Party Pokémon are approaching the next Gym Leader's level cap, preventing accidental over-leveling.

## Value Proposition
This transforms DexHelper from a passive save viewer into an active, indispensable tool for the massive challenge-running community. By automatically pulling met locations and badge data directly from the save file, DexHelper can completely replace manual Nuzlocke tracking spreadsheets, offering a seamless, zero-friction challenge run experience.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.
