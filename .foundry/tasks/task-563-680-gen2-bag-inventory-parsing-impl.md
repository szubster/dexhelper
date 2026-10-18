---
id: task-563-680-gen2-bag-inventory-parsing-impl
type: TASK
title: Gen 2 Bag Inventory Parsing Implementation
status: FAILED
owner_persona: coder
created_at: '2026-10-12'
updated_at: '2026-10-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-554-563-inventory-item-tracker
tags:
  - dexhelper
  - gen2
research_references: []
rejection_count: 1
rejection_reason: 'Missing unit tests for Gen 2 Bag inventory parsing (Items, Key Items, Balls pockets).'
notes: ''
locks: []
priority: 50
---

# Gen 2 Bag Inventory Parsing Implementation

## Context
As part of the Wild Item Inventory Tracker, we need to extract the Bag inventory from Gen 2 save files.

## Requirements
- Implement logic in the save parser to read Gen 2 Bag items and their quantities.
- Define necessary offsets and data structures in a reusable module, avoiding magic numbers.
- Write unit tests for the parsing logic.

## Acceptance Criteria
- [x] Gen 2 Bag parsing logic is implemented.
- [x] Constants for offsets and limits are correctly defined.
- [x] Unit tests pass for Gen 2 Bag parsing.
