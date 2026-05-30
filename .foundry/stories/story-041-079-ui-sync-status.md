---
id: story-041-079-ui-sync-status
type: STORY
title: UI Sync Status & Permissions
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-05-21'
updated_at: '2026-05-28'
depends_on:
  - story-041-078-background-polling-loop
jules_session_id: '9349774420626639744'
pr_number: null
parent: epic-033-041-emulator-auto-sync
tags:
  - feature
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: UI Sync Status & Permissions

## Requirements
- Display current sync status in the UI (e.g., Live, Syncing, Disconnected).
- Gracefully handle unsupported browsers (fallback to manual drag-and-drop upload).
- Implement a UI gesture (like a "Resume Sync" button) if the browser needs a user interaction to re-grant permission.
