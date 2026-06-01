---
id: task-058-110-implement-roamer-tracking
type: TASK
title: Implement Roamer Tracking
status: COMPLETED
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-029-058-roamer-tracking-and-stat-evolutions
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Roamer Tracking

## Description
Implement roamer tracking logic to guide the player to check the Pokédex for Raikou, Entei, or Suicune if missing.

## Technical Blueprint

1. **Roamer Tracking Logic**
   - In the Gen 2 Strategy Plugin (`src/engine/assistant/strategies/gen2Strategy.ts`), implement the logic to check if Raikou, Entei, or Suicune are missing from the Pokédex.
   - If they are missing, suggest checking the Pokédex or tracking roamers.
   - Use the `roamingLegendaries` data extracted from the save file.

2. **Tests**
   - Write or update tests to verify the roamer tracking logic.

## Acceptance Criteria
- [x] Roamer tracking logic correctly identifies missing roamers and suggests checking the Pokédex.
- [x] Tests verify roamer tracking logic.
