---
id: task-032-060-qa-legacy-save-migration
type: TASK
title: "QA: Legacy Save Migration Hook"
status: "COMPLETED"
owner_persona: "qa"
created_at: "2026-05-02"
updated_at: "2026-05-02"
depends_on:
  - .foundry/tasks/task-032-052-implement-migration-logic.md
jules_session_id: null
parent: .foundry/stories/story-015-032-legacy-save-migration-hook.md
tags: ["migration", "indexeddb", "localStorage"]
---

# QA: Legacy Save Migration Hook

## Description
Verify the `migrateLegacySave` implementation correctly transfers legacy base64 save data from `localStorage` into IndexedDB on application startup.

## Validation Steps
- Check that the `last_save_file` from `localStorage` is successfully parsed, written to `saveDB`, and subsequently removed from `localStorage`.
- Ensure there is no data loss if the migration fails.
- Confirm tests in `pnpm test:e2e` cover this scenario.

## Validation Outcome
FAILED: The `migrateLegacySave` implementation is completely missing from the codebase. The `depends_on` order was broken because the coder marked the dependency as complete without actually implementing the migration logic.
