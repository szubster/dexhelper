---
id: epic-097-131-nuzlocke-death-tracking
type: EPIC
title: Automated Death Tracking
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-07-12'
depends_on: []
jules_session_id: '8968921572261317407'
pr_number: null
parent: prd-057-097-automated-nuzlocke-tracker
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# EPIC: Automated Death Tracking

## Objective
Implement the logic to track dead Pokémon based on HP and Graveyard box assignment.

## Scope
- Detect Pokémon currently at 0 HP in the party as dead.
- Implement a UI setting or backend flag for a "Graveyard" PC box.
- Permanently mark any Pokémon in the Graveyard box as dead, regardless of HP.

## Acceptance Criteria
- [x] Stories are generated
- [ ] story-131-317-detect-party-zero-hp
- [ ] story-131-270-graveyard-box-state
- [ ] story-131-271-graveyard-box-ui
