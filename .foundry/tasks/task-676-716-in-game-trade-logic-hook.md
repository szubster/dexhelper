---
id: task-676-716-in-game-trade-logic-hook
type: TASK
title: In-Game Trade Logic Hook
status: ACTIVE
owner_persona: coder
created_at: '2026-10-22'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: '3155613825543818820'
pr_number: null
parent: story-350-676-in-game-trade-dashboard-core-ui
tags:
  - react
  - logic
research_references: []
rejection_count: 0
rejection_reason: ''
confidence_score: 100
notes: ''
locks: []
---
# Task: In-Game Trade Logic Hook

## Objective
Create a custom React hook to fetch and compute NPC trade data and completion statuses for the current game version.

## Scope
- Create `src/hooks/useInGameTrades.ts`.
- The hook should fetch `STATIC_NPC_TRADE_DATA` corresponding to the currently loaded game version from the global store.
- It must compute the completion status for each trade: "Claimed", "Available", or "Incomplete".

## Acceptance Criteria
- [x] Create `src/hooks/useInGameTrades.ts`.
- [x] The hook correctly identifies the current game version and retrieves the appropriate trades.
- [x] The hook computes "Claimed" (received Pokemon is owned), "Available" (offered Pokemon is owned, but not claimed), and "Incomplete" (offered Pokemon is not owned) statuses.
- [x] Unit tests are written to verify the hook's logic.
