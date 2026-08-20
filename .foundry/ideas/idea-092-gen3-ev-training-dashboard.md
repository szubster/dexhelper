---
id: idea-092-gen3-ev-training-dashboard
type: IDEA
title: Gen 3 Effort Value (EV) Training Dashboard
status: COMPLETED
owner_persona: product_manager
created_at: '2026-06-29'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
parent: null
tags:
  - gen3
  - save-engine
  - endgame
  - competitive
rejection_reason: ''
---

# Gen 3 Effort Value (EV) Training Dashboard

## Problem
In Generation 3, Effort Values (EVs) are completely hidden from the player. Players have to manually track every defeated Pokémon with a spreadsheet or pen and paper to ensure they distribute the 510 total EVs optimally. The only in-game feedback is an NPC in Slateport City who gives an Effort Ribbon when a Pokémon reaches the 510 maximum, but provides zero insight into the distribution across the six stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed). This makes competitive training incredibly tedious and error-prone.

## Proposed Solution
Leverage DexHelper's save parsing engine to extract the exact EV distribution for all Pokémon in the player's party and PC. Create a new "EV Training Dashboard" that visualizes these hidden stats directly.

Features should include:
- A radar chart or clear bar graph showing the exact numerical EV distribution for each Pokémon.
- An "EVs Remaining" counter to easily see how many points are left to hit the 510 cap.
- A quick reference for which nearby routes or trainers yield specific EVs to help plan the rest of the training.

This directly aligns with DexHelper's vision as a premium companion app that surfaces hidden game state to eliminate tedious manual tracking for hardcore players.

- [x] .foundry/prds/prd-092-056-gen3-ev-training-dashboard.md
