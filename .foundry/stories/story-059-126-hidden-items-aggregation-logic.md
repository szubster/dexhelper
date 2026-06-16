---
id: story-059-126-hidden-items-aggregation-logic
type: STORY
title: Hidden Items Aggregation Logic
status: READY
owner_persona: tech_lead
created_at: '2026-06-13'
updated_at: '2026-06-16'
depends_on:
  - story-059-125-hidden-items-data-model
jules_session_id: null
pr_number: null
parent: epic-037-059-hidden-items-data-layer
tags:
  - feature
  - tool
  - data
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Hidden Items Aggregation Logic

## 1. Context & Background
Now that the data structure is defined (`story-059-125-hidden-items-data-model`) and we can parse event flags from save states, we need logic to map those boolean flags to the actual hidden item locations across the games and aggregate the results for UI consumption.

## 2. Product Requirements
- Implement the logical mapping connecting raw parsed boolean flags from the event save data to the structured `HiddenItemData` entities.
- Implement filtering logic to quickly query remaining (unacquired) or collected hidden items.

## 3. Acceptance Criteria
- [ ] Logic correctly joins parsed event flags with hidden item source data.
- [ ] Logic provides utility to filter items by acquisition status.
- [ ] Technical tasks are drafted for the implementations.
