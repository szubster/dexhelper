---
id: task-084-211-gen2-gender-computation-impl
type: TASK
title: Implement Gen 2 Gender Computation Utility
status: PENDING
owner_persona: coder
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - research-084-215-gen2-gender-computation
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
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Gender Computation Utility

## Objective
Implement a pure utility function to compute a Gen 2 Pokémon's gender based on its Attack DV and Gender Ratio.

## Technical Contract
- Create a utility that accepts a Pokémon's Attack DV and its species' Gender Ratio.
- Return the computed gender based on Gen 2 mechanics.
- **Constraint**: Do not use inline magic numbers. Define memory offsets, lengths, bit locations, and shifts as reusable constants at the module level.

## Acceptance Criteria
- [ ] Utility correctly computes gender based on Gen 2 Attack DV and Gender Ratio.
- [ ] No inline magic numbers are used.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.