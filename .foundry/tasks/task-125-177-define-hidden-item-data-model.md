---
id: task-125-177-define-hidden-item-data-model
type: TASK
title: Define Hidden Item Data Model Interfaces
status: READY
owner_persona: coder
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-059-125-hidden-items-data-model
tags:
  - feature
  - data
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Define Hidden Item Data Model Interfaces

## 1. Context
This task defines the data model for Hidden Items based on the requirements of `story-059-125-hidden-items-data-model`. We need to define TypeScript structures that represent how a hidden item interacts with its physical map location, item type, and flag acquisition state for runtime use.

## 2. Technical Requirements
- In an appropriate schema/types file (e.g., `src/db/schema.ts` or a related generic types file), define the `HiddenItemData` (or similarly named) TypeScript interface.
- The interface must represent:
  - The hidden item's event flag offset/bit (e.g., `flagOffset`, `flagBit`).
  - Corresponding location details (e.g., `locationId` or map references).
  - The specific `Item` it contains (e.g., `itemId`).
  - The acquisition state (e.g., a boolean or method indicating if it is acquired).
- **Architectural Constraint (ADR 015):** The interface properties MUST use full, readable names (e.g., `flagOffset` not `fo`, `itemId` not `id`). Do NOT optimize by shortening property names.

## 3. Failure & PR Instructions
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` and provide a clear `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 4. Acceptance Criteria
- [ ] TypeScript interfaces for `HiddenItemData` are defined and exported.
- [ ] The properties strictly follow the ADR 015 naming convention.
