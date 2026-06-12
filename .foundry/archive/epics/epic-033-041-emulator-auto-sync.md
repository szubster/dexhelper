---
id: epic-033-041-emulator-auto-sync
type: EPIC
title: Emulator Auto-Sync Integration
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-21'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-061-033-emulator-auto-sync
tags:
  - feature
  - ux
  - local-sync
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Emulator Auto-Sync Integration

## Context
DexHelper needs to support dynamic background refresh of the user's `.sav` file utilizing the Web File System Access API. This allows DexHelper to act as a "Live Tracker" as the emulator writes to the save file. For details on the architecture, see `ADR 016`.

## Requirements
- Obtain a read-only `FileSystemFileHandle` using `showOpenFilePicker`.
- Retain the file handle across sessions by serializing it to IndexedDB.
- Set up a background polling loop (checking `lastModified`) to detect file changes from the emulator.
- Re-parse the `.sav` file natively on change and hydrate the DexHelper state seamlessly.
- Expose sync status (Live, Syncing, Disconnected) in the UI.

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into Stories.

### Stories
- story-041-077-file-system-access-idb
- story-041-078-background-polling-loop
- story-041-079-ui-sync-status
