---
id: story-053-094-health-scanner-moveset-inventory-validation
type: STORY
title: Implement Moveset and Inventory Validation
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-02'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-036-053-health-scanner-core-engine
tags:
  - feature
  - gen1
  - gen2
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Story: Implement Moveset and Inventory Validation

## Context
Corrupted save files often manifest as impossible movesets or corrupted inventory items. We need to validate these aspects against known game data logic.

## Scope
* Iterate through Pokémon movesets: ensure move IDs are valid and PP values correspond to the move (within limits, accounting for PP Ups).
* Validate player inventory (items and PC items): verify item IDs against known good lists for Gen 1 and Gen 2.
* Detect quantities that are out of bounds (e.g., >99 in normal slots).
* Generate diagnostic output for any invalid moves or items.

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks for the coder.

### Child Nodes
- [ ] .foundry/tasks/task-094-157-moveset-inventory-validation-impl.md
- [ ] .foundry/tasks/task-094-158-moveset-inventory-validation-qa.md
