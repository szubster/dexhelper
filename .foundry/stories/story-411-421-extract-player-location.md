---
id: story-411-421-extract-player-location
type: STORY
title: Extract Player's Location and Upcoming Trainer
status: READY
owner_persona: tech_lead
created_at: '2026-08-13'
updated_at: '2026-08-18'
depends_on:
  - story-411-420-extract-player-team
jules_session_id: null
pr_number: null
parent: epic-340-411-gen3-ai-data-extraction
tags:
  - gen3
  - ai
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Extract Player's Location and Upcoming Trainer

## Objective
Parse the player's current location from Gen 3 save files and identify the nearest upcoming major trainer based on that location.

## Scope
- Parse the location block from Gen 3 save data.
- Map the location to the nearest upcoming major trainer.
- Add tests to ensure location and trainer mapping work.
