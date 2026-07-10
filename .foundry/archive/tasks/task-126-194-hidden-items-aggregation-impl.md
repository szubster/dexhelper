---
id: task-126-194-hidden-items-aggregation-impl
type: TASK
title: Implement Hidden Items Aggregation Logic
status: COMPLETED
owner_persona: coder
created_at: '2026-06-17'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-059-126-hidden-items-aggregation-logic
tags:
  - feature
  - tool
  - data
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Hidden Items Aggregation Logic

## 1. Context
We need to implement the logic that maps raw parsed boolean flags from the event save data to the structured `HiddenItemData` entities, and provide a utility to filter them based on acquisition status.

## 2. Technical Requirements
- Create utility functions to merge the statically defined `HiddenItemData` objects with the dynamically parsed event flags from a save file.
- The aggregation logic must correctly join the parsed event flags with the hidden item source data by matching offsets/bits.
- Implement filtering logic (e.g., `getAcquiredHiddenItems`, `getRemainingHiddenItems`) to quickly query items by their acquisition status (`isAcquired`).

## 3. Failure & PR Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 4. Acceptance Criteria
- [x] Aggregation utility correctly maps parsed event flags to `HiddenItemData` items.
- [x] Filtering utilities return correct subsets of items based on acquisition status.
- [x] Unit tests verify the logic against expected behavior.
