---
id: prd-007-005-migrate-saves-to-indexeddb
type: PRD
title: "Migrate Save Data to IndexedDB"
status: PENDING
owner_persona: epic_planner
created_at: "2026-04-24"
updated_at: "2026-04-24"
depends_on:
  - .foundry/ideas/idea-007-migrate-saves-to-indexeddb.md
jules_session_id: null
parent: .foundry/ideas/idea-007-migrate-saves-to-indexeddb.md
---

# PRD: Migrate Save Data Storage to IndexedDB

## 1. Problem Statement
The current implementation of the Dexhelper application persists game save state (specifically the parsed save files) as base64-encoded strings within the browser's `localStorage`. This architectural choice has introduced two critical issues:
1. **Severe Storage Limitations:** `localStorage` is synchronously blocked and strictly limited to approximately 5MB of storage per origin in most modern browsers. As user activity scales, especially with potential features involving multiple game saves (e.g. tracking across different generations) or expanding data structures, this quota will be rapidly exhausted, causing silent or catastrophic failures during state persistence.
2. **Security Vulnerability Workaround:** The current approach relies on `window.atob` and `window.btoa` for encoding/decoding the binary array data. Automated security scanners frequently flag `window.atob` as an unsafe mechanism. While using a third-party library could bypass the scanner, it does not resolve the root cause: we are trying to force binary data into a string-only synchronous storage engine.

## 2. Goals & Non-Goals

### Goals
- Fully migrate the persistence layer for game save data from `localStorage` to `IndexedDB`.
- Eliminate the use of base64 encoding (`window.atob`/`window.btoa`) entirely for save data.
- Ensure the application continues to correctly hydrate the `saveData` on initial load transparently from `IndexedDB`.
- Resolve existing data corruption logic (if `IndexedDB` holds a malformed save, it should be gracefully cleared without bricking the app).
- Remove `last_save_file` from `localStorage` if it exists (legacy migration path).

### Non-Goals
- Expanding the `SaveData` structure itself.
- Refactoring how the parsed state is managed in the `Zustand` store's active memory (transient state), only how it is persisted and hydrated.
- Supporting legacy browsers without `IndexedDB` capabilities.

## 3. Architecture & Implementation

### 3.1. Target State Store Migration
- Introduce the lightweight `idb` library (already installed as `^8.0.3`) to interface safely and asynchronously with `IndexedDB`.
- Establish a dedicated IndexedDB database (e.g., `dexhelper-db`, store: `saves`) for the raw binary dumps (as `ArrayBuffer` or `Uint8Array`).

### 3.2. Zustand Hydration Process
- Since `IndexedDB` operations are asynchronous and Zustand's state is traditionally synchronous, the store must be refactored to support asynchronous hydration on initialization.
- The `loadSaveFromStorage` action will be updated from a synchronous `localStorage.getItem` to an asynchronous `await idb.get(...)`.
- The `AppLayout.tsx` (or `__root.tsx`) initialization effect must handle this asynchronous loading seamlessly, potentially showing a brief loading state.

### 3.3. Legacy Migration
- The system must proactively check for the `last_save_file` key in `localStorage`. If found, it should be parsed, migrated into the new `IndexedDB` store, and then aggressively deleted from `localStorage` to free up the 5MB quota.

## 4. Acceptance Criteria
- [ ] Save data successfully persists across page reloads using `IndexedDB`.
- [ ] The `localStorage` no longer holds the `last_save_file` string; the 5MB quota is freed.
- [ ] Base64 encoding/decoding is completely removed from the save handling lifecycle.
- [ ] The application successfully handles (or ignores and clears) corrupted saves in the new `IndexedDB` store.
- [ ] All Vitest unit tests (specifically `src/store.test.ts`) and Playwright E2E tests are updated and passing.

## 5. Out of Scope
- Syncing saves to a cloud backend.
- UI redesigns of the file upload or settings components, except for replacing direct synchronous calls with asynchronous ones if needed.
