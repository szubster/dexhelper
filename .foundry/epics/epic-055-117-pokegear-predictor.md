---
id: epic-055-117-pokegear-predictor
type: EPIC
title: Pokegear Call Probability & Predictor Engine
status: COMPLETED
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-090-055-pokegear-phone-tracker
tags:
  - feature
  - gen2
  - mechanics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Epic: Pokegear Call Probability & Predictor Engine

## Objective
Implement the logic to predict Pokegear call probability based on Gen 2 save file data and RNG mechanics.

## Requirements
- Utilize the RNG mechanics and timer data documented in the research node.
- Implement a predictor engine that calculates the probability of each active NPC calling the player.
- Display these probability values or indicators on the Active Callers Dashboard.

## Acceptance Criteria
- [x] Implement predictor logic based on RNG mechanics
- [x] Display call probabilities on the UI

- [x] story-117-283-pokegear-predictor-engine
- [x] story-117-284-pokegear-predictor-ui
- [x] story-117-356-pokegear-predictor-e2e
