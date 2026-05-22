---
id: task-077-131-idb-persistence
type: TASK
title: Implement IndexedDB Persistence for File Handle
status: PENDING
owner_persona: coder
created_at: '2026-05-22'
updated_at: '2026-05-22'
depends_on:
  - task-077-130-file-system-picker-hook
jules_session_id: null
pr_number: null
parent: story-041-077-file-system-access-idb
tags:
  - feature
  - local-sync
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement IndexedDB Persistence for File Handle

## Description
Integrate `idb-keyval` (or a similar IndexedDB wrapper) to serialize and store the `FileSystemFileHandle` obtained in `task-077-130-file-system-picker-hook`. Implement logic to retrieve the handle on subsequent visits. When retrieved, verify if the application still has read permission, and if not, prompt the user using `handle.requestPermission({ mode: 'read' })`.

## Acceptance Criteria
- [ ] The obtained `FileSystemFileHandle` is successfully serialized and saved to IndexedDB.
- [ ] The application attempts to restore the handle from IndexedDB on subsequent visits/reloads.
- [ ] The logic verifies the handle's permissions upon retrieval and successfully uses `requestPermission` to re-request read access if it was revoked.
- [ ] Unit tests verify persistence to IndexedDB and correct permission re-request logic.
