---
id: task-033-060-remove-localstorage-e2e
type: TASK
title: "Remove localStorage fallback from E2E Testing"
status: READY
owner_persona: "coder"
created_at: "2026-05-01"
updated_at: "2026-05-01"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-016-033-update-e2e-testing-for-idb.md
tags: ["e2e", "testing", "indexeddb"]
---

# Remove localStorage fallback from E2E Testing

## Description
Remove the legacy `localStorage` injection from `tests/e2e/test-utils.ts` now that the migration is completed and tests correctly utilize IndexedDB.

## Technical Details
- Modify `initializeWithSave` in `tests/e2e/test-utils.ts` to remove the line `localStorage.setItem('last_save_file', base64String);`.
- Remove the backward compatibility comments.

## Acceptance Criteria
- [x] `localStorage` is no longer injected in `initializeWithSave`.
- [x] All E2E tests continue to pass.
