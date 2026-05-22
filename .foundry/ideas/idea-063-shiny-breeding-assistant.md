---
id: idea-063-shiny-breeding-assistant
type: IDEA
title: Gen 2 Shiny Gene Detection & Breeding Assistant
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-22'
updated_at: '2026-05-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - breeding
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 2 Shiny Gene Detection & Breeding Assistant

## Context
In Generation 2 (Gold/Silver/Crystal), Shininess is determined entirely by a Pokémon's DVs (Determinant Values). Because DVs are partially passed down through breeding, breeding a Shiny Pokémon (or a Pokémon carrying the "Shiny Genes") with another Pokémon drastically increases the odds of the offspring being Shiny (up to 1/64, compared to the base 1/8192). Currently, DexHelper parses DVs but does not explicitly track or highlight these "Shiny Gene Carriers".

## Proposal
Leverage DexHelper's deep save file parsing to automatically identify and surface Pokémon in the user's PC boxes that possess the specific DVs required to pass down Shiny genes.

- **Shiny Gene Tagging**: Introduce a specific UI indicator for Pokémon that are not Shiny themselves, but possess the correct DVs to be optimal breeding parents for Shiny hunting.
- **Breeding Pair Suggestions**: Explicitly suggest optimal breeding pairs from the user's existing PC storage that maximize the odds of producing a Shiny egg.

## Value Proposition
Shiny hunting is one of the most dedicated end-game activities. Gen 2's unique DV-based breeding mechanics make it possible to "engineer" Shinies, but calculating the DVs manually is incredibly tedious. By automatically identifying Shiny Gene Carriers, DexHelper provides a unique value proposition to hardcore players.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD.

## Downstream
- .foundry/prds/prd-063-034-shiny-breeding-assistant.md
