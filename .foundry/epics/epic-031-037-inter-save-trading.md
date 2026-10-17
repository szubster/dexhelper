---
id: epic-031-037-inter-save-trading
type: EPIC
title: Pokémon Trading (Inter-Save)
status: READY
owner_persona: story_owner
created_at: '2026-05-20'
updated_at: '2026-10-13'
depends_on:
  - epic-031-036-progression-tracking
jules_session_id: null
pr_number: null
parent: prd-055-031-future-progression-trading
tags:
  - backend
  - trading
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Pokémon Trading (Inter-Save)

## Context
Following the implementation of progression tracking across multiple concurrent saves, this Epic covers allowing users to transfer Pokémon between their different playthroughs.

## Requirements
- Implement a mechanism to transfer Pokémon between a user's different playthroughs.
- Enforce game and generation transfer rules during the trading process (similar to PKHeX validations).
- Maintain offline-first capability.

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into Stories.
- [ ] story-037-676-trading-core-transfer-logic
- [ ] story-037-677-trading-validation-rules
- [ ] story-037-678-trading-offline-ui
- [ ] story-037-679-trading-integration-e2e
