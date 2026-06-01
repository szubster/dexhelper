---
id: idea-064-smart-route-radar
type: IDEA
title: Smart Route Radar / Context-Aware Missing Encounter Map
status: PENDING
owner_persona: product_manager
created_at: '2026-05-23'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: '8502424147329753709'
pr_number: null
parent: null
tags:
  - feature
  - ux
  - map
  - exploration
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Idea: Smart Route Radar / Context-Aware Missing Encounter Map

## Context
DexHelper currently provides excellent static data viewing (Pokédex, maps, encounters) and passive save state viewing (current PC boxes, party). However, users hunting for missing Pokémon must manually cross-reference their missing Pokédex entries with the static encounter tables to figure out where they need to go next in the game. This creates friction and breaks the flow of gameplay.

## Proposal
While the `suggestionEngine` already intelligently calculates "Local" and "Nearby" missing encounters behind the scenes, this data is currently only surfaced as a linear text list in the Assistant Panel.

This idea proposes transforming this data into a new, interactive **Visual Map UI** (the "Smart Route Radar").
- Create a spatial map view (e.g., of Johto/Kanto/Hoenn) that dynamically highlights routes and areas where uncaught Pokémon are currently available.
- The UI could feature "heatmaps" or distinct tactical icons indicating the density of missing encounters in specific regions.
- Users could click on a highlighted map node to immediately see exactly *which* missing Pokémon are there, their encounter rates, and specific requirements (e.g., fishing, surfing, time of day).

## Value Proposition
Visualizing the assistant's data geographically shifts DexHelper from being just a linear checklist into a proactive "Active Guide" companion. It directly assists the core gameplay loop of "Gotta Catch 'Em All" by allowing players to visually plan their travel routes through the region, offering immense value to completionists and casual players alike.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD outlining the technical approach for joining static encounter data with dynamic save state in the UI.

- Created PRD: `.foundry/prds/prd-064-035-smart-route-radar.md`
