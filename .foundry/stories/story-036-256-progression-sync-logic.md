---
id: story-036-256-progression-sync-logic
type: STORY
title: Progression Sync Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-03'
updated_at: '2026-07-29'
depends_on:
  - story-036-255-progression-save-model
jules_session_id: '1994820634687727130'
pr_number: null
parent: epic-031-036-progression-tracking
tags:
  - backend
  - progression
  - sync
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Progression Sync Logic

## Context
With the database schema in place for storing multiple saves, we need to implement the backend synchronization logic. This sync logic must maintain an offline-first mandate, ensuring that progression tracking over time is captured locally and synced to Cloudflare seamlessly.

## Requirements
- Implement logic to handle adding new progression points (save states) to a playthrough.
- Ensure synchronization works with the Cloudflare native authentication and sync backend.
- Resolve conflicts intelligently, prioritizing the most recent local offline progression.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into Tasks to implement the progression recording and sync conflict resolution algorithms.
- [x] [task-256-350-progression-sync-engine-impl](.foundry/tasks/task-256-350-progression-sync-engine-impl.md)
- [x] [task-256-351-progression-sync-engine-qa](.foundry/tasks/task-256-351-progression-sync-engine-qa.md)
