---
id: story-059-125-hidden-items-data-model
type: STORY
title: Hidden Items Data Model
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
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

# Story: Hidden Items Data Model

## 1. Context & Background
This Story addresses defining the structural representation of hidden items. The parser fetches flags; we now need a proper TypeScript structure defining how a hidden item interacts with its physical map location, item type, and flag acquisition state for runtime use.

## 2. Product Requirements
- Define `HiddenItemData` (or similar appropriate name) data model interfaces.
- It must represent: the hidden item's event flag offset/bit, corresponding location details, the specific `Item` it contains, and whether it is acquired.
- Follow ADR 015 convention of using readable property names for application data structures if exporting data.

## 3. Acceptance Criteria
- [ ] TypeScript interfaces for `HiddenItemData` are defined.
- [x] Technical implementation details for creating those interfaces are defined as child `TASK`s.
- [ ] task-125-177-define-hidden-item-data-model
