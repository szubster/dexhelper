---
id: prd-064-035-smart-route-radar
type: PRD
title: Smart Route Radar / Context-Aware Missing Encounter Map
status: PENDING
owner_persona: epic_planner
created_at: '2026-05-23'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: '3180153957064964970'
pr_number: null
parent: idea-064-smart-route-radar
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

# PRD: Smart Route Radar / Context-Aware Missing Encounter Map

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

## Technical Approach
1.  **Data Unification**: The frontend map visualization components (like those defined for Gen 3 in `ADR 010`) need to integrate with the dynamic suggestions emitted by the `suggestionEngine`.
2.  **Heatmap Generation**: We must create a UI overlay layer for the map graph that can take an array of suggested locations and calculate density or priority.
3.  **Interactive Nodes**: The map nodes must be clickable, triggering a detail view that shows the specific missing encounters, similar to the existing static map views but filtered by the user's save state.

## Next Steps
- [x] Architect: Convert this PRD into an ADR detailing the system design for joining static encounter data with dynamic save state in the UI.


## Generated Tasks
- [x] [task-035-142-smart-radar-adr](.foundry/tasks/task-035-142-smart-radar-adr.md)
- [x] [epic-035-048-smart-radar-data-unification](.foundry/epics/epic-035-048-smart-radar-data-unification.md)
- [x] [epic-035-049-smart-radar-heatmap-generation](.foundry/epics/epic-035-049-smart-radar-heatmap-generation.md)
- [x] [epic-035-050-smart-radar-interactive-ui](.foundry/epics/epic-035-050-smart-radar-interactive-ui.md)
