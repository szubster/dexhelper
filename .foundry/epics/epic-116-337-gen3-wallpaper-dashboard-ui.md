---
id: epic-116-337-gen3-wallpaper-dashboard-ui
type: EPIC
title: Gen 3 Wallpaper Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-07-19'
updated_at: '2026-07-19'
depends_on:
  - epic-116-335-gen3-wallpaper-phrase-generation-engine
  - epic-116-336-gen3-wallpaper-app-state-tracking
jules_session_id: null
parent: prd-116-049-gen3-pc-box-wallpaper-customizer
tags:
  - gen3
  - customization
  - ui
rejection_reason: ''
rejection_count: 0
---

# Gen 3 Wallpaper Dashboard UI

## Objective
Build the user interface for the "Custom Wallpaper Checklist" dashboard, allowing Gen 3 players to view their personalized unlock phrases and track their progress.

## Context
Once the phrase generation engine (Epic 335) calculates the codes based on the parsed `trainerId`, and the app state tracking (Epic 336) is in place, the application needs a dedicated UI to display this information to the user. This dashboard will serve as the primary interaction point for players seeking to unlock the secret PC Box wallpapers in Ruby, Sapphire, and Emerald.

## Requirements
*   Create a new view/component for the Wallpaper Checklist within the Gen 3 application structure.
*   The UI must fetch the current `trainerId` from the active save data and pass it to the generation engine to retrieve the 16 phrases.
*   Display the 16 phrases clearly, ideally grouped by in-game theme/category if applicable.
*   Integrate interactive checkboxes for each phrase, connected to the state tracking mechanism, so users can mark them as unlocked.
*   Ensure the design adheres to the project's Tailwind v4 and React UI guidelines.
*   Add unit tests using Vitest Browser Mode to verify component rendering and interaction logic.

## Dependencies
*   `.foundry/epics/epic-116-335-gen3-wallpaper-phrase-generation-engine.md`
*   `.foundry/epics/epic-116-336-gen3-wallpaper-app-state-tracking.md`

## Acceptance Criteria
- [ ] Story Owner: Break this EPIC down into actionable STORY nodes.
