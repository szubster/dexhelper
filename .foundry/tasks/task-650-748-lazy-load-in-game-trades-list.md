---
id: task-650-748-lazy-load-in-game-trades-list
type: TASK
title: Lazy Load In-Game Trades List
status: READY
owner_persona: coder
created_at: '2026-10-12T17:00:00Z'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-402-650-update-generation-views
tags:
  - ui
  - gen-specific
  - lazy-loading
research_references: []
rejection_reason: ''
locks: []
---

# Task: Lazy Load In-Game Trades List

## Description
In `src/routes/in-game-trades.tsx`, `NpcTradeList` is imported directly. Update this import to use `React.lazy()` to reduce initial bundle size, as this component is specifically for rendering the in-game trades views.

## Acceptance Criteria
- [ ] Update the import of `NpcTradeList` in `src/routes/in-game-trades.tsx` to use `React.lazy()`.
- [ ] Ensure the usage of `NpcTradeList` is appropriately handled for lazy loading.
