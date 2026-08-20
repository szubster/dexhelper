---
id: story-309-004-shiny-odds-computation
type: STORY
title: Gen 2 Shiny Odds Computation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-08-19'
depends_on:
  - story-309-001-gender-calculation-engine
  - story-309-002-dv-overlap-constraint
  - story-309-003-egg-group-validation
jules_session_id: '11735838444595395559'
pr_number: null
parent: epic-112-309-gen2-shiny-breeding-logic
tags:
  - gen2
  - breeding
  - logic
research_references:
  - .foundry/docs/knowledge_base/engine/gen2-breeding.md
  - .foundry/docs/knowledge_base/development/gen2_breeding_dv_overlap.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Shiny Odds Computation

## Description
Implement logic to calculate the shiny odds of offspring in Generation 2.
- Shininess requires Defense DV = 10 and Special DV = 10.
- DVs are inherited from the opposite-gender parent (or the non-Ditto parent).
- The engine must determine the specific DVs passed down and calculate the resulting 1/64 odds if a shiny parent (or a parent with the correct DVs) is used.

## Acceptance Criteria
- [ ] Tech Lead: Break this STORY down into actionable TASK nodes for the engineering team.
