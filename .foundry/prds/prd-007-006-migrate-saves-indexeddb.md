---
id: prd-007-006-migrate-saves-indexeddb
type: PRD
title: "PRD: Migrate Save Data Storage to IndexedDB"
status: PENDING
owner_persona: epic_planner
created_at: "2026-04-23T14:30:00.000Z"
updated_at: "2026-04-23T14:30:00.000Z"
depends_on: []
jules_session_id: null
parent: .foundry/ideas/idea-007-migrate-saves-to-indexeddb.md
---

# PRD: Migrate Save Data Storage to IndexedDB

## 1. Objective
Replace the current `localStorage` mechanism for persisting parsed save files (which relies on base64 encoding) with an `IndexedDB` solution. This will remove strict size limitations, eliminate the use of `window.atob` (flagged by security scanners), and natively support raw binary data.

## 2. Background & Context
Currently, parsed game save files are stored in `localStorage` as base64 encoded strings.
- **Security Vulnerability:** The usage of `window.atob` is flagged by security scanners.
- **Size Limitation:** `localStorage` typically has a 5MB quota per domain, severely restricting our ability to store multiple game saves or expand the platform.
- `IndexedDB` inherently solves both issues by providing large storage limits and native support for binary data (like `Uint8Array` and `ArrayBuffer`), completely bypassing the need for base64 encoding.

## 3. Scope & Requirements

### 3.1. In Scope
- Implementing an `IndexedDB` layer to manage save file persistence. Use the existing lightweight wrapper `idb` (or natively if preferred) which is already a project dependency.
- Refactoring the `src/store.ts` (Zustand) and its custom hydration/persistence actions to use the asynchronous IndexedDB API instead of synchronous `localStorage`.
- Updating the load/save mechanism to correctly handle binary `Uint8Array`/`ArrayBuffer` data.
- Removing all base64 encoding/decoding functions (including `window.atob`) used for save data.
- Writing migration logic to automatically move existing valid save data from `localStorage` to `IndexedDB` upon the first load, then clearing the `localStorage` key to avoid duplicate/stale data.

### 3.2. Out of Scope
- Support for multiple concurrent save files (this PRD just lays the foundation for it by removing the storage cap).
- Changes to the core game save parsing logic.

## 4. Technical Constraints & Considerations
- `IndexedDB` interactions are asynchronous, whereas Zustand's standard persist middleware with `localStorage` is synchronous. The store's hydration logic will need to be explicitly adapted for asynchronous loading.
- We must maintain the current application state seamlessly. Existing users with data in `localStorage` must not lose their saves. A migration step during application startup is critical.
- Ensure the `idb` library is correctly utilized to avoid memory leaks or database connection deadlocks.
