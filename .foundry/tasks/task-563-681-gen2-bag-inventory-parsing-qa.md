---
id: task-563-681-gen2-bag-inventory-parsing-qa
type: TASK
title: Gen 2 Bag Inventory Parsing QA
status: PENDING
owner_persona: qa
created_at: '2026-10-12'
updated_at: '2026-10-24'
depends_on:
  - task-563-680-gen2-bag-inventory-parsing-impl
jules_session_id: null
pr_number: null
parent: story-554-563-inventory-item-tracker
tags:
  - dexhelper
  - gen2
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Gen 2 Bag Inventory Parsing QA

## Context
QA verification for Gen 2 Bag inventory parsing.

## Requirements
- Verify that Gen 2 Bag items and quantities are correctly parsed.
- Ensure no magic numbers are used and constants are properly defined.
- Validate unit tests are comprehensive.

## Acceptance Criteria
- [ ] QA verifies that Gen 2 Bag items and quantities are correctly parsed.
- [ ] No magic numbers are used and constants are properly defined.
- [ ] Unit tests are comprehensive.

### Auditor Rejection
The upstream implementation is missing unit tests for the Bag inventory (Items, Key Items, Balls pockets) in `src/engine/saveParser/parsers/gen2.test.ts`. Please add the required tests.
