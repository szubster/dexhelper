---
id: idea-070-gen3-contest-tracker
type: IDEA
title: Gen 3 Contest Stat and Ribbon Tracker
status: COMPLETED
owner_persona: product_manager
created_at: '2026-06-06'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - contests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Contest Stat and Ribbon Tracker

## Context
Generation 3 introduced Pokémon Contests, which rely on hidden stats (Condition: Cool, Beauty, Cute, Smart, Tough) and Sheen (which limits how many Pokéblocks a Pokémon can eat). Players often struggle to track which Pokémon are optimized for which contests, and the in-game UI for checking Ribbons across hundreds of PC Pokémon is incredibly tedious.

## Proposal
Leverage DexHelper's programmatic save parsing to expose these hidden Contest stats for every Pokémon in the player's collection.
- **Condition & Sheen Viewer:** Display the exact numerical values for Condition and Sheen, which are otherwise hidden or vaguely represented by a pentagon graph in-game.
- **Ribbon Checklist:** Create a dedicated view that aggregates all Contest Ribbons across the entire Living Dex. This allows players to instantly see which Pokémon have completed Master Rank contests and which are missing specific ribbons.
- **Optimization Advisor:** Based on a Pokémon's Nature and current Condition stats, suggest which Contest category they are best suited to enter next.

## Value Proposition
This caters directly to the hardcore completionist community, transforming an opaque and tedious endgame grind into a highly actionable, data-driven feature. It aligns perfectly with DexHelper's mission to surface hidden state and provide premium companion tools.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to define the data structures needed for parsing Contest stats and Ribbons from Gen 3 save formats.
- [x] .foundry/prds/prd-070-040-gen3-contest-data-parsing.md
- [x] .foundry/prds/prd-070-041-gen3-contest-ui-viewer.md
- [x] .foundry/prds/prd-070-042-gen3-contest-optimization-advisor.md
