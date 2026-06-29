---
id: idea-095-in-game-trade-assistant
type: IDEA
title: "Gen 2/3 In-Game Trade Assistant Dashboard"
status: PENDING
owner_persona: "product_manager"
created_at: "2026-06-29"
updated_at: "2026-06-29"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 2/3 In-Game Trade Assistant Dashboard

## Problem
In Generations 2 and 3, there are numerous in-game NPCs offering fixed Pokémon trades (e.g., trading a Bellsprout for an Onix, or an Abra for a Mr. Mime). These trades often provide Pokémon with beneficial DVs/IVs, rare held items, or bonus EXP rates. However, keeping track of which trades have already been completed, and remembering which specific Pokémon species are requested by which NPC, requires tedious memorization or repeatedly consulting external wikis.

## Proposed Solution
Build an "In-Game Trade Assistant Dashboard" that:
1. Parses the save file's event flags to determine which one-time in-game NPC trades have already been completed.
2. Displays a clear list of all available vs. completed trades for the loaded save.
3. Automatically cross-references the requested Pokémon species for available trades against the player's current party and PC box contents, highlighting trades that can be executed immediately.

This turns opaque, hidden game state into an actionable, highly useful strategy for casual players, completionists, and Nuzlockers alike, removing the need for external resources and tedious PC box checking.