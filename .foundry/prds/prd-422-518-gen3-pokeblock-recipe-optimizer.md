---
id: prd-422-518-gen3-pokeblock-recipe-optimizer
type: PRD
title: Gen 3 Pokéblock Recipe Optimizer for Contest Conditions
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-03'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: '11748372404444017979'
parent: idea-422-gen3-pokeblock-recipe-optimizer
tags:
  - dexhelper
  - gen3
  - contests
  - optimization
rejection_count: 0
rejection_reason: ''
locks: []
---

# Gen 3 Pokéblock Recipe Optimizer for Contest Conditions

## 1. Context & Problem Statement
In Generation 3 (Ruby, Sapphire, Emerald), maximizing a Pokémon's Contest Condition (Cool, Beauty, Cute, Smart, Tough) is incredibly difficult. It requires feeding them Pokéblocks made from blending Berries. A Pokémon can only eat a limited number of Pokéblocks (determined by its "Feel" stat maxing out at 255).

Players attempting to win Master Rank Contests or max out Feebas's Beauty for Milotic evolution often ruin their Pokémon by feeding them suboptimal Pokéblocks, maxing out their Feel before achieving the necessary condition stats. Since the game saves immediately when feeding, mistakes are permanent. Calculating the optimal sequence of berries to blend, considering the player's available berry inventory and the target Pokémon's Nature (which affects flavor preference and stat gains), requires complex external spreadsheets.

## 2. Proposed Solution
Create a **Pokéblock Recipe Optimizer** that reads the player's save file (Party/PC stats, Nature, and current Berry Pouch inventory).
1. **Target Selection:** The player selects a Pokémon from their Box/Party and their goal (e.g., "Max Beauty for Milotic" or "All-Around Master Rank").
2. **Inventory Awareness:** The tool reads the player's current Berry inventory from the save file.
3. **Recipe Generation:** Utilizing known Pokéblock blending formulas and the Pokémon's Nature modifier, the tool calculates and suggests the optimal combination of berries to blend and feed to reach the target condition without exceeding the max Feel (255) limit.
4. **Feasibility Check:** If the target is impossible with the current berry inventory, it explicitly tells the user which specific berries they need to grow or find.

## 3. Product Requirements
- Must accurately read the Gen 3 berry pouch inventory from the save file.
- Must accurately read a Pokémon's current condition stats and Nature.
- Must implement the mathematical formulas for Gen 3 Pokéblock blending and stat gains/feel:
  - **Feel (Smoothness):** Max of (Average Smoothness of all berries used, MIN(Smoothness of any berry used)). If Feel exceeds 255, the Pokémon cannot eat anymore.
  - **Flavor (Condition Gains):** Each berry contributes to Cool (Spicy), Beauty (Dry), Cute (Sweet), Smart (Bitter), and Tough (Sour). The base flavor of the block is the sum of flavors of the berries, minus any negative flavors, divided by the number of players minus 1 (or 1 for NPC blending).
  - **Nature Modifiers:** Natures multiply specific condition gains. For example, a Modest Nature (Likes Dry, Dislikes Spicy) will increase Beauty gains by 1.1x and decrease Cool gains by 0.9x.
- Must provide an interactive UI for users to select their goal and view the optimal sequence of berries to blend and feed.
- Must alert the user if their goal is impossible with their current resources.


## Acceptance Criteria
- [ ] epic-518-540-gen3-pokeblock-recipe-optimizer
- [x] Create an EPIC to manage the implementation of the Pokéblock Recipe Optimizer.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification
