---
id: story-309-002-dv-overlap-constraint
type: STORY
title: Gen 2 DV Overlap Constraint (Incest Prevention)
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '7542590417705425224'
pr_number: null
parent: epic-112-309-gen2-shiny-breeding-logic
tags:
  - gen2
  - breeding
  - logic
research_references:
  - .foundry/docs/knowledge_base/development/gen2_breeding_dv_overlap.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 DV Overlap Constraint (Incest Prevention)

## Description
Implement the Gen 2 "incest prevention" check that determines if two Pokémon are genetically too similar to breed.
Condition for Incompatibility: `(Defense DV A === Defense DV B) AND ((Special DV A === Special DV B) OR (Math.abs(Special DV A - Special DV B) === 8))`.

## Acceptance Criteria
- [ ] Tech Lead: Break this STORY down into actionable TASK nodes for the engineering team.
