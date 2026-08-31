---
id: task-491-504-pal-park-item-ui-impl
type: TASK
title: Pal Park Item Identification UI Component
status: PENDING
owner_persona: coder
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on:
  - task-491-503-pal-park-item-logic-impl
jules_session_id: null
pr_number: null
parent: story-420-491-pal-park-item-identification
locks: []
tags:
  - feature
  - gen3
  - pal-park
  - migration
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Pal Park Item Identification UI Component

## Objective
Implement UI changes to highlight high-value items in the Pal Park Migration Planner.

## Context
The user needs to visually see which Pokemon hold high-value items when planning a Pal Park migration.

## Requirements
- Update the relevant Pokemon display component (e.g. `PalParkPokemonCard` or similar) to use the `identifyHighValueHeldItem` utility.
- Highlight the item name or display a badge if `isHighValue` is true.
- Adhere strictly to the "tactical hardware/snooping" aesthetic (ADR 008) - use sharp edges (`rounded-none`), dashed borders (`border-dashed`), etc.

## Acceptance Criteria
- [ ] Implement UI highlight logic for high-value items.
- [ ] Write Vitest browser component tests to ensure the highlight renders correctly when a high-value item is present.
