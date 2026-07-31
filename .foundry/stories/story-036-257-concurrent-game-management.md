---
id: story-036-257-concurrent-game-management
type: STORY
title: Concurrent Game Management UI/UX
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-03'
updated_at: '2026-07-31'
depends_on:
  - story-036-256-progression-sync-logic
jules_session_id: '4551867605052812174'
pr_number: null
parent: epic-031-036-progression-tracking
tags:
  - frontend
  - progression
  - ui
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Concurrent Game Management UI/UX

## Context
Users may play multiple games simultaneously (e.g., swapping between Pokémon Red and Emerald). We need frontend state management and UI components to allow users to switch between their active, concurrent playthroughs easily and view their progression timelines.

## Requirements
- Develop a UI for users to select and manage multiple active playthroughs across different game versions.
- Implement state management to quickly swap the context of the current active game.
- Build a timeline or visualization showing the progression of a specific playthrough over its saved history.

## Acceptance Criteria
- [ ] Tech Lead: Break this Story down into Tasks to implement the concurrent game switcher UI, state management, and progression visualization.
