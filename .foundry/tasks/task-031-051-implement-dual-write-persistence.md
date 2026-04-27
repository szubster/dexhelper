---
id: task-031-051-implement-dual-write-persistence
type: TASK
title: "Implement Dual-Write Persistence"
status: "PENDING"
owner_persona: "coder"
created_at: "2026-04-27"
updated_at: "2026-04-27"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-014-031-dual-write-save-persistence.md
tags: ["persistence", "indexeddb", "localStorage"]
---

# Implement Dual-Write Persistence

## Description
Update `src/components/AppLayout.tsx` to ensure that when a new save file is uploaded, it is stored in both `localStorage` and the new `saveDB` (IndexedDB).

## Technical Details
- Import `saveDB` from `src/db/SaveDB.ts`.
- In `handleFileUpload`, after parsing the save, call `saveDB.putSave('last_save_file', new Uint8Array(buffer))`.
- Keep the existing `localStorage.setItem` logic.
- Use generic error logging for IndexedDB failures per PRD guidelines.

## Acceptance Criteria
- [ ] `AppLayout.tsx` calls `saveDB.putSave` on file upload.
- [ ] `localStorage` is still updated correctly.
- [ ] Verification: Upload a file and check both Storage tabs in DevTools.
