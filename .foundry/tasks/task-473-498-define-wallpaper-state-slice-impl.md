---
id: task-473-498-define-wallpaper-state-slice-impl
type: TASK
title: Define Gen 3 Wallpaper State Slice and Toggle Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-08-27'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: '8251558123920377316'
parent: story-116-473-gen3-wallpaper-app-state-tracking-impl
rejection_reason: ''
---

# Define Gen 3 Wallpaper State Slice and Toggle Logic

## Objective
Define the state slice in the global store (`src/store.ts`) for tracking unlocked Gen 3 custom PC Box wallpapers and implement the toggle update function.

## Requirements
* Define the state slice in the global store (`src/store.ts`) to store boolean flags for the 16 wallpapers.
* The state must be keyed by the current save file's `trainerId`. The data structure should be `Record<number, Record<number, boolean>>` (mapping trainerId to wallpaper index to boolean).
* Implement a state update function `toggleWallpaperUnlocked(trainerId: number, wallpaperId: number)` to allow the UI to modify the state.

## Acceptance Criteria
- [ ] Implement the state slice in `src/store.ts`.
- [ ] Implement the `toggleWallpaperUnlocked` function in `src/store.ts`.
