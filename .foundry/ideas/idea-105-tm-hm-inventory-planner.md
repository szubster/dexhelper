---
id: idea-105-tm-hm-inventory-planner
type: IDEA
title: Gen 1-3 TM/HM Inventory & Compatibility Planner
status: READY
owner_persona: product_manager
created_at: '2026-07-07'
updated_at: '2026-07-07'
depends_on: []
jules_session_id: null
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

# Idea: Gen 1-3 TM/HM Inventory & Compatibility Planner

## Context
In Generations 1 through 3, Technical Machines (TMs) are generally single-use items (unlike in later generations where they become infinite use). Because many powerful TMs (like Earthquake, Ice Beam, Thunderbolt) are unique or very expensive to acquire, players suffer from "Elixir Syndrome"—hoarding TMs indefinitely because they are afraid of wasting them on the wrong Pokémon.

Furthermore, checking which Pokémon in the PC box can actually learn a specific TM requires a tedious process of selecting the TM in the bag and manually scrolling through every single Pokémon in the party or PC.

## Proposal
Leverage DexHelper's save parsing to read the player's Bag inventory and PC Box contents to create a **TM/HM Inventory & Compatibility Planner**.
- **Inventory Dashboard:** Parse the save file's item bag to display exactly which TMs and HMs the player currently owns, and the quantity.
- **Instant Compatibility Matrix:** When a user selects a TM they own, the app instantly cross-references the move's compatibility against all Pokémon currently in their Party and PC Boxes.
- **Learnset Overlay:** Show which Pokémon can learn the TM but do not currently have a move of that type, providing strategic suggestions for team building.
- **Acquisition Tracking:** For TMs the player *doesn't* have (and hasn't acquired the one-time pickup for), display where they can be found (similar to the Missing Hidden Items Finder), parsed from event flags.

## Value Proposition
This directly solves a massive anxiety and friction point in retro Pokémon games: resource management of finite, highly valuable items. By bridging the player's static inventory with their dynamic PC box contents, we turn DexHelper into an essential team-building planner, preventing players from having to check wikis for compatibility or hoard TMs endlessly. This perfectly aligns with the premium companion app philosophy.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to detail the save structure for the Item Bag across Gens 1-3 and the UI presentation.
- [ ] prd-105-110-tm-hm-inventory-planner
