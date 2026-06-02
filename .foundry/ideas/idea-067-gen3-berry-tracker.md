---
id: idea-067-gen3-berry-tracker
type: IDEA
title: Gen 3 Berry Farming Tracker
status: ACTIVE
owner_persona: product_manager
created_at: '2026-05-29'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: '12010335444479552523'
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - berries
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Berry Farming Tracker

## Context
In Generation 3 (Ruby/Sapphire/Emerald), growing berries is a major mechanic, requiring players to plant them in loamy soil across the region and wait for them to grow over real-world hours using the game cart's RTC (Real Time Clock). Keeping track of where berries are planted, when they need to be watered, and when they are ready to harvest is entirely manual and easy to forget.

## Proposal
Leverage DexHelper's save file parsing to read the state of all berry patches and the RTC.
- **Visual Map Integration:** Display active berry patches on the map, indicating their current growth stage (Planted, Sprouted, Taller, Flowering, Ripe).
- **Harvest Reminders:** Calculate real-time estimates for when berries will be ready to harvest or when they need watering based on the current save file RTC compared to the system clock.
- **Berry Yield Optimization:** Show players which patches they should visit to maximize their yields, assisting in endgame tasks like Pokéblock blending.

## Value Proposition
This automates a tedious real-world time-gated mechanic, acting as an active companion tool that encourages players to return to the game at specific times. It perfectly complements the Gen 3 support and expands DexHelper's utility beyond static collections.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD detailing the berry patch data structures and UI implementation.
- [ ] .foundry/prds/prd-067-037-gen3-berry-tracker.md
