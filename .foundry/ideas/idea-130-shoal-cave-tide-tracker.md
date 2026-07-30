---
id: idea-130-shoal-cave-tide-tracker
type: IDEA
title: Shoal Cave Tide & Item Tracker (Gen 3)
status: READY
owner_persona: product_manager
created_at: '2026-07-30'
updated_at: '2026-07-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - time-based
  - item-tracker
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Shoal Cave Tide & Item Tracker (Gen 3)

## Context
In Pokémon Ruby, Sapphire, and Emerald, Shoal Cave features a unique tide mechanic driven by the game's internal RTC (Real Time Clock). High tide occurs between 09:00-15:00 and 21:00-03:00, while low tide occurs at 03:00-09:00 and 15:00-21:00. Depending on the tide, different areas are accessible, allowing the player to collect Shoal Shells (High Tide) and Shoal Salt (Low Tide) to craft the Shell Bell. Currently, DexHelper does not track RTC time or Shoal Cave item collection status from Gen 3 save files.

## Proposal
Introduce a "Shoal Cave Dashboard" specifically for Gen 3 saves.
- **Tide Predictor:** Extract the RTC value from the save file and calculate the current in-game time to determine if it is High or Low tide, displaying a countdown to the next tide change.
- **Resource Tracker:** Parse the player's inventory to display the current count of Shoal Shells and Shoal Salt.
- **Crafting Readiness:** Provide a visual indicator when the player has collected enough materials (4 Shells, 4 Salts) to craft a Shell Bell, and potentially track the daily flag for whether the old man has crafted one today.

## Value Proposition
This feature reduces player frustration by eliminating the need to guess the current in-game tide or manually check their bag for Shoal items. It provides a direct, highly specific utility for Gen 3 players that ties into DexHelper's strength of deep save file analysis, enhancing the overall game completion experience.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD outlining the technical approach for extracting the RTC and inventory counts for Shoal items.
