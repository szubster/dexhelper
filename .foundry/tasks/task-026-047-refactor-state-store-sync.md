---
id: task-026-047-refactor-state-store-sync
type: TASK
title: "Refactor State Store Sync"
status: PENDING
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-014-026-refactor-state-store-sync.md
tags: ["state", "store", "indexeddb"]
---

# Refactor State Store Sync

## Objective
Remove `localStorage` syncing logic and Base64 encoding/decoding from `src/store.ts`. The state synchronization has been migrated to IndexedDB, so these are no longer needed.

## Context
This task implements the blueprint for `.foundry/stories/story-014-026-refactor-state-store-sync.md`. We are cleaning up legacy storage mechanisms to rely entirely on IndexedDB syncing for save data, thus keeping `src/store.ts` lean and focused on application state.

## Implementation Details
1. Open `src/store.ts`.
2. In the `AppStore` interface, remove the definition and comments for `loadSaveFromStorage: () => void;`.
3. In the `useStore` initialization, remove the `loadSaveFromStorage` implementation inside the state creator function. This includes removing the logic involving `localStorage.getItem('last_save_file')`, base64 regex validation, `window.atob`, and parsing the bytes buffer.

## Acceptance Criteria
- [ ] `loadSaveFromStorage` is completely removed from the `AppStore` interface.
- [ ] `loadSaveFromStorage` implementation (including base64 logic) is removed from the `useStore` state creator.
- [ ] Self-verification is performed to ensure the application builds without type errors related to this change.

## Verification Protocol
Since this is a straightforward cleanup, the **Coder will self-verify**.
- Run `pnpm type-check` and `pnpm lint` to ensure no references to `loadSaveFromStorage` remain.
- Run `pnpm test` to ensure no unit tests are broken.
- Document the verification in the task journal (`.jules/coder.md`).
