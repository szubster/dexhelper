---
id: epic-038-062-mirage-island-ui
type: EPIC
title: Gen 3 Mirage Island Predictor UI Updates
status: READY
owner_persona: story_owner
created_at: '2026-06-08'
updated_at: '2026-09-05'
depends_on:
  - epic-038-061-mirage-island-engine
jules_session_id: null
pr_number: null
parent: prd-069-038-mirage-island-predictor
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
notes: ''
locks: []
rejection_reason: ''
---

# Gen 3 Mirage Island Predictor UI Updates

## Objective
Surface the Mirage Island status in the user interface.

## Logic
Add a dedicated tracker view or notification indicating whether the player currently possesses a matching Pokémon for the current day.

## Display
If a match is found, highlight exactly which Pokémon it is and which PC Box it resides in.

## Design Constraints
Must adhere strictly to the "tactical hardware/snooping" aesthetic (`rounded-none`, dashed borders, monospace fonts) as defined in ADR 008.

## Acceptance Criteria
- [ ] Add tracker view or notification for Mirage Island status.
- [ ] Display matching Pokémon information (name, PC Box).
- [ ] Apply "tactical hardware/snooping" aesthetic constraints (`rounded-none`, dashed borders, monospace fonts).
