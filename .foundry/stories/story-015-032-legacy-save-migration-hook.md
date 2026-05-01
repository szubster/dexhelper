---
id: story-015-032-legacy-save-migration-hook
type: STORY
title: "Legacy Save Migration Hook"
status: "COMPLETED"
owner_persona: "tech_lead"
created_at: "2026-04-27"
updated_at: "2026-05-01"
depends_on:
  - .foundry/stories/story-014-029-async-startup-hydration.md
  - .foundry/stories/story-014-031-dual-write-save-persistence.md
  - .foundry/tasks/task-032-052-implement-migration-logic.md
jules_session_id: null
parent: .foundry/epics/epic-005-015-legacy-data-migration.md
tags: ["migration", "indexeddb", "localStorage"]
---

# Legacy Save Migration Hook

## Description
This Story implements the one-time migration of save data from `localStorage` to `IndexedDB`. It should run on application startup, check for legacy data, migrate it if found, and then safely clear the legacy entry.

## Acceptance Criteria
- [ ] Startup hook checks for `last_save_file` in `localStorage`.
- [ ] If found, data is decoded and written to `saveDB`.
- [ ] After successful write to `saveDB`, `localStorage.removeItem('last_save_file')` is called.
- [ ] Invariant: No data loss if IndexedDB is unavailable.

## Generated Tasks
- .foundry/tasks/task-032-052-implement-migration-logic.md
- .foundry/tasks/task-032-060-qa-legacy-save-migration.md
