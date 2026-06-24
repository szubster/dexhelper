---
id: task-126-195-hidden-items-aggregation-qa
type: TASK
title: QA Hidden Items Aggregation Logic
status: READY
owner_persona: qa
created_at: '2026-06-17'
updated_at: '2026-06-22'
depends_on: []jules_session_id: null
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

# Task: QA Hidden Items Aggregation Logic

## 1. Context
Verify the implementation from `task-126-194-hidden-items-aggregation-impl` which maps raw parsed boolean flags to `HiddenItemData` entities.

## 2. Technical Requirements
- Ensure that the aggregation logic correctly maps the flag offset and bits to update the `isAcquired` state.
- Ensure the filtering utilities properly separate acquired and remaining hidden items.
- Verify unit tests thoroughly cover edge cases.

## 3. Failure & PR Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 4. Acceptance Criteria
- [ ] Verification of mapping between boolean flags and `HiddenItemData` is successful.
- [ ] Verification of filtering by acquisition status is successful.
- [ ] All unit tests pass and provide adequate coverage.
