---
id: idea-113-gen3-pokeblock-stats-viewer
type: IDEA
title: Gen 3 Pokéblock Exact Stats Viewer
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-12'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: '10342753816827464540'
pr_number: null
parent: null
tags:
  - gen3
  - contests
  - pokeblocks
  - quality-of-life
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Pokéblock Exact Stats Viewer

## Overview
In Generation 3 (Ruby, Sapphire, Emerald), Pokéblocks are created by blending Berries and are used to raise a Pokémon's Contest stats (Cool, Beauty, Cute, Smart, Tough). However, the in-game UI obfuscates the exact numerical values of the flavors and "feel" (smoothness) of the Pokéblocks stored in the player's Pokéblock Case. The game only shows a vague level and a primary flavor color.

## Problem
Competitive Contest players, especially those attempting the Ribbon Master challenge, need to optimize their Pokémon's condition. The hidden "feel" stat restricts how many Pokéblocks a Pokémon can eat before it becomes full. Not knowing the exact flavor numbers (which increase contest stats) and the exact feel of existing Pokéblocks makes it incredibly difficult to plan the optimal feeding strategy without external spreadsheets and manually tracking every blend.

## Proposed Solution
Introduce a "Pokéblock Exact Stats Viewer" for Gen 3.
1.  **Pokéblock Case Parsing:** Extract the player's Pokéblock Case data from the save file. This data includes the exact flavor values and the feel for every block currently stored.
2.  **Detailed Inventory UI:** Create a dedicated dashboard that lists all Pokéblocks currently in the player's inventory, revealing the hidden, exact numerical values for all five flavors and the feel for each block.
3.  **Actionable Insight:** By surfacing this hidden state, players can instantly see the exact nutritional value of their inventory, allowing them to calculate optimal feeding paths to max out Contest stats for their Ribbon Masters, eliminating the guesswork and manual tracking of the opaque in-game system.

This aligns perfectly with DexHelper's vision as a premium companion app by turning hidden save state into actionable, precise data for hardcore players.

## Acceptance Criteria
- [ ] Transition this Idea into a PRD.
