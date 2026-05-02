---
id: epic-005-015-legacy-data-migration
type: EPIC
title: "Legacy Save Data Migration"
status: READY
owner_persona: story_owner
created_at: "2026-04-24"
updated_at: "2026-05-02"
depends_on:
  - .foundry/epics/epic-005-013-idb-infrastructure.md
  - .foundry/epics/epic-005-014-state-store-migration.md
  - .foundry/stories/story-015-032-legacy-save-migration-hook.md
jules_session_id: null
parent: .foundry/prds/prd-007-005-migrate-saves-to-indexeddb.md
tags: ["migration", "localStorage", "indexeddb"]
---

# Legacy Save Data Migration

## Description
Existing users will have their saves stored as base64 strings in `localStorage`. This Epic implements a one-time migration routine during app initialization: check `localStorage` for legacy save data, decode it to binary, persist it to IndexedDB, and then purge the old `localStorage` entry to prevent duplicated storage.

## Acceptance Criteria
- [ ] Application checks `localStorage` for legacy save data on load.
- [ ] Legacy base64 saves are migrated to IndexedDB as binary.
- [ ] Successfully migrated saves are cleared from `localStorage`.
- [ ] Users experience no loss of progression during the transition.
## Generated Stories
- .foundry/stories/story-015-032-legacy-save-migration-hook.md
