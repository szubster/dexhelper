---
id: task-266-378-r2-graceful-degradation-qa
type: TASK
title: Cloudflare R2 Graceful Degradation QA
status: READY
owner_persona: qa
created_at: '2026-08-01'
updated_at: '2026-08-01'
depends_on:
  - task-266-377-r2-graceful-degradation-impl
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

# Task: Cloudflare R2 Graceful Degradation QA

## Context
The application should fallback gracefully to local storage if Cloudflare R2 services are unavailable.

## Requirements
- Verify that the application continues to function normally even if R2 API endpoints are unreachable or return errors.
- Test the `useFileSyncController.ts` logic by mocking `r2Client` to throw an error and ensuring local save and parsing still succeeds without disrupting the UI.
- Test `handleFileUpload` in `AppLayout.tsx` similarly.
- Ensure the UI does not show a global error when only the R2 sync fails, but the local save is successful.

## Acceptance Criteria
- [ ] UI remains functional without global errors when R2 operations fail during file upload.
- [ ] UI remains functional without global errors when R2 operations fail during live sync polling.
