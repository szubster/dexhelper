---
id: idea-091-smart-egg-move-path-finder
type: IDEA
title: Smart Egg Move Breeding Path Finder
status: READY
owner_persona: product_manager
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - tool
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Smart Egg Move Breeding Path Finder

## Context
Breeding for "Egg Moves" (moves a Pokémon can only learn by inheriting them from a father of a different species within the same Egg Group) is a core mechanic for competitive battling and challenge runs in Gen 2 and Gen 3. Planning a breeding chain often requires external wikis, multiple steps (e.g., teaching Move X to Species A, breeding A with B to get C, then breeding C with D), and painstakingly checking if the player actually owns the necessary intermediate Pokémon with the correct genders.

## Proposal
Leverage DexHelper's static database (Egg Groups, Egg Moves, learnsets) and combine it with the player's dynamic save state (their actual PC boxes and party) to create an automated "Smart Egg Move Path Finder."
- **Goal Selection:** The user selects a target Pokémon and a desired Egg Move.
- **Dynamic Pathfinding:** DexHelper calculates the shortest breeding chain to achieve this.
- **Inventory Integration:** Critically, the tool highlights which required "parents" the player *already owns* in their save file (checking for correct species and male gender), and identifies missing links they need to go catch.

## Value Proposition
This feature eliminates the need for complex, manual cross-referencing between wikis and the game UI. By joining complex static pathfinding data with the player's dynamic inventory, DexHelper provides a highly personalized, actionable strategy that is impossible to achieve with standard guides. This heavily reinforces DexHelper as the ultimate, indispensable companion app for hardcore players.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to investigate the graph algorithms needed to calculate breeding chains across Egg Groups.
