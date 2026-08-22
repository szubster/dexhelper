---
id: epic-112-309-gen2-shiny-breeding-logic
type: EPIC
title: Gen 2 Shiny Breeding DV Compatibility & Odds Engine
status: READY
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-108-112-gen2-shiny-breeding-dv-planner
tags:
  - gen2
  - breeding
  - logic
research_references:
  - .foundry/docs/knowledge_base/development/gen2_breeding_dv_overlap.md
  - .foundry/docs/knowledge_base/engine/gen2-breeding.md
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 2 Shiny Breeding DV Compatibility & Odds Engine

## Overview
This Epic involves creating the core logic engine required to calculate Pokémon breeding compatibility and shiny odds in Generation 2. This logic will power the Shiny Breeding Planner tool for DexHelper. The logic must accurately reflect the specific mechanics and quirks of Generation 2, particularly concerning DV (Determinant Value) inheritance and how it relates to both gender and shininess.

## Responsibilities & Technical Requirements

1.  **Gender Calculation Engine**:
    *   Implement utility functions to dynamically calculate a Gen 2 Pokémon's gender based solely on its Attack DV and its species' `gender_rate`.
    *   Formula: `female_threshold = gender_rate * 2`. A Pokémon is female if its `Attack DV < female_threshold`. Handle `gender_rate === -1` (Genderless) and edge cases correctly.

2.  **DV Overlap Constraint (Incest Prevention)**:
    *   Implement the Gen 2 "incest prevention" check that determines if two Pokémon are genetically too similar to breed.
    *   Condition for Incompatibility: `(Defense DV A === Defense DV B) AND ((Special DV A === Special DV B) OR (Math.abs(Special DV A - Special DV B) === 8))`.

3.  **Egg Group Validation**:
    *   Implement standard breeding compatibility checks based on Egg Groups.
    *   'no-eggs' (group 15) cannot breed.
    *   Ditto (group 13) breeds with anything except 'no-eggs' or another Ditto.
    *   Non-Ditto pairs must share at least one egg group AND be of opposite genders (which relies on the Gender Calculation Engine).

4.  **Shiny Odds Computation**:
    *   Implement logic to calculate the shiny odds of offspring.
    *   In Gen 2, shininess requires Defense DV = 10 and Special DV = 10.
    *   DVs are inherited from the opposite-gender parent (or the non-Ditto parent).
    *   The engine must determine the specific DVs passed down and calculate the resulting 1/64 odds if a shiny parent (or a parent with the correct DVs) is used.

## Acceptance Criteria
- [x] Story Owner: Break this EPIC down into actionable STORY nodes for the engineering team.
- [x] story-309-001-gender-calculation-engine
- [x] story-309-002-dv-overlap-constraint
- [x] story-309-003-egg-group-validation
- [x] story-309-004-shiny-odds-computation
