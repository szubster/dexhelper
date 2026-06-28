---
id: idea-089-gen3-ash-gathering-tracker
type: IDEA
title: Gen 3 Volcanic Ash Gathering Tracker
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-26'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: '213841561942922846'
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

# Idea: Gen 3 Volcanic Ash Gathering Tracker

## Context
In Generation 3 (Ruby, Sapphire, Emerald), players can gather volcanic ash on Route 113 by running through the grass with the Soot Sack. This ash can be exchanged at the Glass Workshop for various flutes (like the Blue Flute or White Flute) and furniture items. The game tracks the exact amount of ash gathered (step count in ash grass), but players cannot see this exact number in-game; they must run back to the Glass Workshop NPC to check if they have enough for their desired item.

## Proposal
Leverage DexHelper's save file parsing to extract the current Volcanic Ash count.
- **Ash Tracker Dashboard:** Create a localized view (e.g., associated with Route 113 or the Glass Workshop) that explicitly shows the player's current gathered Volcanic Ash count.
- **Goal Planner:** Allow the player to select a target item (e.g., "White Flute - 1000 steps") and display a progress bar showing how many more steps in ash grass are required.

## Value Proposition
This targets a highly localized, tedious item-gathering grind. By surfacing the exact hidden step counter from the save file, DexHelper replaces blind running back and forth with precise, actionable data. It gives hardcore completionists and casual players alike a unique utility that standard gameplay lacks, reinforcing the app's value as a premium companion tool.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to investigate the exact save file offsets for the Soot Sack step counter in Ruby/Sapphire/Emerald.
