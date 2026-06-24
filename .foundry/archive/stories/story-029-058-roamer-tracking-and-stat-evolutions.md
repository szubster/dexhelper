---
id: story-029-058-roamer-tracking-and-stat-evolutions
type: STORY
title: 'Story: Roamer Tracking & Stat-Based Evolutions'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-16'
updated_at: '2026-05-18'
depends_on: []jules_session_id: null
pr_number: null
parent: epic-017-029-strategy-engine-adaptations
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Roamer Tracking & Stat-Based Evolutions

## Description
Implement roamer tracking logic to guide the player to check the Pokédex for Raikou, Entei, or Suicune if missing. Also, update the evolution logic to accurately process stat-based evolutions like Tyrogue.

## Acceptance Criteria
- [x] Roamer tracking logic correctly identifies missing roamers and suggests checking the Pokédex.
- [x] Evolution logic accurately evaluates stat-based requirements (e.g., Atk > Def for Hitmonlee).
- [x] UI dynamically displays stat requirements for stat-based evolutions.
- [x] Tests verify roamer tracking and stat-based evolution logic.


## Tasks
- .foundry/tasks/task-058-110-implement-roamer-tracking.md
- .foundry/tasks/task-058-111-qa-roamer-tracking.md
- .foundry/tasks/task-058-112-implement-stat-evolutions.md
- .foundry/tasks/task-058-113-qa-stat-evolutions.md
- .foundry/tasks/task-058-094-implement-roamer-and-stat-evolutions.md
- .foundry/tasks/task-058-095-qa-roamer-and-stat-evolutions.md
