---
id: idea-088-trick-house-tracker
type: IDEA
title: Gen 3 Trick House Progression Tracker
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-25'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: '3436236107999557384'
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Trick House Progression Tracker

## Context
In Generation 3 (Ruby, Sapphire, Emerald), the Trick House on Route 110 is a multi-stage puzzle challenge that updates as the player earns more Gym Badges. There are 8 distinct puzzles in total. The game stores the player's current progression (which puzzle is active, whether it has been completed, and if the reward has been claimed) in the save file. Players often forget their progress in the Trick House as they travel across the region, missing out on unique rewards like the Tent or specific hold items.

## Proposal
Leverage DexHelper's save file parsing to extract the current Trick House progression state.
- **Progression Dashboard:** Create a localized view for Route 110 that explicitly shows the player's current Trick House status (e.g., "Puzzle 4 Available", "Puzzle 5 Completed - Claim Reward", "Awaiting Next Badge for Puzzle 6").
- **Reward Preview:** Display the reward associated with the currently available or next upcoming puzzle to incentivize the player to complete it.

## Value Proposition
This targets a highly localized, easily forgettable side-quest mechanic. By surfacing this specific progression state, DexHelper provides a perfect "companion" feature that reminds players of actionable content they might otherwise skip entirely, fitting perfectly into the app's offline-first utility model without overlapping with macroscopic tracking systems like the Pokédex or Contests.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to investigate the exact save file offsets and bitflags used to track the Trick House puzzle state in Ruby/Sapphire/Emerald.
- [ ] .foundry/prds/prd-088-054-trick-house-tracker.md
