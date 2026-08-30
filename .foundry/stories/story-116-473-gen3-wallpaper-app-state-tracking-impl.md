---
id: story-116-473-gen3-wallpaper-app-state-tracking-impl
type: STORY
title: Implement Gen 3 Wallpaper App State Tracking
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-20'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
parent: epic-116-336-gen3-wallpaper-app-state-tracking
tags:
  - gen3
  - customization
  - state
rejection_count: 0
rejection_reason: ''
---

# Implement Gen 3 Wallpaper App State Tracking

## Objective
Implement a persistence mechanism within the global Zustand store to track which of the 16 custom PC Box wallpapers the user has successfully unlocked for a specific save file.

## Requirements
*   Define the state slice in the global store (`src/store.ts`) to store boolean flags for the 16 wallpapers. The state must be keyed by the current save file's `trainerId`. The data structure should be `Record<number, Record<number, boolean>>` (mapping trainerId to wallpaper index to boolean).
*   Implement a state update function `toggleWallpaperUnlocked(trainerId: number, wallpaperId: number)` to allow the UI to modify the state.
*   Ensure the state persists across application reloads by updating the `partialize` configuration in the `persist` middleware in `src/store.ts` to include the new unlocked wallpapers record.
*   Add unit tests in `src/store.test.ts` to verify the state management logic and ensure the toggle function correctly updates the specific trainer's data.

## Acceptance Criteria
- [x] Tech Lead: Break down into tasks.
- [ ] task-473-498-define-wallpaper-state-slice-impl
- [ ] task-473-499-configure-wallpaper-state-persistence-impl
- [ ] task-473-500-wallpaper-state-unit-tests-impl
- [ ] task-473-501-wallpaper-state-tracking-qa
