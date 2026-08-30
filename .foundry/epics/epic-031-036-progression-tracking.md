---
id: epic-031-036-progression-tracking
type: EPIC
title: Progression Tracking & Multiple Saves
status: ACTIVE
owner_persona: story_owner
created_at: '2026-05-20'
updated_at: '2026-08-29'
depends_on: []
jules_session_id: '12485559948712211362'
pr_number: null
parent: prd-055-031-future-progression-trading
tags:
  - backend
  - progression
rejection_count: 1
rejection_reason: ''
notes: ''
---
# Epic: Progression Tracking & Multiple Saves

## Context
As part of Phase 2 of the Cloudflare Sync backend, we need to support storing and tracking multiple save files per playthrough, enabling progression tracking over time.

## Requirements
- Support storing and tracking multiple save files per playthrough.
- Enable progression tracking over time.
- Support managing states across different games concurrently (e.g., Pokémon Red, Diamond, Emerald).
- Maintain offline-first mandate.

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into Stories.
- [x] story-036-255-progression-save-model
- [x] story-036-256-progression-sync-logic
- [x] story-036-257-concurrent-game-management
- [ ] story-036-490-progression-e2e-verification
