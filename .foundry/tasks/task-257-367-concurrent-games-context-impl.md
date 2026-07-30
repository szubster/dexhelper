---
id: task-257-367-concurrent-games-context-impl
type: TASK
title: Concurrent Games React Context (Impl)
status: PENDING
owner_persona: coder
created_at: "2026-07-31"
updated_at: "2026-07-31"
depends_on:
  - story-036-256-progression-sync-logic
jules_session_id: null
pr_number: null
parent: story-036-257-concurrent-game-management
tags:
  - frontend
  - progression
  - react-context
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Concurrent Games React Context (Impl)

## Context
We need a shared state layer to manage concurrent playthroughs before we implement the UI components. This ensures decoupled state management as mandated by architectural scaffolding rules.

## Requirements
- Create a React Context (`ConcurrentGamesContext`) to manage a list of concurrent games and the currently `activeGameId`.
- Provide functions to switch the active game and add/remove games from the concurrent list.
- Ensure the state syncs with the offline-first backend schema.

## Acceptance Criteria
- [ ] Implement `ConcurrentGamesProvider` and `useConcurrentGames` hook.
- [ ] Write unit tests for the Context layer.
