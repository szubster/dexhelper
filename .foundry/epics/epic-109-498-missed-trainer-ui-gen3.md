---
id: epic-109-498-missed-trainer-ui-gen3
type: EPIC
title: Missed Trainer Radar - UI Dashboard (Gen 3)
status: PENDING
owner_persona: story_owner
created_at: '2026-08-30'
updated_at: '2026-08-30'
depends_on:
  - epic-109-307-missed-trainer-data-extraction-gen3
jules_session_id: '6361047784736225452'
pr_number: null
parent: prd-104-109-missed-trainer-radar
tags:
  - ui
  - dashboard
  - gen3
research_references:
  - research-408-493-investigate-gen3-trainer-flags-e2e-failure
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Missed Trainer Radar - UI Dashboard (Gen 3)

## Objective
Implement the UI Dashboard for the "Missed Trainer Radar" feature to display trainers the player has encountered but not yet defeated for Generation 3 games, replacing the cancelled global UI epic.

## Requirements
1.  **Encounter Filter:** The UI must display trainers the player has encountered (based on story progress, badges, or visited locations) but not yet defeated in Gen 3.
2.  **Trainer Information Display:** Each entry must display the trainer's exact route/location, Pokémon team composition, and aggregate rewards.
3.  **Aesthetics:** The UI should follow the project's tactical, snooping aesthetic as defined by existing ADRs and the UI style guides (ADR 008, ADR 024).
4.  **Smart Route Radar Integration:** The UI map components will integrate dynamically with the data using the Smart Route Radar architecture defined in ADR 018.

## Acceptance Criteria
- [ ] Break down into Stories
