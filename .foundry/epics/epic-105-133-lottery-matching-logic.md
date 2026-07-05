---
id: epic-105-133-lottery-matching-logic
type: EPIC
title: Lottery Matching Logic Module
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: '16181474873155975639'
pr_number: null
parent: prd-098-105-gen3-lottery-predictor-ui
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Lottery Matching Logic Module

## Goal
Develop a logic module to iterate through the player's party and PC boxes to compare Original Trainer (OT) IDs against the daily winning number.

## Requirements
- Parse the daily winning number from the extracted save file data.
- Parse OT IDs from Pokémon in the player's party and PC boxes.
- Implement matching logic to identify the best match based on matching trailing digits.
- Determine the corresponding prize tier based on the match.

## Acceptance Criteria
- [ ] Break down into Stories
