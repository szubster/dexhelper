---
id: idea-087-pokeblock-analyzer
type: IDEA
title: Gen 3 Pokéblock Inventory and Contest Planner
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
  - gen3
  - contests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Pokéblock Inventory and Contest Planner

## Context
Generation 3 introduced Pokémon Contests and the complex mechanic of Pokéblocks. Pokéblocks are created by blending berries and have hidden "Feel" and "Flavor" stats. Players store these in their Pokéblock Case. The in-game UI only shows a color and a level, completely hiding the exact flavor profiles and feel values, which makes it incredibly difficult to optimize feeding a Pokémon to maximize its Condition (Cool, Beauty, etc.) without maxing out its Sheen prematurely.

## Proposal
Leverage DexHelper's save file parsing to extract the exact stats of every Pokéblock currently in the player's Pokéblock Case.
- **Inventory Viewer:** Display a list of all Pokéblocks with their exact Feel and Flavor values (Spicy, Dry, Sweet, Bitter, Sour).
- **Optimization Planner:** Since DexHelper already knows the Contest stats and Nature of every Pokémon in the PC, we can build a tool that suggests which specific Pokéblocks from the inventory should be fed to a selected Pokémon to optimally max out a desired Contest Condition.

## Value Proposition
This perfectly builds upon the existing Gen 3 Contest tracking features. It takes an incredibly opaque, math-heavy game mechanic (balancing flavor preferences based on Nature against the hidden Feel limit) and turns it into a clear, actionable strategy. It replaces external spreadsheets with an integrated, offline-first solution.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to investigate the data structure of the Gen 3 Pokéblock Case in the save file.