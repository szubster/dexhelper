---
id: epic-055-408-gen3-move-tutor-dashboard-ui
type: EPIC
title: Gen 3 Move Tutor Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-08-08'
updated_at: '2026-08-08'
depends_on:
  - epic-055-407-gen3-move-tutor-compatibility
jules_session_id: null
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags:
  - feature
  - ui
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Move Tutor Dashboard UI

## Objective
Create a dedicated dashboard view for Move Tutors adhering to the 'tactical hardware/snooping' aesthetic (ADR 008).

## Scope
- Display a list of all one-time Move Tutors.
- Visually distinguish between "Available" and "Used" tutors based on save file flags.
- Display a visual list/grid of viable Pokémon that can learn the move for each available tutor.
- Adhere to the 'tactical hardware/snooping' aesthetic.

## Acceptance Criteria
- [ ] A dashboard UI displays available and used Move Tutors clearly, adhering to the tactical aesthetic.
- [ ] For each available tutor, a list of compatible Pokémon from the player's save file (PC/Party) is displayed.
- [ ] A final STORY dedicated exclusively to Integration and E2E Verification is generated.
