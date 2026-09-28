---
id: idea-531-gen1-casino-slot-luck-analyzer
type: IDEA
title: Gen 1 Celadon Game Corner Slot Machine Luck Predictor
status: PENDING
owner_persona: product_manager
created_at: '2026-09-28'
updated_at: '2026-09-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - gen1
  - game-corner
  - save-engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Gen 1 Celadon Game Corner Slot Machine Luck Predictor

## Context
In Generation 1 (Pokémon Red, Blue, and Yellow), acquiring essential items like TM13 (Ice Beam), TM24 (Thunderbolt), TM35 (Flamethrower), and key Pokémon like Porygon, Dratini, or Abra requires thousands of coins from the Celadon Game Corner.
While slot machines seem entirely random, Gen 1's disassembly reveals that upon entering the Game Corner, the game assigns distinct payout odds profiles ("lucky" vs "normal" vs "bad") to each of the 30 slot machines. One specific machine is randomly designated as the "Super Lucky" machine with significantly higher payout probabilities and 777 alignment frequency. However, in-game NPC dialogue gives vague hints, leaving players to waste thousands of coins testing machines manually.

## Proposed Solution
Introduce a "Celadon Slot Machine Predictor" in DexHelper's Gen 1 dashboard. By parsing the loaded Gen 1 save file (`wSlotMachineFlags` / RAM state offsets), DexHelper can identify and highlight the exact machine index currently flagged as "Super Lucky".

* **Interactive Game Corner Floorplan:** Display a visual map/grid representing the 30 slot machines in the Celadon Game Corner.
* **Lucky Machine Highlighting:** Explicitly mark the current "Super Lucky" slot machine for the loaded save state.
* **Payout Probability Breakdown:** Display the odds modifier and expected return rate for each machine row/table.
* **Coin ROI Calculator:** Calculate estimated coins needed vs average spins to reach targets (e.g. 9999 coins for Porygon in Red/Blue).

## Strategic Value
This feature directly reinforces DexHelper's core value proposition: surfacing obfuscated retro game mechanics to eliminate mindless grinding for players. Coin farming in Celadon is one of the most infamous grinds in Gen 1, and predicting lucky slot machines offers immediate, high-value utility for retro collectors, casual players, and speed/challenge runners alike.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD to detail requirements for Celadon Game Corner slot machine state parsing.
