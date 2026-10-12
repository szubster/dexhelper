---
id: task-563-682-gen3-bag-inventory-parsing-impl
type: TASK
title: Gen 3 Bag Inventory Parsing Implementation
status: PENDING
owner_persona: coder
created_at: "2026-10-12"
updated_at: "2026-10-12"
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-554-563-inventory-item-tracker
priority: 50
confidence_score: null
tags:
  - dexhelper
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 3 Bag Inventory Parsing Implementation

## Context
As part of the Wild Item Inventory Tracker, we need to extract the Bag inventory from Gen 3 save files.

## Requirements
- Implement logic in the save parser to read Gen 3 Bag items and their quantities.
- Utilize resolved section offsets for relative memory offsets to support A/B bank flash memory architecture.
- Define necessary offsets and data structures in a reusable module.
- Write unit tests for the parsing logic.

## Acceptance Criteria
- [ ] Gen 3 Bag parsing logic is implemented.
- [ ] Relative memory offsets are used.
- [ ] Constants are properly defined.
- [ ] Unit tests pass.
