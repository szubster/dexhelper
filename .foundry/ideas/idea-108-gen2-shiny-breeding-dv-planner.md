---
id: idea-108-gen2-shiny-breeding-dv-planner
type: IDEA
title: Gen 2 Shiny Breeding DV Compatibility Planner
status: READY
owner_persona: product_manager
created_at: '2026-07-08'
updated_at: '2026-07-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - gen2
  - shiny-hunting
  - breeding
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Shiny Breeding DV Compatibility Planner

## Description
In Generation 2, shininess is determined entirely by Deterministic Values (DVs). Breeding a shiny parent drastically increases the shiny odds of the offspring (up to 1/64). However, Gen 2 breeding mechanics also use DVs to prevent inbreeding—if the Defense DVs match and the Special DVs are identical (or differ by exactly 8), they are considered closely related, and they will never produce an egg. Players frequently waste hours trying to breed Pokémon that are secretly incompatible due to their hidden DVs.

DexHelper already parses the exact DVs of all Pokémon in the player's PC boxes. We should build a "Shiny Breeding Planner" that allows players to select two Pokémon from their storage. The app will cross-reference their DVs to instantly verify if they are compatible to breed, and if so, calculate the exact shiny probability of their offspring based on the parents' DV inheritance. This perfectly aligns with DexHelper's vision as a premium companion app that surfaces hidden mechanics to solve hardcore player pain points.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD detailing the user flow, UI integration, and the exact DV comparison formulas required for Gen 2 breeding compatibility.
