---
id: epic-038-061-mirage-island-engine
type: EPIC
title: Gen 3 Mirage Island Predictor Engine Updates
status: COMPLETED
owner_persona: story_owner
created_at: '2026-06-08'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-069-038-mirage-island-predictor
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Mirage Island Predictor Engine Updates

## Objective
Enhance the Gen 3 save parser to extract the Mirage Island random value and cross-reference it with the PIDs of all Pokémon owned by the player.

## Logic
Use the `DataView` API to parse the daily Mirage Island random 2-byte value from the Gen 3 save file structure.

## Output
The parsed application data must include the current Mirage Island value and identify any "Mirage Island Key" Pokémon across the active party and all PC storage boxes.

## Acceptance Criteria
- [x] Parse daily Mirage Island random value from Gen 3 save.
- [x] Parse all Pokémon PIDs from active party and PC boxes.
- [x] Cross-reference the random value with Pokémon PIDs.
- [x] Add Mirage Island value and matches to parsed application data.
- [x] Write unit tests verifying extraction logic and PID matching.

### Implementation Stories
- [x] .foundry/archive/stories/story-061-098-parse-mirage-island-value.md
- [x] .foundry/stories/story-061-099-extract-pokemon-pids.md
- [x] .foundry/stories/story-061-100-mirage-island-cross-reference.md
- [x] story-061-473-mirage-island-engine-e2e
