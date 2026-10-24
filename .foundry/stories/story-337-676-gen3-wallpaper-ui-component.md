---
id: story-337-676-gen3-wallpaper-ui-component
type: STORY
title: Gen 3 Wallpaper Dashboard UI Component
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-10-18'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: '3958506681657671349'
locks: []
pr_number: null
parent: epic-116-337-gen3-wallpaper-dashboard-ui
priority: 50
confidence_score: null
tags:
  - gen3
  - ui
  - customization
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Wallpaper Dashboard UI Component

## Objective
Build the core `WallpaperDashboard` React component that displays the 16 generated unlock phrases and integrates with the app state tracking checkboxes.

## Context
As part of the Gen 3 Wallpaper Customizer Epic, we need the actual UI component that renders the checklist. This component needs to fetch the `trainerId` from the active Gen 3 save file, pass it to the phrase generation engine (from Epic 335), and render the 16 phrases. It should use checkboxes that connect to the Zustand state (implemented in Epic 336) to track unlocks.

## Requirements
*   Create a new React component `WallpaperDashboard` in `src/components/gen3/` or the appropriate Gen 3 specific folder.
*   Fetch the current save's `trainerId` from the state/context.
*   Utilize the generator utility to calculate the 16 phrases.
*   Display the phrases, grouped by category/theme if applicable.
*   Integrate interactive checkboxes for each phrase, triggering the `toggleWallpaperUnlocked` Zustand action.
*   Adhere strictly to the project's UI aesthetic constraints (ADR 008): tactical hardware, `rounded-none`, `border-dashed`, monospaced telemetry fonts, and use defined `@utility` primitives from `src/index.css`.
*   Include comprehensive unit tests using Vitest Browser Mode (`vitest-browser-react`) to verify rendering, phrase display, and checkbox interaction logic.

## Acceptance Criteria
- [x] Tech Lead: Break down into TASK nodes for component implementation and verification.
- [ ] task-676-716-impl-gen3-wallpaper-ui-base
- [ ] task-676-717-impl-gen3-wallpaper-state-integration
- [ ] task-676-718-impl-gen3-wallpaper-view-integration
- [ ] task-676-719-test-gen3-wallpaper-dashboard
- [ ] task-676-720-qa-gen3-wallpaper-dashboard
