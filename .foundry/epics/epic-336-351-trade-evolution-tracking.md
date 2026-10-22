---
id: epic-336-351-trade-evolution-tracking
type: EPIC
title: Trade Evolution Tracking
status: READY
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-10-22'
depends_on:
  - epic-336-350-cross-save-synergy-analysis
jules_session_id: null
pr_number: null
parent: prd-059-336-multi-save-trade-planner
tags:
  - backend
  - evolution
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Trade Evolution Tracking

## Context
With the analysis engine in place, this Epic focuses on specifically tracking and flagging Pokémon that are ready to evolve via trade between the loaded saves.

## Requirements
- Automatically flag Pokémon ready to evolve via trade if moved between the loaded saves.
- Support Pokémon requiring specific held items for trade evolution, warning if the item is missing or available in the other save.

## Acceptance Criteria
- [ ] story-351-714-base-trade-evolution-tracking
- [ ] story-351-715-item-trade-evolution-tracking
- [ ] story-351-716-trade-evolution-integration-e2e
- [x]  Story Owner: Break this Epic down into Stories.
- [x]  Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
