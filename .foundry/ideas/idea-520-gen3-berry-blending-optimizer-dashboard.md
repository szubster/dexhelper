---
id: idea-520-gen3-berry-blending-optimizer-dashboard
type: IDEA
title: Gen 3 Berry Blending Optimizer Dashboard
status: ACTIVE
owner_persona: product_manager
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - gen3
  - contests
research_references: []
rejection_reason: ''
---

# Idea: Gen 3 Berry Blending Optimizer Dashboard

## Context
In Generation 3 (Ruby, Sapphire, Emerald), creating optimal Pokéblocks for Pokémon Contests or maxing out Feebas's Beauty condition (for evolution to Milotic) is notoriously complex. The effectiveness of a Pokéblock depends on the specific combination of berries blended, the number of NPCs/players blending, and the target Pokémon's Nature, which affects both flavor preference and stat gains. Since the game saves immediately upon feeding a Pokéblock, mistakes are permanent, often ruining a Pokémon's potential if its "Feel" maxes out before its condition stats reach the required levels.

Currently, players rely on external spreadsheets or calculators, manually inputting their available berry inventory to figure out the best recipes. While IDEA-422 proposed a recipe optimizer, we need to bring this capability directly into DexHelper's UI.

## Proposal
Develop a "Berry Blending Optimizer Dashboard" within DexHelper. By parsing the player's save file, DexHelper can:
1. Extract the player's current Berry Pouch inventory.
2. Read the specific Nature and current contest condition stats of a target Party/PC Pokémon (e.g., a Feebas or Contest entrant).
3. Automatically calculate and recommend the optimal sequence of berries to blend and feed to reach the target condition stats without exceeding the maximum "Feel".
4. Present these recommendations in an intuitive, step-by-step UI checklist.

## Value Proposition
- Eliminates the need for external spreadsheets and manual data entry.
- Prevents players from permanently ruining valuable Pokémon due to suboptimal Pokéblock feeding.
- Greatly simplifies the high-friction mechanics of Pokémon Contests and Feebas evolution, enhancing DexHelper's value as a premium companion app.
