---
id: task-058-094-implement-roamer-and-stat-evolutions
type: TASK
title: Implement Roamer Tracking & Stat-Based Evolutions
status: COMPLETED
owner_persona: coder
created_at: '2026-05-18'
updated_at: '2026-05-19'
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
rejection_count: 2
rejection_reason: 'Session terminated with state: FAILED'
notes: ''
---

# Implement Roamer Tracking & Stat-Based Evolutions

## Description
Implement roamer tracking logic to guide the player to check the Pokédex for Raikou, Entei, or Suicune if missing. Also, update the evolution logic to accurately process stat-based evolutions like Tyrogue.

## Technical Blueprint

1. **Roamer Tracking Logic**
   - In the Gen 2 Strategy Plugin (`src/engine/assistant/strategies/gen2Strategy.ts` or related engine files), implement the logic to check if Raikou, Entei, or Suicune are missing from the Pokédex.
   - If they are missing, suggest checking the Pokédex or tracking roamers.
   - Use the `roamingLegendaries` data extracted from the save file (from `SaveData.roamingLegendaries`).

2. **Stat-Based Evolutions**
   - Update the evolution logic to correctly evaluate stat-based evolutions, specifically for Tyrogue (Hitmonlee: Atk > Def, Hitmonchan: Atk < Def, Hitmontop: Atk = Def).
   - Render dynamic UI messages showing the exact stat requirements for these evolutions.

3. **Tests**
   - Write or update tests to verify the roamer tracking logic and the stat-based evolution suggestions.

## Acceptance Criteria
- [x] Roamer tracking logic correctly identifies missing roamers and suggests checking the Pokédex.
- [x] Evolution logic accurately evaluates stat-based requirements (e.g., Atk > Def for Hitmonlee).
- [x] UI dynamically displays stat requirements for stat-based evolutions.
- [x] Tests verify roamer tracking and stat-based evolution logic.
