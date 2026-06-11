---
id: task-094-157-moveset-inventory-validation-impl
type: TASK
title: Implement Moveset and Inventory Validation
status: ACTIVE
owner_persona: coder
created_at: 2026-06-10T00:00:00.000Z
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '13651252026663501106'
pr_number: null
parent: story-053-094-health-scanner-moveset-inventory-validation
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

# Task: Implement Moveset and Inventory Validation

## Context
Corrupted save files often manifest as impossible movesets or corrupted inventory items. We need to validate these aspects against known game data logic for Gen 1 and Gen 2.

## Scope
* Iterate through Pokémon movesets: ensure move IDs are valid and PP values correspond to the move (within limits, accounting for PP Ups).
* Validate player inventory (items and PC items): verify item IDs against known good lists for Gen 1 and Gen 2.
* Detect quantities that are out of bounds (e.g., >99 in normal slots).
* Generate diagnostic output for any invalid moves or items.

## Contracts & Constraints
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Coder: Implement moveset validation logic (check move IDs and PP limits).
- [ ] Coder: Implement inventory validation logic (check item IDs and quantities).
- [ ] Coder: Diagnostic output models accurately reflect invalid moves/items.
