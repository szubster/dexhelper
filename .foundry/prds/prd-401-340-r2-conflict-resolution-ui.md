---
id: prd-401-340-r2-conflict-resolution-ui
type: PRD
title: Cloudflare R2 Conflict Resolution UI
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-08'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-039-401-r2-conflict-resolution-ui
tags:
  - ui
  - sync
  - ux
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# PRD: Cloudflare R2 Conflict Resolution UI

## Objective
Provide users with a UI prompt when a save conflict is detected during Cloudflare R2 syncing, allowing them to explicitly choose which save file to keep.

## Requirements
- Detect when a remote save on R2 conflicts with the local save state (e.g. timestamps mismatch beyond a threshold, or both have been modified since the last sync).
- Display a UI prompt listing options: Keep Local, Pull Remote.
- Display relevant metadata (timestamp, play time if possible) to help the user decide.
- Future-proof for potential diffing/merging functionality.
