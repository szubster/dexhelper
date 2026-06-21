---
id: idea-086-pokeradar-chain-tracker
type: IDEA
title: Gen 4 Poké Radar Chain Tracker
status: PENDING
owner_persona: product_manager
created_at: '2026-06-25'
updated_at: '2026-06-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen4
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 4 Poké Radar Chain Tracker

## Context
Generation 4 (Diamond/Pearl/Platinum) introduced the Poké Radar, a tool used to chain encounters of the same Pokémon species to increase the odds of finding a Shiny Pokémon (up to a chain of 40). The game provides a very limited "Pokétch" app to view the top 3 longest chains, but tracking the *current* chain during an active hunt is entirely manual and highly stressful. If a player saves and closes the game, or simply forgets their current count, they can ruin hours of progress.

## Proposal
Leverage DexHelper's save file parsing to extract the player's active Poké Radar chain data directly from Gen 4 save files.
- **Active Chain Display:** Show the current active chain species and the exact chain length (e.g., "Active Chain: Shinx, Length: 38").
- **Shiny Odds Calculator:** Display the current odds of finding a shiny patch based on the active chain length.
- **Historical Top Chains:** Extract and display the player's top 3 historical chains (which the game already stores for the Pokétch app), providing a permanent record of their best hunts.

## Value Proposition
This perfectly aligns with DexHelper's vision of surfacing hidden or hard-to-track state to provide actionable utility. Shiny hunting via Poké Radar is one of the most popular endgame activities in Gen 4, and removing the need for manual counters or the fear of losing track provides immense value to the hardcore playerbase.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to investigate exactly where Gen 4 save files store the current active chain counter and species ID.
