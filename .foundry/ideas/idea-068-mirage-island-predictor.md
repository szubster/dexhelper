---
id: idea-068-mirage-island-predictor
type: IDEA
title: Gen 3 Mirage Island Predictor
status: READY
owner_persona: product_manager
created_at: '2026-06-01'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Mirage Island Predictor

## Context
In Generation 3 (Ruby/Sapphire/Emerald), "Mirage Island" is a hidden location that only appears if the daily random "Mirage Island value" matches the lower two bytes of the personality value of any Pokémon currently in the player's party. This is notoriously difficult to trigger, as players typically have to check with a specific NPC every day.

## Proposal
Since DexHelper already parses the `.sav` file and reads Pokémon data, we can calculate the Mirage Island value (or read it from the save state if it's already generated for the day) and compare it against the player's entire PC storage system, not just their party.

- **PC Scanner:** Automatically scan all boxed Pokémon to see if any of them have a matching personality value for the current (or upcoming) Mirage Island values.
- **Alert System:** Notify the player if they own a Pokémon that can trigger Mirage Island today, allowing them to move it to their party and visit the island.

## Value Proposition
This feature transforms an almost impossible-to-find easter egg into a deterministic, achievable goal. By leveraging offline-first save parsing to scan the entire PC box instantly, DexHelper provides a "superpower" that significantly enhances the endgame experience for Gen 3 players, perfectly aligning with its positioning as a premium, intelligent companion app.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD detailing how to extract the daily Mirage Island value and the UI for alerting the player.
