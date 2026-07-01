---
id: task-094-158-moveset-inventory-validation-qa
type: TASK
title: QA - Moveset and Inventory Validation
status: PENDING
owner_persona: qa
created_at: 2026-06-10
updated_at: 2026-06-10
depends_on:
  - task-094-157-moveset-inventory-validation-impl
jules_session_id: null
pr_number: null
parent: story-053-094-health-scanner-moveset-inventory-validation
tags:
  - feature
  - gen1
  - gen2
  - validation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Task: QA - Moveset and Inventory Validation

## Context
Corrupted save files often manifest as impossible movesets or corrupted inventory items. We need to validate these aspects against known game data logic for Gen 1 and Gen 2. This task verifies the logic implemented by the coder.

## Scope
* Verify the moveset validation logic handles valid and invalid move IDs correctly.
* Verify the moveset validation logic correctly limits PP values (accounting for PP Ups).
* Verify inventory item IDs check properly against known good lists for Gen 1 and Gen 2.
* Verify the quantity validation correctly detects out-of-bounds (>99) values.
* Verify diagnostic models output invalid cases correctly.

## Contracts & Constraints
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] QA: Write and pass unit tests for moveset validation logic.
- [ ] QA: Write and pass unit tests for inventory item and quantity validation.
- [ ] QA: Write and pass unit tests verifying diagnostic outputs.
