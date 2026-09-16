---
id: story-555-564-lint-schema-frontmatter-validation
type: STORY
title: Schema Linter Frontmatter Validation
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on:
  - story-555-563-lint-schema-file-iteration
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

# Schema Linter Frontmatter Validation

## Objectives
- Update `.foundry/scripts/lint-schema.ts` to parse YAML frontmatter.
- Validate the presence of required fields: `id`, `type`, `title`, `status`, `owner_persona`, `created_at`, `updated_at`, `depends_on`, `jules_session_id`.
- Validate enum strictness for `status`, `owner_persona`, and `type`.

## Acceptance Criteria
- [ ] Implement frontmatter field validation logic.
- [ ] Implement enum strictness validation logic.
