---
id: task-714-734-base-trade-evolution-generator-logic
type: TASK
title: Base Trade Evolution Tracking Logic Update
status: READY
owner_persona: coder
created_at: '2026-10-31'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-351-714-base-trade-evolution-tracking
tags:
  - backend
  - evolution
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Base Trade Evolution Tracking Logic Update

## Context
Implement tracking and flagging of Pokémon that are ready to evolve via trade between the loaded saves, for standard trade evolutions (no items). This task focuses on the core logic.

## Requirements
- Update `generateEvolutionSuggestions` in `src/engine/assistant/generators/evolutionGenerator.ts` (or relevant file) to identify standard trade evolutions.
- Introduce logic to evaluate if there's a compatible save among the other loaded saves that can receive the trade.

## Acceptance Criteria
- [ ] Core logic to identify base trade evolution opportunities across multiple saves is implemented.
