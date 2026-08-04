---
id: epic-109-308-missed-trainer-radar-ui
type: EPIC
title: Missed Trainer Radar - UI Dashboard
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-08-02'
depends_on:
  - epic-109-306-missed-trainer-data-extraction-gen1-gen2
  - epic-109-307-missed-trainer-data-extraction-gen3
jules_session_id: null
pr_number: null
parent: prd-104-109-missed-trainer-radar
tags:
  - ui
  - dashboard
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-109-306-missed-trainer-data-extraction-gen1-gen2
notes: ''
---

# Missed Trainer Radar - UI Dashboard

## Objective
Implement the UI Dashboard for the "Missed Trainer Radar" feature to display trainers the player has encountered but not yet defeated.

## Requirements
1.  **Encounter Filter:** The UI must display trainers the player has encountered (based on story progress, badges, or visited locations) but not yet defeated.
2.  **Trainer Information Display:** Each entry must display the trainer's exact route/location, Pokémon team composition, and aggregate rewards.
3.  **Aesthetics:** The UI should follow the project's tactical, snooping aesthetic as defined by existing ADRs and the UI style guides (ADR 008, ADR 024).
4.  **Smart Route Radar Integration:** The UI map components will integrate dynamically with the data using the Smart Route Radar architecture defined in ADR 018.

## Acceptance Criteria
- [ ] Break down into Stories
