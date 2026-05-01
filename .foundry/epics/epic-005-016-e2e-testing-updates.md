---
id: epic-005-016-e2e-testing-updates
type: EPIC
title: "E2E Testing Infrastructure Updates"
status: READY
owner_persona: story_owner
created_at: "2026-04-24"
updated_at: "2026-05-01"
depends_on:
  - .foundry/epics/epic-005-013-idb-infrastructure.md
  - .foundry/epics/epic-005-014-state-store-migration.md
  - .foundry/stories/story-016-033-update-e2e-testing-for-idb.md
jules_session_id: null
parent: .foundry/prds/prd-007-005-migrate-saves-to-indexeddb.md
tags: ["e2e", "testing", "indexeddb"]
---

# E2E Testing Infrastructure Updates

## Description
The current E2E testing framework in `tests/e2e/test-utils.ts` and `playwright.config.ts` relies on injecting state via `localStorage` or `storageState`. This Epic updates these utilities to correctly inject test save fixtures directly into IndexedDB so that the test suite continues functioning seamlessly with the new architecture.

## Acceptance Criteria
- [ ] `initializeWithSave` or related E2E utilities are updated to mock/inject IndexedDB data.
- [ ] The global Playwright `setup` successfully sets up IndexedDB state.
- [ ] All existing E2E tests pass reliably with the new IndexedDB injection method.
## Generated Stories
- .foundry/stories/story-016-033-update-e2e-testing-for-idb.md
