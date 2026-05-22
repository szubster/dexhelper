---
id: task-070-126-implement-death-tracking-retry
type: TASK
title: Implement Death Tracking and Graveyard Logic (Retry)
status: COMPLETED
owner_persona: coder
created_at: '2026-05-20'
updated_at: '2026-05-22'
depends_on:
  - research-070-003-investigate-death-tracking-failure
jules_session_id: null
pr_number: null
parent: story-034-070-death-tracking-and-graveyard
tags:
  - feature
  - nuzlocke
  - verification
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Death Tracking and Graveyard Logic (Retry)

## Description
Detect fainted Pokémon in the party and implement logic to designate a PC Box as the Graveyard for permanently dead Pokémon.

## Acceptance Criteria
- [x] Implement logic to detect 0 HP Pokémon in the party as dead.
- [x] Implement logic to designate a PC Box as the Graveyard.
- [x] Pokémon in the Graveyard box are permanently marked as dead.
