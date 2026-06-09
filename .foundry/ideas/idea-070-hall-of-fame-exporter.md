---
id: idea-070-hall-of-fame-exporter
type: IDEA
title: Hall of Fame Timeline and Certificate Exporter
status: READY
owner_persona: product_manager
created_at: '2026-06-05'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - social
  - hall-of-fame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Hall of Fame Timeline and Certificate Exporter

## Context
A major part of the Pokémon community experience, particularly for challenge runs like Nuzlockes or Monotype runs, is sharing the final victorious team. Players currently resort to manually taking screenshots of the Hall of Fame screen in-game, which is low-resolution and hard to format for social media.

## Proposal
Leverage the save parser to read the Hall of Fame data blocks in Gen 1 and Gen 2 saves. Since the game stores the Pokémon species, levels, and the player's name for past Pokémon League victories, DexHelper can extract this data. We can then generate a visually appealing, high-resolution "Hall of Fame Certificate" image directly in the browser using an HTML Canvas or SVG export feature.

## Value Proposition
This transforms DexHelper from a personal utility into a social sharing tool. By automating the creation of beautiful team summaries, we provide immediate value to the large community of challenge runners who want to showcase their achievements, driving organic growth and visibility for the app.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD detailing the required save file offsets for Hall of Fame records and the UI requirements for the certificate generator.
- [ ] .foundry/prds/prd-070-044-hall-of-fame-exporter.md
