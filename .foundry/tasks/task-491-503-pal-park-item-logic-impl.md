---
id: task-491-503-pal-park-item-logic-impl
type: TASK
title: Pal Park Item Identification Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-08-31'
updated_at: '2026-09-02'
depends_on:
  - task-491-502-pal-park-item-constants-impl
jules_session_id: '17359144785186914565'
pr_number: null
parent: story-420-491-pal-park-item-identification
tags:
  - feature
  - gen3
  - pal-park
  - migration
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Task: Pal Park Item Identification Logic

## Objective
Implement utility logic to identify if a held item is a high-value item.

## Context
Using the defined constants, create the core utility function that the UI will use to check if an item should be highlighted.

## Requirements
- Implement a utility function `identifyHighValueHeldItem(heldItemId: number): { isHighValue: boolean, itemName?: string }` (or similar signature) in `src/engine/palPark/itemIdentification.ts` that checks if a given `heldItemId` is in the high-value constants list.
- Ensure the function returns the necessary information for the UI to render the highlight.

## Acceptance Criteria
- [x] Implement `identifyHighValueHeldItem` logic.
- [x] Write unit tests for the item identification logic.
