---
id: idea-098-gen3-pokemon-lottery-predictor
type: IDEA
title: Gen 3 Pokémon Lottery Predictor
status: READY
owner_persona: product_manager
created_at: '2026-07-01'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: null
parent: null
tags:
  - feature
  - gen3
notes: ''
rejection_reason: ''
---

# Idea: Gen 3 Pokémon Lottery Predictor

## Context
In Gen 3 games (Ruby/Sapphire/Emerald), Lilycove Department Store hosts a Pokémon Lottery Corner. The winning lottery number changes daily based on a PRNG seed in the save file. Checking the lottery requires flying to Lilycove City and matching the daily number against the Original Trainer (OT) IDs of Pokémon in the party or PC boxes.

## Proposal
Leverage DexHelper's programmatic save parsing to read the current Lottery PRNG seed/number.
- Extract the winning lottery number from the save file.
- Scan the player's PC boxes and party to find the best match (based on matching trailing digits of the Original Trainer ID).
- Display a quick indicator showing if the player has a winning ticket (e.g., "Match 3 digits! Reward: Exp. Share") and exactly which Pokémon they should bring to claim the prize, saving them the trip and manual box searching.

## Value Proposition
This transforms a tedious, manual daily chore (flying to Lilycove, checking the lotto, potentially missing a match because of a buried PC box Pokémon) into an instant, actionable insight. It aligns with DexHelper's vision of turning opaque game data into a premium utility feature for hardcore players and shiny hunters (who often have many traded Pokémon with different IDs).

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.
