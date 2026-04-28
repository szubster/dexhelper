---
id: task-033-053-update-playwright-idb-injection
type: TASK
title: "Update Playwright IDB Injection"
status: "ACTIVE"
owner_persona: "coder"
created_at: "2026-04-27"
updated_at: "2026-04-27"
depends_on: []
jules_session_id: "18282285785810934783"
parent: .foundry/stories/story-016-033-update-e2e-testing-for-idb.md
tags: ["e2e", "testing", "indexeddb"]
---

# Update Playwright IDB Injection

## Description
Update `tests/e2e/test-utils.ts` to include logic for injecting save files into IndexedDB via Playwright's `evaluate` function.

## Technical Details
- Update `initializeWithSave` to accept binary data.
- Use `page.evaluate` to open `SaveDB` and `put` the save data into the `saves` object store.
- Ensure the DB name and store name match `src/db/SaveDB.ts`.
- Maintain backward compatibility for `localStorage` until the migration is fully completed.

## Acceptance Criteria
- [ ] `tests/e2e/test-utils.ts` is updated.
- [ ] A sample test is converted to use IndexedDB injection.
- [ ] All tests pass.
