---
id: idea-085-hidden-power-calculator
type: IDEA
title: Hidden Power Type and Base Power Calculator
status: READY
owner_persona: human
created_at: '2026-06-25'
updated_at: '2026-06-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - mechanics
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Hidden Power Type and Base Power Calculator

## Context
Hidden Power is a notoriously opaque mechanic introduced in Gen 2 and expanded in Gen 3. The move's Type and Base Power are determined entirely by the Pokémon's hidden IVs (DVs in Gen 2). Players have absolutely no way of knowing a Pokémon's Hidden Power Type or Power in-game without tedious trial and error against various Pokémon types or using external calculators. Since DexHelper already extracts these exact IVs/DVs from the save file, we are in a perfect position to solve this.

## Proposal
Add a "Hidden Power Calculator" view directly into the Pokémon details screen.
- Instantly calculate and display the exact Type and Base Power of Hidden Power for every single Pokémon in the player's Party and PC boxes.
- For Gen 2, use the DV-based formula.
- For Gen 3, use the IV-based formula.
- Potentially add a filter/search function in the PC box view to find Pokémon with specific Hidden Power types (e.g., "Find all Pokémon in my PC with Hidden Power Grass").

## Value Proposition
This directly leverages DexHelper's core strength: extracting hidden state from the save file and making it actionable. Hidden Power optimization is crucial for competitive play, battle facilities (like the Battle Frontier), and Nuzlocke challenge runs. By surfacing this data automatically, we eliminate the need for manual IV calculation and external tools, providing immediate, high-value utility to serious players.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.
