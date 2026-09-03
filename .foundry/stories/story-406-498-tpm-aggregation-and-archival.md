---
id: story-406-498-tpm-aggregation-and-archival
type: STORY
title: TPM Aggregation and Archival File System Operations
status: READY
owner_persona: tech_lead
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-339-406-tpm-distillation-logic
tags:
  - foundry
  - script
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TPM Aggregation and Archival File System Operations

## Objective
Implement text aggregation and file system operations to append to the EPIC and move child files to `.foundry/archive/`.

## Requirements
- The process must aggregate content, outcomes, and journals from child STORY and TASK nodes.
- It must append a "Changelog & Learnings" summary section to the EPIC node.
- Processed child nodes must be moved from `.foundry/stories/` and `.foundry/tasks/` to `.foundry/archive/stories/` and `.foundry/archive/tasks/`.

## Acceptance Criteria
- [ ] task-498-526-tpm-aggregation-logic
- [ ] task-498-527-tpm-archival-fs
- [ ] task-498-528-tpm-aggregation-tests
- [ ] task-498-529-tpm-aggregation-qa
- [ ] Implement text aggregation and synthesis to create the Changelog & Learnings summary.
- [ ] Implement file system operations to append to the EPIC.
- [ ] Implement file system operations to move child files to `.foundry/archive/`.
- [ ] Write unit tests for the aggregation and file operations.
