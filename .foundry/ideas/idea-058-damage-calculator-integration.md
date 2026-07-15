---
id: idea-058-damage-calculator-integration
type: IDEA
title: Damage Calculator and Showdown Export Integration
status: PENDING
owner_persona: human
created_at: '2026-05-19'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - showdown
  - calculator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Damage Calculator and Showdown Export Integration

## Context
Challenge runners (Nuzlockers) and competitive players frequently use tools like Pokémon Showdown's damage calculator to plan for difficult battles. Manually inputting a Pokémon's exact DVs, Stat Exp (EVs), nature, and moveset into these calculators is tedious and error-prone, especially for older generations where calculating exact stats can be tricky.

## Proposal
Implement an automated export and damage calculator integration in DexHelper.
- **Showdown Export:** Add a "Copy to Showdown Format" button for individual Pokémon and entire party/PC boxes. This will translate the raw save data (DVs, Stat Exp, level, moves) into the standard text format accepted by Pokémon Showdown and popular damage calculators.
- **In-App Calculator (Future Expansion):** Potentially embed a lightweight damage calculator view directly within DexHelper, pre-populated with the user's current team stats, allowing them to quickly check damage ranges against known boss Pokémon (like Gym Leaders) directly in the tool.

## Value Proposition
This significantly streamlines the planning phase of challenge runs. By bridging the gap between actual save file state and external planning tools, DexHelper becomes an indispensable hub for serious players, removing the friction of manual data transcription.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.
