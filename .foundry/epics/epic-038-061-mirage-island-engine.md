---
id: epic-038-061-mirage-island-engine
type: EPIC
title: Mirage Island Engine Updates
status: PENDING
owner_persona: story_owner
created_at: '2026-06-06'
updated_at: '2026-06-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-069-038-mirage-island-predictor
tags:
  - gen3
  - mirage-island
  - rng
  - engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Mirage Island Engine Updates

## 1. Context & Background
This Epic corresponds to the Engine / Parsing Updates from the Gen 3 Mirage Island Predictor PRD (`prd-069-038-mirage-island-predictor`). It aims to enhance the Gen 3 save parser to extract the Mirage Island random value and cross-reference it with the PIDs of all Pokémon owned by the player.

## 2. Product Requirements
- Enhance the Gen 3 save parser to extract the Mirage Island random value.
- Cross-reference this value with the PIDs of all Pokémon owned by the player.
- Output the current Mirage Island value and identify any "Mirage Island Key" Pokémon across the active party and all PC storage boxes.
- Write unit tests verifying the extraction logic and correctly identifying matching PIDs.

## 3. Acceptance Criteria
- [ ] Engine extraction logic implemented and tested.
