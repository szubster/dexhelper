---
id: idea-423-gen3-pokeblock-blender-assistant
type: IDEA
title: Idea: Gen 3 Pokéblock Blender Assistant
status: PENDING
owner_persona: product_manager
created_at: '2026-08-28'
updated_at: '2026-08-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - contests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Pokéblock Blender Assistant

## Context
In Generation 3 (Ruby, Sapphire, Emerald), Pokémon Contests are a major post-game activity. To win Master Rank contests, players must feed their Pokémon Pokéblocks to max out their condition stats (Cool, Beauty, Cute, Smart, Tough). Blending high-quality Pokéblocks (high Level, low Feel) requires understanding complex math involving the berries used, the number of participants, and the RPM achieved during the mini-game. Players often struggle to determine the optimal berry combinations to maximize their Pokémon's stats without hitting the "Feel" limit (which prevents feeding them more blocks).

## Proposal
Create a "Pokéblock Blender Assistant" within DexHelper.
- **Berry Inventory Sync:** Read the player's save file to extract their current berry inventory (quantity of each berry).
- **Target Condition Planner:** Allow the player to select a target Pokémon from their PC/Party and specify which Contest stat(s) they want to max out (e.g., Beauty for Milotic evolution, or all stats for a Contest Master).
- **Recipe Generator:** Implement the Gen 3 Pokéblock blending math to simulate combinations. Generate a prioritized list of "recipes" (combinations of 1-4 berries) that the player can blend with NPCs or friends to achieve the exact blocks needed. The assistant should filter recipes to only use berries the player currently owns, or suggest which berries to farm next if their inventory is insufficient.
- **Milotic Evolution Helper:** A specific quick-action preset to generate the easiest recipe to hit the 170 Beauty requirement for Feebas to evolve into Milotic, using the player's available berries.

## Value Proposition
This feature demystifies one of the most mechanically opaque and mathematically complex systems in Generation 3. It perfectly aligns with DexHelper's vision of turning hidden formulas into actionable, satisfying checklists. It directly complements the "Gen 3 Berry Farming Tracker" (idea-067) and "Gen 3 Feebas Tile Predictor" (idea-066).

## Next Steps
- [x] Product Manager: Create a PRD to detail the Pokéblock math logic, the UI layout for the recipe generator, and the specific data structures needed for the berry inventory sync.

## Acceptance Criteria
- [ ] prd-423-xxx-gen3-pokeblock-blender-assistant
