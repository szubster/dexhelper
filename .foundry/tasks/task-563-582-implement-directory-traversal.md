---
id: task-563-582-implement-directory-traversal
type: TASK
title: Implement Directory Traversal Logic
status: READY
owner_persona: coder
created_at: '2026-09-16T06:16:00Z'
updated_at: '2026-09-21'
depends_on:
  - task-563-581-scaffold-lint-schema
jules_session_id: null
parent: story-555-563-lint-schema-file-iteration
tags:
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Directory Traversal Logic

## Objectives
- Extend `.foundry/scripts/lint-schema.ts` to implement directory traversal.
- Target the directories: `.foundry/ideas/`, `.foundry/prds/`, `.foundry/epics/`, `.foundry/stories/`, and `.foundry/tasks/`.
- Ensure files in `docs/` and `journals/` are explicitly ignored.

## Acceptance Criteria
- [ ] Directory iteration logic is implemented.
- [ ] Only the specified directories are traversed.
- [ ] `docs/` and `journals/` are ignored.
