---
id: idea-064-smart-route-radar
type: IDEA
title: Smart Route Radar / Context-Aware Missing Encounter Map
status: PENDING
owner_persona: product_manager
created_at: '2026-05-23'
updated_at: '2026-05-23'
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
rejection_reason: ""
notes: ""
---

# Idea: Smart Route Radar / Context-Aware Missing Encounter Map

## Context
DexHelper currently provides excellent static data viewing (Pokédex, maps, encounters) and passive save state viewing (current PC boxes, party). However, users hunting for missing Pokémon must manually cross-reference their missing Pokédex entries with the static encounter tables to figure out where they need to go next in the game. This creates friction and breaks the flow of gameplay.

## Proposal
Transform the existing static map views into a dynamic, context-aware "Smart Route Radar".
- By intersecting the static encounter data for each location with the user's dynamic save state (which Pokémon they have caught or seen), we can visually highlight routes and areas on the map where uncaught Pokémon are currently available.
- The UI could feature "heatmaps" or distinct icons indicating the density of missing encounters in specific areas.
- Users could click on a highlighted route to immediately see exactly *which* missing Pokémon are there, their encounter rates, and specific requirements (e.g., fishing, surfing, time of day).

## Value Proposition
This shifts DexHelper from being just a passive reference manual and save viewer into a proactive "Active Guide" companion. It directly assists the core gameplay loop of "Gotta Catch 'Em All" by minimizing tedious manual lookup and guiding the player's next steps, offering immense value to completionists and casual players alike.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD outlining the technical approach for joining static encounter data with dynamic save state in the UI.
