---
id: idea-110-npc-size-record-assistant
type: IDEA
title: Gen 2 & Gen 3 NPC Size Record Assistant
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-10'
updated_at: '2026-07-12'
depends_on: []
jules_session_id: '5304073056528500553'
pr_number: null
parent: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 & Gen 3 NPC Size Record Assistant

## The Problem
In Generation 2 (e.g., Lake of Rage Magikarp) and Generation 3 (e.g., Route 119 Feebas/Barboach, Heracross/Shroomish), there are NPCs who challenge the player to show them exceptionally large or small Pokémon. The game internally calculates a Pokémon's size using a convoluted mathematical formula based on its DVs (Gen 2) or Personality Value/IVs (Gen 3) combined with base species data.

Because this size is entirely hidden until the player speaks to the specific NPC, players are forced to manually catch dozens of the target species, place them in their party, and talk to the NPC one by one in a tedious trial-and-error process to beat the current record and earn the reward (usually a valuable item like an Elixir or specific hold items).

## Proposed Solution
We should introduce an "NPC Size Record Assistant" dashboard. By leveraging our programmatic save parsing engine, we can extract the IVs/DVs and PID of every Pokémon in the player's PC Boxes and automatically run the specific generation's size calculation formula.

### Key Features:
1. **Target Species Filter:** Automatically filter the player's PC boxes to only show the specific species relevant to the size-checking NPCs in that generation (e.g., Magikarp, Barboach, Feebas, Heracross, Shroomish).
2. **Exact Size Display:** Calculate and display the exact size (in inches/meters, matching the in-game display) for every instance of those species the player owns.
3. **Record Beater Highlight:** Automatically sort and highlight the largest (or smallest, depending on the NPC) Pokémon the player currently possesses, making it instantly clear which one they should withdraw and show to the NPC.

## Value Proposition
Targeting mathematically complex, hidden sub-mechanics provides incredible unique utility. By automating this opaque calculation across all stored Pokémon, we completely eliminate manual trial-and-error. This perfectly leverages DexHelper's programmatic parsing strengths, turning a frustrating, blind guessing game into an instant, actionable insight. This reinforces our position as an indispensable, premium companion app for hardcore completionists.

## Acceptance Criteria
- [ ] prd-110-112-npc-size-record-assistant
