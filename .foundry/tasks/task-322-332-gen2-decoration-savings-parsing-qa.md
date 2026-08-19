---
id: task-322-332-gen2-decoration-savings-parsing-qa
type: TASK
title: QA Gen 2 Room Decoration & Bank Parsing
status: PENDING
owner_persona: qa
created_at: '2026-07-17'
updated_at: '2026-08-19'
depends_on:
  - task-322-331-gen2-decoration-savings-parsing-impl
jules_session_id: null
pr_number: null
parent: story-311-322-gen2-room-decoration-parsing
tags:
  - gen2
  - engine
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: QA Gen 2 Room Decoration & Bank Parsing

## Objective
Verify the implementation of Gen 2 room decoration and bank parsing.

## Requirements
- Verify that the extracted room decorations and bank savings match actual save file data.
- Verify that the Coder strictly adhered to ADR 028 by using reusable module-level constants for all memory offsets, lengths, bit locations, and shifts, with absolutely no inline magic numbers.
- If the Coder failed to follow the architectural constraints or the implementation is incorrect, reject the task.
- If you cannot complete this task (e.g. due to permanent failure), you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [ ] Verify accuracy of parsed room decoration data.
- [ ] Verify accuracy of parsed bank savings data.
- [ ] Verify strict usage of module-level constants for all offsets (No inline magic numbers).

### QA Rejection Note
Rejected because the coder did not implement any of the parsing logic. No offsets or extraction code found in the saveParser for Gen 2 room decorations or Mom's bank savings.
