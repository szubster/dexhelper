---
id: idea-101-pc-box-organization-assistant
type: IDEA
title: Gen 1-3 PC Box Organization Assistant
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: '15006018774896473315'
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

# Idea: Gen 1-3 PC Box Organization Assistant

## Context
A major pain point in Generation 1, 2, and 3 is the lack of an auto-sort feature for the PC Box system. Players who want to organize a Living Dex, group Pokémon by type, or separate competitive/breeding stock must manually move each Pokémon one by one. Since DexHelper has read-only access to the `.sav` file, it cannot directly modify the save to sort the boxes for the player.

## Proposal
Create a "PC Box Organization Assistant" view within DexHelper that acts as a manual sorting guide.
- **Side-by-Side View:** Display the player's *current* PC Box layout on one side, and an *optimized target layout* on the other.
- **Sorting Algorithms:** Allow the player to choose a sorting method for the target layout (e.g., National Dex number, Type, Level, IVs).
- **Move Planner:** Generate a step-by-step checklist or visual guide of which Pokémon need to be moved where (e.g., "Move Bulbasaur from Box 3 to Box 1").

## Value Proposition
This feature transforms the limitation of read-only save parsing into an actionable utility. It significantly reduces the cognitive load of organizing large collections in retro games, turning a daunting, chaotic manual task into a guided, satisfying checklist. This perfectly aligns with DexHelper's vision as a premium companion app.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to explore sorting algorithms and the UI design for a move planner.

## Acceptance Criteria
- [ ] prd-101-106-pc-box-organization-assistant
