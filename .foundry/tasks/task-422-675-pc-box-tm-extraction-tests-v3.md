---
id: task-422-675-pc-box-tm-extraction-tests-v3
type: TASK
title: Write unit tests for PC Box and TM Inventory extraction logic V3
status: PENDING
owner_persona: coder
created_at: '2026-10-09T00:00:00.000Z'
updated_at: '2026-10-09'
depends_on:
  - task-422-674-tm-inventory-extraction-logic-v3
  - task-422-590-pc-box-extraction-logic
jules_session_id: null
pr_number: null
parent: story-411-422-pc-box-and-tm-extraction
tags:
  - testing
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Write unit tests for PC Box and TM Inventory extraction logic V3

## Context
This task replaces `task-422-660-pc-box-tm-extraction-tests-retry`.

## Acceptance Criteria
- [ ] Write unit tests covering PC Box extraction logic across supported generations.
- [ ] Write unit tests covering TM Inventory extraction logic across supported generations.
- [ ] Verify concurrent execution integrates properly and handles invalid buffers.
