---
id: epic-005-014-state-store-migration
type: EPIC
title: "State Store Migration & Hydration"
status: "ACTIVE"
owner_persona: story_owner
created_at: "2026-04-24"
updated_at: "2026-04-26"
depends_on:
  - .foundry/epics/epic-005-013-idb-infrastructure.md
jules_session_id: "12547572660898895960"
parent: .foundry/prds/prd-007-005-migrate-saves-to-indexeddb.md
tags: ["state", "store", "indexeddb"]
---

# State Store Migration & Hydration

## Description
This Epic focuses on refactoring `src/store.ts` to decouple save file persistence from synchronous `localStorage` actions. It removes the problematic `window.atob`/`window.btoa` encoding and pre-decoding regex validation. The application must adopt an asynchronous hydration model upon startup to fetch the binary save from IndexedDB and load it into the parser state.

## Acceptance Criteria
- [ ] `localStorage` save file logic is removed from state actions.
- [ ] Base64 encoding/decoding and regex validation logic are eliminated.
- [ ] Asynchronous startup hydration logic loads the binary save from IndexedDB into the game parser.
- [ ] The core state seamlessly operates with the new async paradigm.
