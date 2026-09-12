---
id: story-555-563-lint-schema-file-iteration
type: STORY
title: Schema Linter File Iteration Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
parent: epic-521-555-schema-linter-frontmatter-logic
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Schema Linter File Iteration Logic

## Objectives
- Create `.foundry/scripts/lint-schema.ts`.
- Implement directory traversal for `.foundry/ideas/`, `.foundry/prds/`, `.foundry/epics/`, `.foundry/stories/`, and `.foundry/tasks/`.
- Ensure files in `docs/` and `journals/` are ignored.

## Acceptance Criteria
- [ ] Implement directory iteration logic in `.foundry/scripts/lint-schema.ts`.
