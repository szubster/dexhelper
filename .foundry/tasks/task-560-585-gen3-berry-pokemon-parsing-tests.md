---
id: task-560-585-gen3-berry-pokemon-parsing-tests
type: TASK
title: Write Tests for Gen 3 Berry and Pokémon Parsing Logic
status: READY
owner_persona: coder
created_at: '2026-09-16T19:33:51Z'
updated_at: '2026-09-16T19:33:51Z'
depends_on:
  - task-560-583-gen3-berry-pouch-parsing-impl
  - task-560-584-gen3-pokemon-condition-parsing-impl
jules_session_id: null
pr_number: null
parent: story-540-560-gen3-berry-pouch-and-pokemon-parsing
tags:
  - dexhelper
  - gen3
  - contests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write Tests for Gen 3 Berry and Pokémon Parsing Logic

## 1. Context & Problem Statement
With the implementation of the backend save parsing logic for the Gen 3 berry pouch and Pokémon condition stats/Nature, we need to ensure the robustness and correctness of these extraction functions by writing comprehensive unit tests.

## 2. Solution Overview
Implement unit tests that cover normal parsing and edge cases (e.g., empty inventories, various natures, invalid save states) for the newly implemented parsing logic.

## Acceptance Criteria
- [ ] Implement unit tests covering the Gen 3 berry pouch parsing logic.
- [ ] Implement unit tests covering the Gen 3 Pokémon condition and Nature parsing logic.
- [ ] Test the handling of edge cases (such as maxed stats or empty inventories).
