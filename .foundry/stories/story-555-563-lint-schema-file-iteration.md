---
id: story-555-563-lint-schema-file-iteration
type: STORY
title: Schema Linter File Iteration Logic
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-16'
depends_on: []
jules_session_id: '5518658490845363925'
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
