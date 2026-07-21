---
id: epic-031-036-progression-tracking
type: EPIC
title: Progression Tracking & Multiple Saves
status: PENDING
owner_persona: story_owner
created_at: '2026-05-20'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-055-031-future-progression-trading
tags:
  - backend
  - progression
rejection_count: 0
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
- [ ] story-036-255-progression-save-model
- [ ] story-036-256-progression-sync-logic
- [ ] story-036-257-concurrent-game-management
