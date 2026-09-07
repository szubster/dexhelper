---
id: task-498-527-tpm-archival-fs
type: TASK
title: TPM Archival File System Operations
status: PENDING
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on:
  - task-498-526-tpm-aggregation-logic
jules_session_id: null
pr_number: null
parent: story-406-498-tpm-aggregation-and-archival
tags:
  - script
  - typescript
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TPM Archival File System Operations

## Objective
Implement file system operations for appending the summary to the EPIC and moving child files.

## Requirements
- Use Node.js `fs` operations to append the formatted "Changelog & Learnings" summary to the EPIC node.
- Use `fs` operations to move processed child nodes (STORY and TASK) from `.foundry/stories/` and `.foundry/tasks/` to `.foundry/archive/stories/` and `.foundry/archive/tasks/`.

## Acceptance Criteria
- [ ] Implement file system operations to append to the EPIC.
- [ ] Implement file system operations to move child files to `.foundry/archive/`.
