---
id: task-473-499-configure-wallpaper-state-persistence-impl
type: TASK
title: Configure Wallpaper State Persistence
status: ACTIVE
owner_persona: coder
created_at: '2026-08-27'
updated_at: '2026-09-01'
depends_on:
  - task-473-498-define-wallpaper-state-slice-impl
jules_session_id: '4498122743459600767'
parent: story-116-473-gen3-wallpaper-app-state-tracking-impl
rejection_reason: ''
---

# Configure Wallpaper State Persistence

## Objective
Ensure the unlocked wallpapers state persists across application reloads by updating the `partialize` configuration in the `persist` middleware in `src/store.ts`.

## Requirements
* Update the `partialize` configuration in the `persist` middleware in `src/store.ts` to include the new unlocked wallpapers record so that it persists across application reloads.

## Acceptance Criteria
- [ ] Update the `partialize` configuration in `src/store.ts` to include the wallpaper state.
