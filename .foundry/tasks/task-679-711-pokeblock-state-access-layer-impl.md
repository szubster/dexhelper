---
id: task-679-711-pokeblock-state-access-layer-impl
type: TASK
title: Pokéblock State Access Hooks
status: ACTIVE
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-25'
depends_on: []
jules_session_id: '877908570689092972'
pr_number: null
parent: story-401-679-pokeblock-viewer-route
tags:
  - gen3
  - react
  - state
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Pokéblock State Access Hooks

## Context
As part of the Gen 3 Pokéblock Viewer Route and Dashboard story, we need to create the state access layer. This involves writing hooks or selectors to cleanly extract the parsed Pokéblock data from the save state context.

## Acceptance Criteria
- [ ] Implement a custom hook or selector (e.g., `usePokeblocks`) to access the parsed Pokéblock data from the global store or context.
- [ ] Ensure the hook correctly handles cases where data might not be loaded yet.
- [ ] Write unit tests to verify the hook correctly retrieves data.
