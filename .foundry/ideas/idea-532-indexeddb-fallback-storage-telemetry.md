---
id: idea-532-indexeddb-fallback-storage-telemetry
type: IDEA
title: IndexedDB Fallback Storage Synchronization and Telemetry Strategy
status: READY
owner_persona: product_manager
created_at: '2026-09-29'
updated_at: '2026-09-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
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

# IndexedDB Fallback Storage Synchronization and Telemetry Strategy

## Problem Statement
In `src/db/SaveDB.ts` and `src/db/SaveHistoryDB.ts`, DexHelper implements in-memory `Map` fallback instances (`fallbackStorage`, `fallbackStorageSaves`, `fallbackStorageMetadata`, `fallbackStorageIndexes`) to allow the application to function when IndexedDB is blocked or disabled (e.g., private browsing mode, storage quota limits, or restricted browser permissions).

Currently, when IndexedDB operations fail, the modules silently log `console.error('System: sync failed')` and fallback to in-memory storage. This presents two major technical issues:
1. **Silent Data Loss & Volatility**: Save data stored in the fallback memory maps is completely lost when the user refreshes or closes the page. Users receive no visual telemetry or notification warning them that their saves/history are operating in non-persistent memory mode.
2. **Missing State Recovery / Retry**: If IndexedDB becomes available or recovers after initial failure (or if temporary storage quota errors clear), there is no mechanism to attempt re-initialization or flush in-memory fallback entries back into IndexedDB.

## Proposed Solution
Architect a structured Fallback Storage Manager and Telemetry system for DexHelper's database layer (`SaveDB` and `SaveHistoryDB`):

1. **Storage Health Event Emitter & Status Hook**:
   - Introduce a lightweight storage health notification system (`useStorageHealth` or event emitter) within `src/db/` that tracks when IndexedDB operations fail and fallback storage is active.
   - Surface a subtle tactical UI badge or alert (e.g. `[STORAGE: MEMORY FALLBACK]`) to inform users that data persistence is temporary.

2. **Cross-Session / LocalStorage Backup Bridge**:
   - For lightweight metadata and index records in `SaveHistoryDB`, automatically bridge critical fallback entries to `localStorage` or `sessionStorage` where permitted, offering survival across page reloads when IndexedDB is blocked.

3. **Automatic Rehydration & Re-sync**:
   - Implement a retry / re-sync protocol that attempts to re-open IndexedDB when network or storage conditions recover, seamlessly flushing accumulated fallback records into IndexedDB without loss.

## Acceptance Criteria
- [ ] Draft a PRD for the Storage Fallback Telemetry & Re-sync framework.
- [ ] Define non-intrusive storage health events and UI state integration guidelines.
- [ ] Specify fallback persistence strategies for `SaveDB` and `SaveHistoryDB`.
