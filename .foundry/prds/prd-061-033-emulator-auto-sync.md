---
id: prd-061-033-emulator-auto-sync
type: PRD
title: Emulator Auto-Sync via File System Access API
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-21'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-061-emulator-auto-sync
tags:
  - feature
  - ux
  - local-sync
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Emulator Auto-Sync via File System Access API

## Context
Currently, DexHelper requires users to manually upload their `.sav` file every time they make progress in their game. While this offline-first, client-side approach guarantees privacy and avoids server costs, the constant drag-and-drop friction disrupts the user experience, especially during long play sessions or active team building.

## Goal
To implement a background auto-refresh mechanism utilizing the Web File System Access API. This mechanism will securely read the user's `.sav` file dynamically (after explicit user permission is granted), parsing it and updating DexHelper's UI in real-time as the emulator writes changes to the save file.

## Scope
### In Scope
- **Web File System Access API Integration:** Use `showOpenFilePicker` (or `showDirectoryPicker`) to obtain a read-only file handle to the game's `.sav` file.
- **File Handle Retainment:** Store the file handle in IndexedDB so that on subsequent visits, the user only needs to grant permission without re-selecting the file.
- **Change Detection:** Implement a polling mechanism (e.g., checking `File.lastModified` periodically) or use `FileSystemObserver` (if available/polyfilled) to detect when the emulator updates the save file.
- **Live State Updates:** Automatically trigger the application's parsing engine and state hydration when a file change is detected, providing a "live tracker" experience.
- **UI Indicators:** Add UI components to start/stop the auto-sync, display the current sync status ("Live", "Syncing...", "Disconnected"), and handle permission requests.
- **Error Handling:** Gracefully handle edge cases such as lost file access, permission denial, or malformed save files during the auto-sync process.

### Out of Scope
- Server-side synchronization, cloud syncing, or multi-device sync (this feature is strictly local).
- Writing to the `.sav` file. DexHelper remains strictly read-only to prevent any risk of save file corruption.

## Next Steps
- [x] Architect: Create an ADR evaluating the File System Access API implementation strategy (polling vs observer, handle retainment) and defining the application-level state synchronization architecture.

## Downstream
- .foundry/epics/epic-033-041-emulator-auto-sync.md
