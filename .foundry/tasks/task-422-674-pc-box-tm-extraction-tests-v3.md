---
id: task-422-674-pc-box-tm-extraction-tests-v3
type: TASK
title: Write unit tests for PC Box and TM Inventory extraction logic
status: PENDING
owner_persona: coder
created_at: '2026-10-08T14:40:00.000Z'
updated_at: '2026-10-08'
depends_on:
  - task-422-673-tm-inventory-extraction-logic-v3
  - task-422-590-pc-box-extraction-logic
jules_session_id: null
pr_number: null
parent: story-411-422-pc-box-and-tm-extraction
tags:
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Write unit tests for PC Box and TM Inventory extraction logic

## Context
This task replaces the cancelled `task-422-660-pc-box-tm-extraction-tests-retry`. It depends on the new `task-422-673-tm-inventory-extraction-logic-v3` and the already completed `task-422-590-pc-box-extraction-logic`.

## Acceptance Criteria
- [ ] Write unit tests covering PC Box extraction logic across supported generations.
- [ ] Write unit tests covering TM Inventory extraction logic across supported generations.
- [ ] Verify concurrent execution integrates properly and handles invalid buffers.
