---
id: story-309-001-gender-calculation-engine
type: STORY
title: Gen 2 Gender Calculation Engine
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-08-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-112-309-gen2-shiny-breeding-logic
tags:
  - gen2
  - breeding
  - logic
research_references:
  - .foundry/docs/knowledge_base/engine/gen2-breeding.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Gender Calculation Engine

## Description
Implement the Gen 2 Pokémon gender calculation logic. This includes creating utility functions to dynamically determine a Pokémon's gender based on its Attack DV and its species' `gender_rate`.
The logic must adhere to the formula: `female_threshold = gender_rate * 2`. A Pokémon is female if its `Attack DV < female_threshold`. It must correctly handle edge cases, such as `gender_rate === -1` (Genderless).

## Acceptance Criteria
- [x] Tech Lead: Break this STORY down into actionable TASK nodes for the engineering team.
- [x] task-309-430-gen2-gender-calculation-engine
- [x] task-309-431-gen2-gender-calculation-qa
