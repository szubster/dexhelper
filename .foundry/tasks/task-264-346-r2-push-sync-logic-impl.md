---
id: task-264-346-r2-push-sync-logic-impl
type: TASK
title: Cloudflare R2 Push Sync Logic Implementation
status: READY
owner_persona: coder
created_at: '2026-07-25'
updated_at: '2026-07-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-039-264-r2-push-sync-logic
tags:
  - backend
  - sync
  - r2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Cloudflare R2 Push Sync Logic Implementation

## Context
As the user makes progress or uploads new saves locally, these changes must be synchronized back to Cloudflare R2. This implements the push logic.

## Requirements
- Update `useFileSyncController.ts` inside `processFile` to push the new buffer to Cloudflare R2 if the user is authenticated. We can verify if the user is logged in by checking `localStorage.getItem(AUTH_LOGGED_IN_INDICATOR) === 'true'`.
- Similarly update `AppLayout.tsx`'s `handleFileUpload` function to also push to R2 when a manual save upload occurs, if authenticated.
- Ensure `r2Client.putSave(saves[0] ?? 'save', buffer)` is utilized correctly (a user might have multiple saves in the future, for now pushing to the first available ID or a fallback like 'save' when listing saves or creating a new ID is required). Actually, based on pull logic in `store.ts` (`const saves = await r2Client.listSaves()`), if saves exist, use the first one. Otherwise, generate an ID (e.g., 'save-1') or use the one from `listSaves()`.
- Use try/catch so R2 failures do not crash the app or block local IndexedDB persistence.

## Acceptance Criteria
- [ ] Logic implemented to push local save data to R2 upon file upload and live file change in `useFileSyncController.ts`.
- [ ] Implementation handles auth checks correctly.
