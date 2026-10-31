---
id: task-676-717-impl-gen3-wallpaper-state-integration
type: TASK
title: Integrate State and Phrase Generation for Wallpaper Dashboard
status: ACTIVE
owner_persona: coder
created_at: '2026-10-22'
updated_at: '2026-10-31'
depends_on:
  - task-676-716-impl-gen3-wallpaper-ui-base
jules_session_id: '18135463726360046718'
pr_number: null
parent: story-337-676-gen3-wallpaper-ui-component
tags:
  - gen3
  - ui
  - customization
  - react
  - zustand
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Integrate State and Phrase Generation for Wallpaper Dashboard

## Objective
Integrate the `WallpaperDashboard` component with Zustand state and the phrase generation engine.

## Context
With the base UI in place, this task connects the component to the application's state. It needs to fetch the `trainerId` from the active Gen 3 save file, pass it to the phrase generation engine, and render the actual calculated phrases. Checkboxes must be wired to the Zustand state.

## Requirements
*   Fetch the current save's `trainerId` from the state/context.
*   Utilize the generator utility to calculate the 16 phrases dynamically.
*   Integrate interactive checkboxes for each phrase, triggering the `toggleWallpaperUnlocked` Zustand action.
*   Ensure the component correctly updates when the save state or unlocked wallpapers change.

## Acceptance Criteria
- [ ] Connect `WallpaperDashboard` to `trainerId` and phrase generator.
- [ ] Wire checkboxes to `toggleWallpaperUnlocked` action.
