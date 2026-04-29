---
id: task-032-052-implement-migration-logic
type: TASK
title: "Implement Migration Logic"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-27"
updated_at: "2026-04-29"
depends_on: []
jules_session_id: "7356870026240583345"
parent: .foundry/stories/story-015-032-legacy-save-migration-hook.md
tags: ["migration", "indexeddb", "localStorage"]
---

# Implement Migration Logic

## Description
Implement the `migrateLegacySave` function and integrate it into the startup hydration flow.

## Technical Details
- Create a migration utility that reads `localStorage`.
- Use the existing base64 decoding logic from `store.ts` (temporarily).
- Write the resulting `Uint8Array` to `saveDB.putSave('last_save_file', ...)`.
- Ensure `localStorage` is only cleared AFTER a successful `saveDB` write.
- Add error boundaries to prevent migration failures from crashing the app.

## Acceptance Criteria
- [ ] Migration logic successfully transfers data from `localStorage` to `saveDB`.
- [ ] Legacy data is removed from `localStorage` post-migration.
- [ ] Verification: Manually set a base64 string in `localStorage`, reload, and verify it moved to IndexedDB.
