---
id: idea-085-hidden-power-calculator
type: IDEA
title: Exact Hidden Power Type and Base Power Exposer
status: PENDING
owner_persona: product_manager
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - gen3
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Exact Hidden Power Type and Base Power Exposer

## Context
"Hidden Power" is a widely used move introduced in Generation 2 whose exact Type and Base Power are determined entirely by a Pokémon's hidden Determinant Values (DVs) in Gen 2, and Individual Values (IVs) in Gen 3 onwards. Because DVs and IVs are not directly visible to the player in these generations, the exact properties of a Pokémon's Hidden Power remain completely obscured, forcing players to either guess, use tedious trial-and-error in battles against specific types, or calculate it manually if they know the DVs/IVs.

## Proposal
Since DexHelper already parses and extracts a Pokémon's exact DVs (Gen 2) and IVs (Gen 3) from the save state, we can run the math directly to determine their Hidden Power.
- **Hidden Power Calculation Engine:** Implement the generation-specific algorithms for calculating Hidden Power Type and Base Power based on the extracted values.
- **UI Exposure:** Directly display the exact Type and Base Power on the Pokémon's detail view, removing the guesswork entirely.

## Value Proposition
This transforms a completely opaque and crucial competitive game mechanic into a highly visible, actionable data point. It leverages our core strength of programmatic offline save parsing to provide "superpower" utility that the original games lacked, saving hardcore players and competitive battlers significant time and frustration.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to define the implementation for the Gen 2 and Gen 3 calculation engines and the UI updates required to display it.
