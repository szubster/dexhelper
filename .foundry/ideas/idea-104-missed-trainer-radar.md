---
id: idea-104-missed-trainer-radar
type: IDEA
title: Gen 1-3 Missed Trainer Radar
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: '9651663591636000441'
pr_number: null
parent: null
tags:
  - feature
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 1-3 Missed Trainer Radar

## Context
Across Generations 1 through 3, players battle hundreds of NPC trainers. Defeating trainers is critical for earning money, experience points (EXP), and specific Effort Values (EVs). However, it is incredibly easy to accidentally skip trainers by walking around their line of sight, or deliberately skip them when rushing through a route, only to forget about them later.

When players reach the endgame or get stuck on a difficult Gym Leader/Elite Four, they often need to grind. Returning to previously explored routes to find missed trainers is tedious, requiring players to talk to every single NPC to see if they initiate a battle. The game provides no way to track which specific trainers have been defeated and which are still waiting for a battle.

## Proposal
Leverage DexHelper's capability to read event flags and hidden state from the save file to create a **Missed Trainer Radar**.
- **Global Scan:** Parse the save file's trainer defeat flags to build a complete list of every available trainer in the game and their current status (defeated vs. undefeated).
- **Missed Trainer Dashboard:** Create a UI view that filters for trainers the player has *encountered* (based on visited locations/badges) but *not yet defeated*.
- **Actionable Intel:** For each missed trainer, display their exact route/location, the Pokémon on their team (species and level), and the aggregate EXP/EVs/Money yielded by defeating them.

## Value Proposition
This directly solves the classic retro gaming pain point of "I need more EXP, did I miss anyone on Route 13?". By surfacing hidden event flags, we transform static game knowledge into a highly personalized, actionable "bounty board". This aligns perfectly with DexHelper's vision as a premium companion app, helping players optimize their playthrough and eliminate tedious guesswork without needing to reference external guides.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to detail the event flags to parse for trainer battles across Gens 1-3 and define the UI presentation.
- [ ] prd-104-109-missed-trainer-radar
