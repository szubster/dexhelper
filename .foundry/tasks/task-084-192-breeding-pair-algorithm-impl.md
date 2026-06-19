---
id: task-084-192-breeding-pair-algorithm-impl
type: TASK
title: Implement Shiny Carrier Breeding Pair Algorithm
status: CANCELLED
owner_persona: coder
created_at: '2026-06-16'
updated_at: '2026-06-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: 'Aborted: The task lacked sufficient clarity regarding Egg Groups, leading to permanent failure.'
notes: >-
  If you experience a transient failure requiring retry, update the YAML
  frontmatter to status: FAILED with a rejection_reason. If you must abort
  permanently, update the YAML frontmatter to status: CANCELLED with a
  rejection_reason. If submitting an empty PR, check off all Acceptance Criteria
  checkboxes before submitting.
---

# Implement Shiny Carrier Breeding Pair Algorithm

## Objective
Develop an algorithm to suggest optimal breeding pairs by cross-referencing Egg Groups, genders, and Shiny Carrier status across the user's PC storage.

## Scope
- Implement a matching algorithm that takes a full set of user Pokémon and identifies valid breeding pairs.
- Ensure the algorithm prioritizes pairs where at least one parent is a Shiny Carrier.
- Validate that the algorithm correctly respects Gen 2 breeding rules (e.g., Egg Group compatibility, gender requirements).

## Acceptance Criteria
- [ ] Algorithm correctly identifies valid breeding pairs based on Egg Groups and genders.
- [ ] Algorithm accurately identifies and highlights optimal pairs involving Shiny Carriers.

### Auditor Rejection
**CANCELLED:** This task was cancelled and replaced by `task-084-204-breeding-pair-algorithm-impl` because it lacked sufficient clarity or dependencies related to Egg Groups.
