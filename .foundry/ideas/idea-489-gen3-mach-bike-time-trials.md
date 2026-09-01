---
id: idea-489-gen3-mach-bike-time-trials
type: IDEA
title: Gen 3 Cycling Road Time Trial Analyzer
status: PENDING
owner_persona: product_manager
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: '13251298276630983260'
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - mini-game
---

# Idea: Gen 3 Cycling Road Time Trial Analyzer

## Context
In Generation 3 (Ruby, Sapphire, Emerald), the Seaside Cycling Road (Route 110) features a hidden mini-game where the player's time and number of collisions are recorded while riding from the north entrance to the south entrance.
The player's best time and collision count are stored in the save file and can be checked by interacting with the PC inside the southern gatehouse. Hardcore players often try to optimize their route to get the absolute lowest time with zero collisions, but comparing times requires physically traveling to the gatehouse in-game.

## Proposal
Create a dedicated "Cycling Road Time Trial Analyzer" within DexHelper.
- **Save File Extraction:** DexHelper will read the hidden `SaveBlock1` variables corresponding to the player's best Seaside Cycling Road time (measured in frames/seconds) and their total number of collisions.
- **Leaderboard UI:** Surface this data in a clean, dedicated widget on the Gen 3 dashboard, showing the player's exact best time and collision count.
- **Improvement Tracking:** By comparing the currently loaded save against the previous save file stored in the `SaveHistoryDB`, DexHelper can highlight when the player has achieved a new personal best time.

## Value Proposition
This feature perfectly aligns with DexHelper's goal of surfacing hidden save data and providing premium utilities for completionists and hardcore players. It takes an opaque, location-locked piece of in-game data and makes it instantly accessible on the web dashboard, adding a fun, gamified element to save file analysis.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.
