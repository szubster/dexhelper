---
id: task-256-350-progression-sync-engine-impl
type: TASK
title: Implement Progression Sync Engine
status: COMPLETED
owner_persona: coder
created_at: '2026-07-27'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-036-256-progression-sync-logic
tags:
  - backend
  - progression
  - sync
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Progression Sync Engine

## Context
With the local IndexedDB schema for `SaveHistoryDB` implemented (as per `story-036-255-progression-save-model`), we need to implement the backend synchronization logic to push and pull these saves to our Cloudflare R2 backend via `r2Client`. The sync logic must maintain an offline-first mandate, ensuring that progression tracking over time is captured locally and synced to Cloudflare seamlessly, while handling offline states and conflict resolution intelligently.

## Requirements
1. **Sync Controller Expansion:** Enhance the existing `useFileSyncController` hook (or create a dedicated progression sync hook) to manage the pushing of new progression points to `r2Client`.
2. **Conflict Resolution:** Implement logic to resolve conflicts when syncing with Cloudflare. Given the offline-first mandate, prioritize the most recent local offline progression. A simple heuristic like "most recent timestamp wins" or "local file with a higher playtime wins" should be used.
3. **Cloudflare Authentication integration:** Ensure that syncing only attempts when the user is logged in (checking the `AUTH_LOGGED_IN_INDICATOR`).
4. **Architectural Consistency:** Follow ADR 019 for Cloudflare native authentication awareness. Ensure that network requests handle offline scenarios gracefully without throwing unhandled exceptions.

## Acceptance Criteria
- [x] Coder: Expand or implement the sync logic to push and pull progression saves using `r2Client`.
- [x] Coder: Implement a conflict resolution algorithm that prioritizes the most recent local progression.
- [x] Coder: Ensure network failures during sync gracefully fall back to local offline storage.
- [x] Coder: Add unit tests to cover the sync and conflict resolution logic.
