---
id: prd-532-587-indexeddb-fallback-storage-telemetry
type: PRD
title: PRD - IndexedDB Fallback Storage Synchronization and Telemetry Strategy
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-10-16T18:20:05.493Z'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: '11931743453398438824'
pr_number: null
parent: idea-532-indexeddb-fallback-storage-telemetry
tags:
  - db
  - indexeddb
  - storage
  - dx
  - telemetry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# PRD - IndexedDB Fallback Storage Synchronization and Telemetry Strategy

## 1. Introduction
When IndexedDB is blocked or disabled (e.g., in private browsing mode or due to restricted browser permissions), DexHelper falls back to in-memory `Map` storage (`fallbackStorage`, `fallbackStorageSaves`, `fallbackStorageMetadata`, `fallbackStorageIndexes`). This causes silent data loss upon page refresh, leaving users unaware of the non-persistent state, and lacks a recovery mechanism if IndexedDB becomes available again.

This feature aims to introduce a Fallback Storage Manager and Telemetry system to provide visibility into storage health, bridge critical fallback entries to temporary persistence (where possible), and seamlessly re-hydrate IndexedDB if it recovers.

## 2. Goals & Objectives
- **Storage Telemetry**: Surface non-intrusive storage health events to the user, ensuring they are aware when DexHelper is operating in a temporary memory fallback mode.
- **Cross-Session Resilience**: Persist critical fallback data (like metadata and index records in `SaveHistoryDB`) across page reloads using `localStorage` or `sessionStorage` as a bridge.
- **Automatic Re-sync & Recovery**: Implement a retry/re-sync mechanism to move accumulated fallback records into IndexedDB if the underlying storage issues are resolved during the session.

## 3. Scope
- Update `src/db/SaveDB.ts` and `src/db/SaveHistoryDB.ts` to emit storage health events when fallback maps are utilized.
- Implement a `useStorageHealth` hook (or equivalent event emitter) to consume these events and expose storage status.
- Add a subtle tactical UI badge (e.g. `[STORAGE: MEMORY FALLBACK]`) complying with ADR 008 to the application layout.
- Enhance the fallback storage maps with a local/session storage bridge for lightweight data.
- Develop a retry protocol that attempts to re-open IndexedDB and sync in-memory data when possible.

## 4. Requirements
### 4.1 Storage Health Events & UI
- The database layer MUST emit events when falling back to memory storage.
- A UI component MUST display a tactical badge (`[STORAGE: MEMORY FALLBACK]`) when the app is in fallback mode. The badge MUST use `rounded-none`, `border-dashed`, and a monospaced font.
- The UI MUST NOT block user interactions but should clearly indicate the volatile state.

### 4.2 LocalStorage / SessionStorage Bridge
- `SaveHistoryDB` fallback logic MUST attempt to serialize lightweight metadata and indexes to `sessionStorage` or `localStorage` to survive page reloads.
- Due to quota limits, actual save file binaries (`SaveDB`) might remain in-memory, but metadata should be bridged.

### 4.3 Rehydration & Re-sync Protocol
- A mechanism MUST periodically (or on specific triggers, like visibility change or user action) retry IndexedDB connection.
- Upon successful reconnection, the system MUST flush all entries currently held in memory (or local/session storage) into IndexedDB.
- After a successful flush, the fallback maps MUST be cleared and the UI badge removed.

## Acceptance Criteria
- [ ] Draft an EPIC for the IndexedDB Fallback Storage Synchronization and Telemetry implementation.
