---
id: task-563-583-qa-lint-schema
type: TASK
title: QA Verify Directory Iteration
status: PENDING
owner_persona: qa
created_at: '2026-09-16T06:16:00Z'
updated_at: '2026-09-18'
depends_on:
  - task-563-582-implement-directory-traversal
jules_session_id: null
parent: story-555-563-lint-schema-file-iteration
tags:
  - qa
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verify Directory Iteration

## Objectives
- Verify that the newly created `.foundry/scripts/lint-schema.ts` correctly traverses the intended directories.
- Confirm that it ignores files in `docs/` and `journals/`.
- Validate that the implementation meets all requirements of the parent story.

## Acceptance Criteria
- [ ] Directory traversal correctly includes ideas, prds, epics, stories, and tasks.
- [ ] Directory traversal correctly ignores docs and journals.
