---
id: task-562-577-schema-linter-checkbox-logic-qa
type: TASK
title: QA Markdown Checkbox Parsing Logic
status: PENDING
owner_persona: qa
created_at: '2026-09-12'
updated_at: '2026-09-16'
depends_on:
  - task-562-576-schema-linter-checkbox-logic-impl
jules_session_id: null
parent: story-552-562-schema-linter-core-logic
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Markdown Checkbox Parsing Logic

## Context
Verify the implementation of strict markdown checkbox linting in `scripts/validate-foundry-schema.ts`. It should reject any markdown files using invalid checkbox formatting like `* [ ]` or `- [  ]`.

## Acceptance Criteria
- [ ] Verify that `scripts/validate-foundry-schema.ts` correctly validates valid checkboxes and rejects invalid ones.
