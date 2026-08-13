---
id: story-133-273-gen3-lottery-matching-algorithm
type: STORY
title: Gen3 Lottery Matching Algorithm
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-05'
updated_at: '2026-08-13'
depends_on: []
jules_session_id: '8503650253501665993'
pr_number: null
parent: epic-105-133-lottery-matching-logic
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Lottery Matching Algorithm

## Goal
Implement the logic to compare Pokémon OT IDs against the daily winning number.

## Requirements
- Iterate through Party and PC Box Pokémon.
- Extract the 16-bit Original Trainer (OT) ID from each Pokémon.
- Compare trailing digits to determine match tier (no match, 2 digits, 3 digits, 4 digits, 5 digits).
- Select the best matching Pokémon.

## Acceptance Criteria
- [x] Implement matching logic
- [x] task-273-303-lottery-matching-core-logic
- [ ] task-273-307-gen3-lottery-matching-iteration-impl
- [ ] task-273-308-gen3-lottery-matching-iteration-qa
