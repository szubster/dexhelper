---
id: story-420-490-pal-park-hm-validation
type: STORY
title: Pal Park HM Validation Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-340-420-pal-park-core-engine
tags:
  - feature
  - gen3
  - pal-park
  - migration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Pal Park HM Validation Logic

## Objective
Implement validation logic to check if flagged Gen 3 Pokémon possess any moves that match the Gen 3 HM Move List.

## Scope
- Define a constant list of Gen 3 HM moves (Cut, Fly, Surf, Strength, Flash, Rock Smash, Waterfall, Dive).
- Implement a validator function that takes a Pokemon's move IDs and returns a boolean indicating if it contains any HM moves.

## Acceptance Criteria
- [x] Tech Lead: Break down into Tasks.

- [ ] task-490-506-pal-park-hm-validator-impl
- [ ] task-490-507-pal-park-hm-validator-qa
