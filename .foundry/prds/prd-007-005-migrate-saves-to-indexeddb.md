---
id: prd-007-005-migrate-saves-to-indexeddb
type: PRD
title: "Migrate Save Data to IndexedDB"
status: READY
owner_persona: epic_planner
created_at: "2026-04-24"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: null
parent: .foundry/ideas/idea-007-migrate-saves-to-indexeddb.md
tags: []
---

# PRD: Migrate Save Data Storage to IndexedDB

## Executive Summary
The application currently stores parsed game save files as base64-encoded strings in `localStorage`. This approach presents two significant challenges: `localStorage` size constraints (~5MB) limit scalability and multi-save support, and the reliance on `window.atob` for base64 decoding introduces flagged security vulnerabilities. This PRD outlines the migration of the save data persistence layer to `IndexedDB`, enabling significantly larger storage quotas and natively secure binary handling.

## Problem Statement
1. **Size Constraints**: `localStorage` is limited to ~5MB. Save files (SRAM dumps) for older generations are typically 32KB, but storing multiple saves, uncompressed structures, or future generation data will quickly exhaust this limit.
2. **Security Vulnerability**: The `window.atob` mechanism used for decoding base64 is flagged as a vulnerability. Existing workarounds using external libraries for base64 do not resolve the fundamental issue of inadequate storage capacity.
3. **Encoding Overhead**: Converting binary ArrayBuffers to base64 strings for `localStorage` and then back to binary for the save parser is computationally inefficient.

## Proposed Solution
Migrate the persistence layer for game saves from `localStorage` to `IndexedDB`.
- Use a lightweight promise-based wrapper (e.g., `idb`) to interact with IndexedDB securely and efficiently.
- Store the raw binary save data (`ArrayBuffer` or `Uint8Array`) directly in IndexedDB, completely eliminating the need for base64 encoding/decoding.
- Decouple the save persistence logic from standard Zustand synchronous state actions, adopting an asynchronous hydration model.

## Target Architecture
- **Database Wrapper**: Leverage the existing `idb` dependency to manage the IndexedDB connection and schema.
- **State Store (`src/store.ts`)**:
  - Remove `localStorage` save file persistence from custom actions.
  - Remove pre-decoding validation logic involving base64 regex.
  - Implement an asynchronous hydration mechanism to load the binary save data from IndexedDB into the game parser upon application startup.
- **Fallback/Error Handling**: Ensure graceful degradation or clear error messaging if IndexedDB is inaccessible (e.g., in private browsing modes). Error logs should use non-revealing generic strings (e.g., "System: sync failed") per CWE-209 mitigation guidelines.

## Edge Cases & Considerations
- **Data Migration**: Existing users with save data in `localStorage` need a migration path. The application should check `localStorage` on load, migrate the base64 save to IndexedDB binary, and then clear the `localStorage` entry.
- **Private Browsing**: IndexedDB may throw `QuotaExceededError` or be disabled in certain private browsing modes.
- **Testing**: E2E testing utilities (`tests/e2e/test-utils.ts` and `playwright.config.ts`) that rely on `localStorage` or `storageState` injection will need to be updated to inject save fixtures into IndexedDB.

## Acceptance Criteria
- [ ] Save data is successfully stored in and loaded from IndexedDB.
- [ ] Base64 encoding/decoding logic (`window.atob`, `window.btoa`, and validation regex) is removed from the persistence path.
- [ ] Existing save data in `localStorage` is seamlessly migrated to IndexedDB on first load.
- [ ] E2E testing infrastructure is updated and passing with the new IndexedDB injection method.
- [ ] Security scanners no longer flag `window.atob` vulnerabilities related to save persistence.

## Generated Epics
<!-- The epic_planner will populate this section -->
