---
id: epic-116-336-gen3-wallpaper-app-state-tracking
type: EPIC
title: Gen 3 Wallpaper App State Tracking
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-19'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '4869820587410010596'
parent: prd-116-049-gen3-pc-box-wallpaper-customizer
tags:
  - gen3
  - customization
  - state
rejection_count: 0
rejection_reason: ''
---

# Gen 3 Wallpaper App State Tracking

## Objective
Implement a persistence mechanism within the frontend application (e.g., using Zustand and/or IndexedDB) to track which of the 16 custom PC Box wallpapers the user has successfully unlocked for a specific save file.

## Context
The Custom Wallpaper Checklist dashboard will display 16 generated phrases. Since the save file itself doesn't easily expose which wallpapers have been unlocked via Walda's father (or at least, we are not extracting that flag directly from the ROM save data at this time), the application needs its own local state to remember which checkboxes the user has ticked off. This tracking should be scoped to the `trainerId` or the specific save file hash, so that if a user switches between different Gen 3 saves, their checklist progress is accurate for that specific save.

## Requirements
*   Define the state slice in the global store (e.g., Zustand) or IndexedDB schema to store boolean flags for the 16 wallpapers.
*   The state must be keyed or associated with the current save file's `trainerId` or unique identifier so that progress is isolated per save.
*   Implement state update functions (e.g., `toggleWallpaperUnlocked(trainerId, wallpaperId)`) to allow the UI to modify the state.
*   Ensure the state persists across application reloads (e.g., via `persist` middleware if using Zustand).
*   Add unit tests for the state management logic.

## Dependencies
*   Relies on the global application state management architecture.

## Acceptance Criteria
- [ ] Story Owner: Break this EPIC down into actionable STORY nodes.
