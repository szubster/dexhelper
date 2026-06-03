---
id: task-083-146-flag-shiny-carriers-impl
type: TASK
title: Implement isShinyCarrier Property in Parsed Data
status: ACTIVE
owner_persona: coder
created_at: '2026-06-01'
updated_at: '2026-06-03'
depends_on: []
jules_session_id: '10092150020180186448'
pr_number: null
parent: story-044-083-pc-party-shiny-flag
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement isShinyCarrier Property in Parsed Data

## Context
We need to expose the Shiny Carrier status in the Pokémon objects parsed from Gen 1 and Gen 2 saves. Currently, the save parsing utilities extract DVs and calculate `hasShinyGene`, but the product requirement dictates that the property should be named `isShinyCarrier`.

## Objective
Update `PokemonInstance` in the `common.ts` parser logic to use the `isShinyCarrier` boolean property name (instead of `hasShinyGene`) and update all parsing paths (Gen 1 and Gen 2) to correctly set this property.

## Requirements
1. In `src/engine/saveParser/parsers/common.ts`, rename the optional `hasShinyGene?: boolean;` property on the `PokemonInstance` interface to `isShinyCarrier?: boolean;`.
2. In `src/engine/saveParser/parsers/gen1.ts`, update the parsed data population to set `isShinyCarrier` using the result of `checkShinyGene(dvs)`.
3. In `src/engine/saveParser/parsers/gen2.ts`, update the parsed data population to set `isShinyCarrier` using the result of `checkShinyGene(dvs)`.
4. Ensure all related unit tests are updated and pass.

## Acceptance Criteria
- [ ] `PokemonInstance` interface uses `isShinyCarrier` instead of `hasShinyGene`.
- [ ] Gen 1 and Gen 2 parsers correctly assign `isShinyCarrier`.
- [ ] Unit tests are updated and pass without errors.

## Reminder for Coder and QA
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
