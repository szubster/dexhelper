---
id: adr-016-file-system-access-api-sync
type: ADR
title: 'ADR 016: File System Access API & Emulator Auto-Sync'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-21'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 016: File System Access API & Emulator Auto-Sync

## Date
2026-05-21

## Status
Accepted

## Context
DexHelper currently requires manual `.sav` file uploads to sync game state. While this offline-first design ensures privacy, it creates severe UX friction. We want to implement a background auto-refresh mechanism using the Web File System Access API to dynamically read the `.sav` file as the emulator writes to it.

The File System Access API gives web applications the ability to read and write directly to the user's local file system after the user grants explicit permission. The challenge lies in detecting when the file changes, and maintaining access across sessions. `FileSystemObserver` is an emerging standard, but polling is the fallback.

## Decision

1. **Implementation Strategy (Observer vs. Polling):**
   - We will primarily rely on a **polling mechanism** (checking the `lastModified` timestamp on the `File` object returned by `getFile()`) at a sensible interval (e.g., 2-5 seconds) as the reliable, cross-browser standard approach.
   - If `FileSystemObserver` is available in the browser (e.g., behind a flag or in newer Chrome versions), we can feature-detect and optionally use it for more efficient event-driven updates, but the core architecture must assume polling is necessary.
   - We will only use `showOpenFilePicker` to request a read-only handle. Writing is explicitly out of scope to avoid save corruption.

2. **Handle Retainment:**
   - We will serialize and store the `FileSystemFileHandle` in **IndexedDB** (`idb-keyval` or similar) so the handle persists across page reloads.
   - On subsequent visits, we will attempt to restore the handle. The user will not need to use the file picker again, but the browser may natively prompt them to re-verify permission to access the retained handle using `handle.requestPermission({ mode: 'read' })`.

3. **Application-Level State Synchronization Architecture:**
   - **Sync Controller:** A dedicated controller or React hook will manage the polling loop and maintain the `FileSystemFileHandle` state.
   - **Detection & Trigger:** When `lastModified` changes, the Sync Controller will read the file as an `ArrayBuffer`.
   - **Parsing & Hydration:** The raw ArrayBuffer will be passed to DexHelper's existing parsing engine (`parseSaveFile`).
   - **Global State Update:** The parsed data will then hydrate the global application state, triggering a reactive UI update ("Live Tracker" experience).
   - **Status Indicators:** The Sync Controller will expose sync status (e.g., "Live", "Syncing...", "Disconnected") for the UI to display.

## Consequences

- **Positive:** Massive UX improvement. Users can keep DexHelper open on a second monitor while playing, and it acts as a live, offline-first dashboard.
- **Negative:** Increased client-side resource usage due to polling (if `FileSystemObserver` is unavailable). Polling must be managed efficiently to avoid battery drain or stuttering.
- **Constraints:**
  - File System Access API is currently a Chromium-only feature (Chrome, Edge, Opera). Firefox and Safari do not support it. We must ensure DexHelper falls back gracefully to the manual drag-and-drop upload for unsupported browsers.
  - Users must explicitly re-grant permission in some browser setups when re-loading the app with a stored handle, which requires a user gesture (e.g., clicking a "Resume Sync" button).
