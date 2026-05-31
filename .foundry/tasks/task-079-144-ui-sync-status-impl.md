---
id: task-079-144-ui-sync-status-impl
type: TASK
title: Implement UI Sync Status & Permissions
status: ACTIVE
owner_persona: coder
created_at: '2026-05-28'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: '14797373396629951401'
pr_number: null
parent: story-041-079-ui-sync-status
tags:
  - feature
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement UI Sync Status & Permissions

## Context
See ADR 016 (`.foundry/docs/adrs/016-file-system-access-api-sync.md`) for the architectural details on the auto-sync implementation.

## Requirements
- Update the UI to display the current sync status (e.g., Live, Syncing, Disconnected) from the Sync Controller state.
- Implement a graceful fallback to manual drag-and-drop upload for unsupported browsers.
- Implement a UI gesture (e.g., a "Resume Sync" button) for cases where the browser requires user interaction to re-grant permission to the retained `FileSystemFileHandle`.

## Acceptance Criteria
- [ ] UI displays current sync status.
- [ ] Fallback for unsupported browsers is available.
- [ ] "Resume Sync" button is available when needed.

## Reminders
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
