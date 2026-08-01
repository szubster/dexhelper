---
id: idea-132-gen3-pal-park-migration-planner
type: IDEA
title: Gen 3 Pal Park Migration Planner
status: READY
owner_persona: product_manager
created_at: '2026-08-01'
updated_at: '2026-08-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Pal Park Migration Planner

## Context
When players transition from Generation 3 to Generation 4, they use the "Pal Park" feature to migrate their Pokémon. However, this process has strict limitations: Pokémon knowing HM moves cannot be migrated, and (in DP/Pt) you can only migrate exactly 6 Pokémon per day per GBA cartridge. Preparing Pokémon for migration is a highly manual process of checking movesets, stripping HMs, ensuring held items are correct, and organizing them into batches of 6 in the PC.

## Proposal
Create a "Pal Park Migration Planner" utility within DexHelper for Gen 3 save files.
- **Migration Batching:** Allow users to flag Pokémon in their Gen 3 PC boxes that they intend to transfer and organize them into virtual "Batches of 6".
- **HM Validation:** Automatically scan flagged Pokémon for HM moves (e.g., Surf, Cut, Strength) and visibly warn the user, as the game will reject them during the migration process.
- **Item Transfer Optimization:** Highlight which Pokémon are holding rare items (e.g., Master Balls, rare berries, Leftovers) to ensure valuable items aren't left behind or accidentally brought over when not intended.
- **Physical PC Locator:** Tell the player exactly which Box and Slot their flagged Pokémon are currently in, so they can easily move them into a dedicated "Migration Box" in-game.

## Value Proposition
This directly supports the hardcore collector and Ribbon Master communities who frequently migrate Pokémon upwards through the generations. It takes a tedious, error-prone preparation phase (where a single HM move can ruin a migration attempt) and turns it into a streamlined, automated checklist.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to define the UI layout for the migration planner and the logic for HM move validation.
