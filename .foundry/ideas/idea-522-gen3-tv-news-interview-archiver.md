---
id: idea-522-gen3-tv-news-interview-archiver
type: IDEA
title: Gen 3 TV News & Interview Archiver
status: READY
owner_persona: product_manager
created_at: '2026-09-13'
updated_at: '2026-09-13'
depends_on: []
jules_session_id: null
tags:
  - feature
  - gen3
  - immersion
rejection_reason: ''
---

# Gen 3 TV News & Interview Archiver

## Context
In Generation 3 (Ruby, Sapphire, Emerald), the game records players' achievements, Pokémon captures, contest wins, and direct interviews with the TV crew. This data is broadcasted on in-game TVs as news programs. As players progress or mix records with others, older news and interviews are overwritten and permanently lost. For long-term playthroughs and childhood save files, these generated news broadcasts represent significant nostalgic value and a unique historical record of the player's journey.

## Proposal
Create a `Gen 3 TV News & Interview Archiver` feature.
1. Parse the TV broadcast data structures (`tvShows` array) from the save file.
2. Extract the text of interviews, recorded achievements, and mixed record broadcasts.
3. Present this data in a dedicated "News Archive" dashboard.
4. (Optional) Provide an export or save history diffing mechanism to persist these broadcasts over time before they are overwritten by the game.

## Value Proposition
This feature strongly aligns with DexHelper's vision as a premium collector's utility and companion app. It transforms an ephemeral, easily lost in-game mechanic into a permanent, readable history of the player's unique journey, capturing the immersion of the Gen 3 experience.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD.
