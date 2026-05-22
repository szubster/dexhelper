---
id: prd-063-034-shiny-breeding-assistant
type: PRD
title: Gen 2 Shiny Gene Detection & Breeding Assistant
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-22'
updated_at: '2026-05-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-063-shiny-breeding-assistant
tags:
  - feature
  - breeding
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 2 Shiny Gene Detection & Breeding Assistant

## Context
In Generation 2 (Gold/Silver/Crystal), Shininess is determined entirely by a Pokémon's DVs (Determinant Values). Because DVs are partially passed down through breeding, breeding a Shiny Pokémon (or a Pokémon carrying the "Shiny Genes") with another Pokémon drastically increases the odds of the offspring being Shiny (up to 1/64, compared to the base 1/8192). Currently, DexHelper parses DVs but does not explicitly track or highlight these "Shiny Gene Carriers".

## Goal
Leverage DexHelper's deep save file parsing to automatically identify and surface Pokémon in the user's PC boxes that possess the specific DVs required to pass down Shiny genes.

## Scope
### In Scope
- **Shiny Gene Tagging**: Introduce a specific UI indicator for Pokémon that are not Shiny themselves, but possess the correct DVs to be optimal breeding parents for Shiny hunting.
- **Breeding Pair Suggestions**: Explicitly suggest optimal breeding pairs from the user's existing PC storage that maximize the odds of producing a Shiny egg.
- **Gen 2 Exclusivity**: This feature should only apply to Generation 2 save files, as DV-based Shininess mechanics are exclusive to Gen 2.

### Out of Scope
- Modifying save files to artificially give Pokémon Shiny DVs. DexHelper remains strictly read-only.
- Gen 3+ support for this specific mechanic, as IVs replaced DVs in Gen 3 and Shininess is no longer directly linked to IVs.

## User Experience
- The UI should clearly distinguish between "Shiny" (already Shiny) and "Shiny Carrier" (has the right DVs to breed Shinies).
- When a user views their PC boxes or a specific Pokémon, the UI should indicate if it's a Shiny Carrier.
- A dedicated "Breeding" view or section should recommend optimal pairs based on Egg Groups and Shiny Carrier status.

## Next Steps
- [x] Epic Planner: Create Epics for the Shiny Gene Detection & Breeding Assistant feature.

### Child Nodes
- epic-034-044-shiny-gene-detection-engine
- epic-034-045-shiny-breeding-ui-integration
