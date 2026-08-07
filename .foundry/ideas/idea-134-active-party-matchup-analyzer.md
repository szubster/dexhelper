---
id: idea-134-active-party-matchup-analyzer
type: IDEA
title: Gen 1-3 Active Party Matchup Analyzer
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-03'
updated_at: '2026-08-07'
depends_on: []
jules_session_id: '14418296026180754481'
pr_number: null
parent: null
tags:
  - feature
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 1-3 Active Party Matchup Analyzer

## Context
When progressing through Generations 1 to 3, players face increasingly difficult Gym Leaders, Rival battles, and Evil Team bosses. A common friction point is losing a boss fight, grinding unnecessarily, or realizing too late that a Pokémon sitting idle in the PC Box, or a specific TM in the inventory, would have completely trivialized the encounter.

While players know their active party, they often struggle to conceptualize their *entire available roster* against the impending threat. DexHelper already has the capability to read event flags (to know precisely where the player is in the story), the active party composition, the entire PC Box inventory, and the Bag contents.

## Proposal
Create an **Active Party Matchup Analyzer** view within DexHelper.
- **Progression Awareness:** Parse story event flags to determine the immediate next major battle (e.g., "Next Boss: Flannery").
- **Matchup Simulation:** Analyze the player's active party types, stats, and movesets against the known data of the upcoming boss's team.
- **Roster Optimization Suggestions:** If the active party has a poor matchup (e.g., a Grass-heavy team entering a Fire Gym), the analyzer will scan the player's PC Box and TM inventory to suggest optimizations.
- **Actionable Advice:** Generate concrete advice like, "Swap Gloom for the Level 24 Marill in Box 2," or "Teach TM03 (Water Pulse) to your Lombre before facing Flannery."

## Value Proposition
This feature directly solves the "what do I do next" paralysis that plagues casual and returning retro gamers. By combining deep save state extraction (event flags, PC Boxes, inventory) with static game knowledge, DexHelper transforms from a passive data viewer into an active, strategic companion. This perfectly aligns with our vision of providing premium, highly personalized utilities for retro gamers, bridging the gap between their unique save state and optimal gameplay strategy.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to detail the event flags needed to determine story progression and the logic for the matchup recommendation engine.

## Acceptance Criteria
- [ ] prd-134-135-active-party-matchup-analyzer
