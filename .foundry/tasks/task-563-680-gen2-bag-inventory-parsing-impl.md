---
id: task-563-680-gen2-bag-inventory-parsing-impl
type: TASK
title: Gen 2 Bag Inventory Parsing Implementation
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
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Gen 2 Bag Inventory Parsing Implementation

## Context
As part of the Wild Item Inventory Tracker, we need to extract the Bag inventory from Gen 2 save files.

## Requirements
- Implement logic in the save parser to read Gen 2 Bag items and their quantities.
- Define necessary offsets and data structures in a reusable module, avoiding magic numbers.
- Write unit tests for the parsing logic.

## Acceptance Criteria
- [ ] Gen 2 Bag parsing logic is implemented.
- [ ] Constants for offsets and limits are correctly defined.
- [ ] Unit tests pass for Gen 2 Bag parsing.