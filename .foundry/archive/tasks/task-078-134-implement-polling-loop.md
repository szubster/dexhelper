---
id: task-078-134-implement-polling-loop
type: TASK
title: Implement Background Polling Loop for Save File
status: COMPLETED
owner_persona: coder
created_at: '2026-05-22'
updated_at: '2026-05-23'
depends_on: []jules_session_id: null
pr_number: null
parent: story-041-078-background-polling-loop
tags:
  - feature
  - background-sync
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Background Polling Loop for Save File

## Context
Set up a background polling loop to detect `.sav` file changes using the `lastModified` timestamp on the `File` object returned by `FileSystemFileHandle.getFile()`.

## Implementation Blueprint
- Create a React hook (e.g., `useFileSyncController`) or a background controller that manages the polling loop at a 2-5 second interval.
- It must retrieve the persisted `FileSystemFileHandle` (from IndexedDB via `story-041-077-file-system-access-idb`).
- When a file change is detected (by comparing `lastModified`), read the file as an `ArrayBuffer`.
- Pass the raw `ArrayBuffer` to DexHelper's existing parsing engine and update the global application state to hydrate the "Live Tracker" view.

## Acceptance Criteria
- [x] Polling loop respects the 2-5 second interval using `lastModified`.
- [x] File changes are successfully detected and read as `ArrayBuffer`.
- [x] Global state is hydrated with the parsed `ArrayBuffer` data.
