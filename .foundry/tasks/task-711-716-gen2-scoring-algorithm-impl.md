---
id: task-711-716-gen2-scoring-algorithm-impl
type: TASK
title: Gen 2 Bug-Catching Contest Scoring Algorithm Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-10-22'
updated_at: '2026-10-24'
depends_on: []
jules_session_id: '6623625933336601451'
pr_number: null
parent: story-513-711-gen2-scoring-algorithm
tags:
  - gen2
  - backend
  - score-calculation
research_references: []
confidence_score: 100
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Bug-Catching Contest Scoring Algorithm Implementation

## Description
This task implements the core scoring algorithm for the Gen 2 Bug-Catching Contest. The formula uses HP, stats, DVs, and the held item.

## Acceptance Criteria
- [ ] Create a new module or function to calculate the score.
- [ ] Implement the score calculation: `4 * Max HP` + `Sum of the Pokémon's other stats (Attack, Defense, Special Attack, Special Defense, Speed)` + `IV Bonus (Up to 29 points)` + `floor(Current HP / 8)` + `1 point` if the Pokémon is holding an item.
- [ ] Implement the IV Bonus logic: `16 points` if `floor(Defense IV / 2)` is an odd number, `8 points` if `floor(Attack IV / 2)` is an odd number, `4 points` if `floor(Special IV / 2)` is an odd number, `1 point` if `floor(Speed IV / 2)` is an odd number. Shiny Pokémon automatically earn all 29 IV Bonus points.
