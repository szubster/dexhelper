---
id: idea-061-emulator-auto-sync
type: IDEA
title: Emulator Auto-Sync via File System Access API
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-21'
updated_at: '2026-05-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - ux
  - local-sync
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Emulator Auto-Sync via File System Access API

## Context
Currently, DexHelper requires users to manually upload their `.sav` file every time they make progress in their game. While this offline-first, client-side approach guarantees privacy and avoids server costs, the constant drag-and-drop friction disrupts the user experience, especially during long play sessions or active team building.

## Proposal
Leverage the modern Web **File System Access API** (`showDirectoryPicker` or `showOpenFilePicker` with retainment) to allow the user to securely grant DexHelper read-only access to their emulator's local save directory or specific `.sav` file.

- **Live Auto-Refresh:** Once access is granted, DexHelper can use polling or an `FileSystemObserver` (if available/polyfilled) to detect when the emulator updates the save file.
- **Seamless Tracking:** The application will automatically re-parse the save file in the background and update the UI in real-time, effectively creating a "live tracker" experience without any server-side synchronization.

## Value Proposition
This significantly reduces the friction of using the app during gameplay. It perfectly aligns with the offline-first mandate, bridging the gap between a static "save viewer" and a dynamic "live companion app" for emulated playthroughs, and serves as a crucial foundational piece for advanced features like the "Automated Nuzlocke Tracker" (IDEA-057).

## Next Steps
- [x] Product Manager: Convert this idea into a PRD.

## Generated Nodes
- PRD: `.foundry/prds/prd-061-033-emulator-auto-sync.md`
