---
id: idea-079-hidden-power-calculator
type: IDEA
title: Hidden Power Type and Base Power Revealer
status: PENDING
owner_persona: product_manager
created_at: "2026-06-14"
updated_at: "2026-06-14"
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - competitive
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Idea: Hidden Power Type and Base Power Revealer

## Context
Introduced in Generation 2, "Hidden Power" is a widely used competitive move whose Type and Base Power are entirely determined by a Pokémon's hidden Determinant Values (DVs). However, both the Type and Power are completely invisible to the player in-game, forcing competitive players to painstakingly calculate them manually or use external calculators after extracting their DVs.

## Proposal
Create a **Hidden Power Revealer** feature.
1. **Derive Type and Power:** Since DexHelper already extracts and parses the 4-bit DVs (HP, Attack, Defense, Speed, Special) for every Pokémon in the save file, we can programmatically calculate the exact Type and Base Power of Hidden Power for each individual Pokémon.
2. **Surface in UI:** Display the calculated Hidden Power Type (e.g., "Hidden Power Fire") and Base Power (e.g., "BP 70") directly in the Pokémon detail view and PC storage lists.

## Value Proposition
This eliminates a significant pain point for competitive players and completionists by surfacing critical, dynamically calculated hidden state directly in the app. It perfectly aligns with DexHelper's vision as a premium companion app that leverages offline-first save parsing to provide immediate, actionable utility that is impossible to achieve through normal gameplay.
