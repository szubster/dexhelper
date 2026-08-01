---
id: task-266-377-r2-graceful-degradation-impl
type: TASK
title: Cloudflare R2 Graceful Degradation Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-01'
updated_at: '2026-08-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-039-266-r2-graceful-degradation
tags:
  - backend
  - sync
  - r2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Cloudflare R2 Graceful Degradation Implementation

## Context
The application currently attempts to sync files to R2 when the user is logged in. However, if R2 is unavailable (e.g., hosted on GitHub Pages or general network error), the application should catch these errors and fallback gracefully to using `saveDB.putSave` without disrupting the user experience or throwing fatal unhandled errors. The application must continue to function using local browser IndexedDB storage.

## Requirements
- Update `src/hooks/useFileSyncController.ts` to ensure that `r2Client` operations (like `listSaves`, `getSave`, `putSave`) are properly wrapped in `try/catch` blocks. If an operation fails, log a warning to the console, but allow the local `saveDB.putSave` to proceed and set the sync status to `live`.
- Update `src/components/AppLayout.tsx` (the `handleFileUpload` function) to similarly catch errors from `r2Client.listSaves` and `r2Client.putSave`, logging them and continuing with the local save.
- Ensure the UI does not show a global error when only the R2 sync fails, but the local save is successful.

## Acceptance Criteria
- [x] R2 API failures in `useFileSyncController.ts` are caught and gracefully ignored, allowing local sync to continue.
- [x] R2 API failures in `AppLayout.tsx` are caught and gracefully ignored, allowing file uploads to continue locally.
