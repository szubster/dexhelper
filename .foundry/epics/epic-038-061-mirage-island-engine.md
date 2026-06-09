---
id: epic-038-061-mirage-island-engine
type: EPIC
title: Gen 3 Mirage Island Predictor Engine Updates
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-08'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: '6391769809937541805'
pr_number: null
parent: prd-069-038-mirage-island-predictor
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
notes: ''
rejection_reason: ''
---

# Gen 3 Mirage Island Predictor Engine Updates

## Objective
Enhance the Gen 3 save parser to extract the Mirage Island random value and cross-reference it with the PIDs of all Pokémon owned by the player.

## Logic
Use the `DataView` API to parse the daily Mirage Island random 2-byte value from the Gen 3 save file structure.

## Output
The parsed application data must include the current Mirage Island value and identify any "Mirage Island Key" Pokémon across the active party and all PC storage boxes.

## Acceptance Criteria
- [ ] Parse daily Mirage Island random value from Gen 3 save.
- [ ] Parse all Pokémon PIDs from active party and PC boxes.
- [ ] Cross-reference the random value with Pokémon PIDs.
- [ ] Add Mirage Island value and matches to parsed application data.
- [ ] Write unit tests verifying extraction logic and PID matching.
