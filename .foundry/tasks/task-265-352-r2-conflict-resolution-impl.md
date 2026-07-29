---
id: task-265-352-r2-conflict-resolution-impl
type: TASK
title: Cloudflare R2 Offline Conflict Resolution - Implementation
status: READY
owner_persona: coder
created_at: '2026-07-28'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-039-265-r2-offline-conflict-resolution
tags:
  - backend
  - sync
  - r2
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Cloudflare R2 Offline Conflict Resolution

## Context
Because DexHelper is offline-first, a user might make local changes while disconnected. If the remote R2 state has changed from another device (or previous session), we need conflict resolution when the user comes back online or attempts a sync. This task implements a robust conflict resolution strategy.

## Requirements
- Implement logic in `src/hooks/useFileSyncController.ts` or the relevant sync manager to detect conflicts between the local and remote R2 state.
- When querying R2 for the save file, we must retrieve or expose the last modified timestamp.
- Implement a resolution strategy: timestamp-based last-write-wins is acceptable, but ensure there's a mechanism to handle offline-to-online transitions gracefully (e.g., if local save was modified after the R2 save, push local to R2. If R2 save is newer, pull from R2).
- Ensure the API endpoints for saves properly return `Last-Modified` or similar headers, and the `r2Client` uses these to detect freshness.
- Add error handling for cases where timestamps cannot be reliably determined.

## Acceptance Criteria
- [x] Logic implemented to detect conflicts between local file state and remote R2 state.
- [x] Conflict resolution strategy (e.g., last-write-wins) implemented and correctly handling offline/online transitions.
- [x] API endpoints and `r2Client` updated to handle and expose timestamps for sync comparison.
