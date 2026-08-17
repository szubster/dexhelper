---
id: story-309-003-egg-group-validation
type: STORY
title: Gen 2 Egg Group Validation
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-08-17'
depends_on:
  - story-309-001-gender-calculation-engine
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

# Gen 2 Egg Group Validation

## Description
Implement standard breeding compatibility checks based on Egg Groups for Generation 2.
- 'no-eggs' (group 15) cannot breed.
- Ditto (group 13) breeds with anything except 'no-eggs' or another Ditto.
- Non-Ditto pairs must share at least one egg group AND be of opposite genders (which relies on the Gender Calculation Engine).

## Acceptance Criteria
- [x] Tech Lead: Break this STORY down into actionable TASK nodes for the engineering team.
