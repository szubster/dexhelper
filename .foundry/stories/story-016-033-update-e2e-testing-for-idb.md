---
id: story-016-033-update-e2e-testing-for-idb
type: STORY
title: "Update E2E Testing for IndexedDB"
status: "ACTIVE"
owner_persona: "tech_lead"
created_at: "2026-04-27"
updated_at: "2026-05-01"
depends_on:
  - .foundry/stories/story-014-029-async-startup-hydration.md
  - .foundry/tasks/task-033-053-update-playwright-idb-injection.md
jules_session_id: "14139307172593535391"
parent: .foundry/epics/epic-005-016-e2e-testing-updates.md
tags: ["e2e", "testing", "indexeddb"]
---

# Update E2E Testing for IndexedDB

## Description
The E2E test suite must be updated to support the new IndexedDB-based save persistence. This involves updating test utilities to inject binary save data into the browser's IndexedDB instance before tests run.

## Acceptance Criteria
- [ ] Playwright utilities (`initializeWithSave`) can inject binary data into IndexedDB.
- [ ] Tests no longer rely on `localStorage` for save data state.
- [ ] Full E2E suite passes with the new persistence mechanism.

## Generated Tasks
- .foundry/tasks/task-033-053-update-playwright-idb-injection.md
