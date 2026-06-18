---
id: idea-084-hidden-power-analyzer
type: IDEA
title: Hidden Power Type and Base Power Analyzer
status: READY
owner_persona: product_manager
created_at: '2026-06-18'
updated_at: '2026-06-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - gen3
  - competitive
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Hidden Power Type and Base Power Analyzer

## Context

In Generations 2 and 3, the move "Hidden Power" is an incredibly important coverage move for many Pokémon. However, both its Type and its Base Power (varying from 31 to 70) are determined entirely by the Pokémon's hidden Determinant Values (DVs) or Individual Values (IVs). Because the games do not explicitly tell the player what Type or Power a Pokémon's Hidden Power has until they use it in battle (and even then, exact Base Power remains obfuscated), players are forced to either manually calculate these values using complex formulas based on precise IVs, or guess.

## Proposal

Leverage DexHelper's existing ability to parse and extract a Pokémon's exact DVs (Gen 2) and IVs (Gen 3) to automatically calculate its Hidden Power profile.
- **Detail View Integration:** Display the specific Hidden Power Type and Exact Base Power alongside the Pokémon's other stats on the individual detail page.
- **PC Box Highlighting (Optional Extension):** Allow users to filter or sort their PC boxes for Pokémon with specific Hidden Power types (e.g., "Find all Electric Hidden Power Pokémon"), making team building significantly easier.

## Value Proposition

By transforming an opaque, complex mathematical formula into actionable, immediately readable UI, DexHelper removes one of the most frustrating guesswork elements for competitive and challenge players. It capitalizes on our core strength—reading hidden data structure variables—to provide high-value, quality-of-life improvements that simply cannot exist in the base games.

## Next Steps

- [ ] Product Manager: Convert this idea into a PRD.
