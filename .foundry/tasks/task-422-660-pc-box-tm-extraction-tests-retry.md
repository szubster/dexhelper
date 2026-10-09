---
id: task-422-660-pc-box-tm-extraction-tests-retry
type: TASK
title: Write unit tests for PC Box and TM Inventory extraction logic
status: CANCELLED
owner_persona: coder
created_at: '2026-10-03T13:51:00.000Z'
updated_at: '2026-10-03'
depends_on:
  - task-422-659-tm-inventory-extraction-logic-retry
  - task-422-590-pc-box-extraction-logic
jules_session_id: null
pr_number: null
parent: story-411-422-pc-box-and-tm-extraction
tags:
  - testing
research_references: []
rejection_count: 0
rejection_reason: "Cancelled due to permanent failure of dependency: task-422-659-tm-inventory-extraction-logic-retry"
notes: ''
locks: []
---
# Write unit tests for PC Box and TM Inventory extraction logic

## Context
This task replaces the cancelled `task-422-640-pc-box-tm-extraction-tests`. It depends on the new `task-422-659-tm-inventory-extraction-logic-retry` and the already completed `task-422-590-pc-box-extraction-logic`.

## Acceptance Criteria
- [ ] Write unit tests covering PC Box extraction logic across supported generations.
- [ ] Write unit tests covering TM Inventory extraction logic across supported generations.
- [ ] Verify concurrent execution integrates properly and handles invalid buffers.
