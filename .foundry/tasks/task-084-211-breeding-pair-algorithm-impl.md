---
id: task-084-211-breeding-pair-algorithm-impl
type: TASK
title: Implement Shiny Carrier Breeding Pair Algorithm
status: PENDING
owner_persona: coder
created_at: "2026-06-20"
updated_at: "2026-06-20"
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
rejection_reason: ""
notes: ""
---

# Implement Shiny Carrier Breeding Pair Algorithm

## Objective
Implement an algorithm to suggest optimal breeding pairs by cross-referencing Egg Groups, genders, and Shiny Carrier status across the user's PC storage.

## Scope
- Implement a matching algorithm that takes a full set of user Pokémon and identifies valid breeding pairs.
- Ensure the algorithm prioritizes pairs where at least one parent is a Shiny Carrier.
- Validate that the algorithm correctly respects Gen 2 breeding rules (e.g., Egg Group compatibility, gender requirements).

## Contracts & Constraints
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When writing save file parsing logic, all memory offsets, lengths, bit locations, and shifts MUST be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- If writing tests with `vi.fn()`, provide explicit type parameters to satisfy strict Biome type-checking (e.g., `vi.fn<() => void>()`).

## Acceptance Criteria
- [ ] Algorithm correctly identifies valid breeding pairs based on Egg Groups and genders.
- [ ] Algorithm accurately identifies and prioritizes pairs involving Shiny Carriers.
- [ ] The algorithm is implemented with correct typing, using clear reusable constants where appropriate.
