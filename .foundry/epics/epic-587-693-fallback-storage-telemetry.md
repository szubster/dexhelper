---
id: epic-587-693-fallback-storage-telemetry
type: EPIC
title: EPIC - IndexedDB Fallback Storage Synchronization and Telemetry
status: READY
owner_persona: story_owner
created_at: '2026-10-22T06:25:40Z'
updated_at: '2026-10-22T06:25:40Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-532-587-indexeddb-fallback-storage-telemetry
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

# EPIC - IndexedDB Fallback Storage Synchronization and Telemetry

## 1. Description
This Epic addresses the implementation of a Fallback Storage Manager and Telemetry system when IndexedDB is blocked or disabled. Currently, DexHelper falls back to in-memory \`Map\` storage without alerting the user, leading to silent data loss upon page refresh. The goals include surfacing non-intrusive storage health events to the user via a UI badge, preserving critical fallback metadata across sessions using a \`localStorage\` or \`sessionStorage\` bridge, and implementing a retry/re-sync mechanism to move fallback records into IndexedDB if it recovers during the session.

## 2. Requirements & Scope
- **Storage Health Events:** Extend \`SaveDB.ts\` and \`SaveHistoryDB.ts\` to emit events when memory fallback is triggered. Create a \`useStorageHealth\` hook.
- **UI Indication:** Introduce a subtle, non-blocking tactical UI badge (\`[STORAGE: MEMORY FALLBACK]\`) in the application layout conforming to ADR 008 (\`rounded-none\`, \`border-dashed\`, monospaced).
- **Storage Bridge:** Update fallback map logic in \`SaveHistoryDB\` to serialize lightweight metadata and indexes to \`sessionStorage\` or \`localStorage\` so data survives page reloads.
- **Re-sync & Recovery Protocol:** Create a mechanism (e.g., triggered on visibility change or periodic checks) to retry IndexedDB connection. If successful, flush in-memory data to IndexedDB, clear the fallback maps, and remove the UI badge.
- **E2E Integration Verification:** Generate a final integration STORY dedicated strictly to verifying the fallback telemetry flow, UI badge rendering, and re-sync protocol.

## Acceptance Criteria
- [ ] Draft STORY to implement Storage Health Event Emitters and \`useStorageHealth\` hook.
- [ ] Draft STORY to implement the Tactical Storage Health UI Badge.
- [ ] Draft STORY to implement LocalStorage/SessionStorage bridge for fallback maps.
- [ ] Draft STORY to implement IndexedDB Rehydration & Re-sync Protocol.
- [ ] Draft STORY for E2E Verification of Fallback Storage and Telemetry.
