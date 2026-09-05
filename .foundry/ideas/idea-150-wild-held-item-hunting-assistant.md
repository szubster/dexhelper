---
id: idea-150-wild-held-item-hunting-assistant
type: IDEA
title: Wild Held Item Hunting Assistant
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-15'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '14194771349769566527'
pr_number: null
parent: null
tags:
  - dexhelper
  - feature
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Wild Held Item Hunting Assistant

## Context & Problem Statement
In Pokemon games (specifically Gen 2 and Gen 3), many valuable and competitive items can only be found as held items on wild Pokemon. Examples include:
- Thick Club (Cubone/Marowak, Gen 2/3) - 5% chance, essential for Marowak.
- Light Ball (Pikachu, Gen 2/3) - 5% chance, essential for Pikachu.
- Metal Coat (Magnemite/Magneton, Gen 2) - 8% chance, needed for Scizor/Steelix evolution.
- Lucky Egg (Chansey, Gen 2/3) - 5% chance (or less), massive grind for EXP.

Hunting for these items involves repeatedly encountering specific wild Pokemon, using moves like Thief or Covet, and checking if the item was obtained. It's an incredibly tedious process because the player doesn't know if the wild Pokemon holds the item until they capture it or successfully steal it.

Additionally, players often fill their PC boxes with caught Pokemon just to check for these items, leading to box clutter.

## Proposed Idea
The Wild Held Item Hunting Assistant will be a DexHelper feature that aids players in this grind. Since DexHelper parses the save file, it can:
1. **Target Identification:** Allow the player to select an item they are hunting (e.g., Lucky Egg).
2. **Location & Rarity Display:** Show the best routes/locations to find the Pokemon that holds this item, along with the encounter rate and held item percentage.
3. **Thief/Covet Tracker:** (If applicable) Suggest Pokemon in the player's current PC or Party that know "Thief" or "Covet" to help optimize the hunting process.
4. **Inventory & Box Scanner:** When the player uploads a new save state during their hunt, the assistant instantly scans all Party Pokemon, PC Box Pokemon, and the Bag to detect if the target item was successfully acquired, providing a celebratory notification. This eliminates the need to manually check every caught Pokemon's summary screen.

This tool transforms a frustrating RNG grind into a structured, trackable goal, leveraging DexHelper's save parsing capabilities to provide immediate feedback.

## Next Steps / Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate the feature request for the Wild Held Item Hunting Assistant.
- [ ] Product Manager: Convert this IDEA into a PRD detailing the user flows and technical requirements.
