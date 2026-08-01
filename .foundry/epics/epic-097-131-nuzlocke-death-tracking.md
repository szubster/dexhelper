---
id: epic-097-131-nuzlocke-death-tracking
type: EPIC
title: Automated Death Tracking
status: PENDING
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-08-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-057-097-automated-nuzlocke-tracker
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 1
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
- [x] story-131-317-detect-party-zero-hp
- [x] story-131-333-graveyard-box-state
- [x] story-131-334-graveyard-box-ui
- [ ] story-131-351-nuzlocke-death-tracking-e2e
