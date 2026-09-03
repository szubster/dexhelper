---
id: idea-488-nuzlocke-level-cap-tracker
type: IDEA
title: Hardcore Nuzlocke Level Cap Tracker
status: CANCELLED
owner_persona: product_manager
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - nuzlocke
research_references: []
rejection_count: 0
rejection_reason: 'Maintainer explicitly rejected: No nuzlocke. Ever.'
notes: ''
---

# Idea: Hardcore Nuzlocke Level Cap Tracker

## Context
Hardcore Nuzlockes enforce a strict "Level Cap" rule, preventing the player from leveling any Pokémon past the highest leveled Pokémon of the next Gym Leader before the battle. Manually keeping track of these caps and constantly checking Pokémon EXP bars is tedious and error-prone.

## Proposal
Leverage the save file parsing to extract the player's current Gym Badges to dynamically determine the next upcoming Gym Leader. Map this to a static database of level caps per game. Display the current level cap prominently in the DexHelper UI, and proactively flag Party Pokémon that are dangerously close to exceeding it.

## Value Proposition
Significantly reduces mental overhead for challenge runners. It turns DexHelper into an essential real-time companion for Hardcore Nuzlockes by automating another crucial constraint of the ruleset.
